require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { Readable } = require("stream");
const axios = require("axios");
const { GridFSBucket, MongoClient } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || "raw_radicles";
const MONGODB_ONLY = process.env.MONGODB_ONLY === "true" || process.env.NODE_ENV === "production";

let mongoClient;
let mongoDb;
let mongoConnectPromise;

// Middleware
app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// --- CMS API Endpoints ---

const readJsonFile = (filePath, fallback = {}) => {
  if (!fs.existsSync(filePath)) return fallback;

  const content = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  if (!content.trim()) return fallback;

  return JSON.parse(content);
};

const isMongoConfigured = () => Boolean(MONGODB_URI);

const getMongoDb = async () => {
  if (!isMongoConfigured()) return null;
  if (mongoDb) return mongoDb;

  if (!mongoConnectPromise) {
    mongoClient = new MongoClient(MONGODB_URI);
    mongoConnectPromise = mongoClient.connect();
  }

  await mongoConnectPromise;
  mongoDb = mongoClient.db(MONGODB_DB);
  return mongoDb;
};

const getHomepageCollection = async () => {
  const db = await getMongoDb();
  return db ? db.collection("homepage") : null;
};

const getMongoCollection = async (collectionName) => {
  const db = await getMongoDb();
  return db ? db.collection(collectionName) : null;
};

const getMongoData = async (collectionName, documentId, fallbackReader) => {
  const fallback = fallbackReader();

  if (!isMongoConfigured()) {
    return fallback;
  }

  try {
    const collection = await getMongoCollection(collectionName);
    const doc = await collection.findOne({ _id: documentId });

    if (doc && Object.prototype.hasOwnProperty.call(doc, "data")) {
      return doc.data;
    }

    await collection.replaceOne(
      { _id: documentId },
      { _id: documentId, data: fallback, updatedAt: new Date() },
      { upsert: true }
    );

    return fallback;
  } catch (error) {
    console.error(`MongoDB ${collectionName} read failed, using JSON fallback:`, error.message);
    return fallback;
  }
};

const saveMongoData = async (collectionName, documentId, data) => {
  if (!isMongoConfigured()) return;

  const collection = await getMongoCollection(collectionName);
  await collection.replaceOne(
    { _id: documentId },
    { _id: documentId, data, updatedAt: new Date() },
    { upsert: true }
  );
};

const readDataFile = (fileName, fallback = {}) => {
  if (MONGODB_ONLY) return fallback;

  try {
    return readJsonFile(path.join(__dirname, fileName), fallback);
  } catch (error) {
    console.error(`Failed to read ${fileName}:`, error.message);
    return fallback;
  }
};

const saveDataFile = (fileName, data) => {
  if (MONGODB_ONLY) return;

  fs.writeFileSync(path.join(__dirname, fileName), JSON.stringify(data, null, 2), "utf8");
};

const getAssetsBucket = async () => {
  const db = await getMongoDb();
  return db ? new GridFSBucket(db, { bucketName: "assets" }) : null;
};

const getContentType = (fileName) => {
  const ext = path.extname(fileName).toLowerCase();
  const types = {
    ".avif": "image/avif",
    ".css": "text/css",
    ".gif": "image/gif",
    ".html": "text/html",
    ".ico": "image/x-icon",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".js": "text/javascript",
    ".json": "application/json",
    ".m4v": "video/x-m4v",
    ".mov": "video/quicktime",
    ".mp4": "video/mp4",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".webm": "video/webm",
    ".webp": "image/webp",
    ".woff": "font/woff",
    ".woff2": "font/woff2"
  };
  return types[ext] || "application/octet-stream";
};

const homepageFilePath = path.join(__dirname, "homepage.json");

const readHomepageFromFile = () => {
  if (MONGODB_ONLY) return {};

  const data = readJsonFile(homepageFilePath);
  return data && typeof data === "object" && !Array.isArray(data) ? data : {};
};

const getHomepageData = async () => {
  const fallback = readHomepageFromFile();

  if (!isMongoConfigured()) {
    return fallback;
  }

  try {
    const collection = await getHomepageCollection();
    const doc = await collection.findOne({ _id: "homepage" });

    if (doc && doc.data && typeof doc.data === "object" && !Array.isArray(doc.data)) {
      return doc.data;
    }

    if (Object.keys(fallback).length > 0) {
      await collection.replaceOne(
        { _id: "homepage" },
        { _id: "homepage", data: fallback, updatedAt: new Date() },
        { upsert: true }
      );
    }

    return fallback;
  } catch (error) {
    console.error("MongoDB homepage read failed, using homepage.json:", error.message);
    return fallback;
  }
};

const saveHomepageData = async (data) => {
  if (isMongoConfigured()) {
    const collection = await getHomepageCollection();
    await collection.replaceOne(
      { _id: "homepage" },
      { _id: "homepage", data, updatedAt: new Date() },
      { upsert: true }
    );
  }

  if (!MONGODB_ONLY) {
    fs.writeFileSync(homepageFilePath, JSON.stringify(data, null, 2), "utf8");
  }
};

// Product CMS API
app.get("/api/product-cms/:id", async (req, res) => {
  console.log("==> HIT GET /api/product-cms/ ID:", req.params.id);
  const { id } = req.params;
  try {
    const data = await getMongoData("productCms", "productCms", () => readDataFile("products_cms.json"));
    console.log("  Data found for ID:", !!data[id]);
    res.json(data[id] || {});
  } catch (e) {
    console.log("  Error reading product CMS:", e.message);
    res.json({});
  }
});

app.post("/api/product-cms/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getMongoData("productCms", "productCms", () => readDataFile("products_cms.json"));
    data[id] = req.body;
    await saveMongoData("productCms", "productCms", data);
    saveDataFile("products_cms.json", data);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Failed to save product CMS" });
  }
});

// Products API
app.get("/api/products", async (req, res) => {
  try {
    res.json(await getMongoData("products", "products", () => readDataFile("products.json")));
  } catch (e) {
    console.error("Failed to fetch products:", e.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.post("/api/products", async (req, res) => {
  const newData = req.body;

  try {
    await saveMongoData("products", "products", newData);
    saveDataFile("products.json", newData);
    res.json({ success: true, message: "Products updated successfully" });
  } catch (e) {
    res.status(500).json({ error: "Failed to save products" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const products = await getMongoData("products", "products", () => readDataFile("products.json"));
    const cms = await getMongoData("productCms", "productCms", () => readDataFile("products_cms.json"));

    if (products[id]) delete products[id];
    if (cms[id]) delete cms[id];

    await saveMongoData("products", "products", products);
    await saveMongoData("productCms", "productCms", cms);
    saveDataFile("products.json", products);
    saveDataFile("products_cms.json", cms);

    res.json({ success: true, message: `Product ${id} deleted successfully` });
  } catch (e) {
    console.error("Failed to delete product:", e);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// Home Page API
app.get("/api/homepage", async (req, res) => {
  try {
    res.json(await getHomepageData());
  } catch (e) {
    console.error("Failed to fetch homepage data:", e.message);
    res.status(500).json({ error: "Failed to fetch homepage data" });
  }
});

app.post("/api/homepage", async (req, res) => {
  const data = req.body;
  try {
    await saveHomepageData(data);
    res.json({ success: true, message: "Home page updated successfully" });
  } catch (e) {
    console.error("Failed to save homepage data:", e.message);
    res.status(500).json({ error: "Failed to save homepage data" });
  }
});

app.get("/api/uploads/videos", (req, res) => {
  const uploadDir = path.join(__dirname, "public", "assets", "uploads");
  const videoExtensions = new Set([".mp4", ".webm", ".mov", ".m4v"]);

  try {
    const videos = new Set();

    if (fs.existsSync(uploadDir)) {
      fs
        .readdirSync(uploadDir)
        .filter((fileName) => videoExtensions.has(path.extname(fileName).toLowerCase()))
        .sort()
        .forEach((fileName) => videos.add(`assets/uploads/${fileName}`));
    }

    if (!isMongoConfigured()) {
      return res.json({ videos: Array.from(videos).sort() });
    }

    getMongoDb()
      .then((db) => db.collection("assets.files").find({ filename: /^assets\/uploads\/.+/ }).toArray())
      .then((files) => {
        files
          .filter((file) => videoExtensions.has(path.extname(file.filename).toLowerCase()))
          .forEach((file) => videos.add(file.filename));
        res.json({ videos: Array.from(videos).sort() });
      })
      .catch(() => res.json({ videos: Array.from(videos).sort() }));
  } catch (error) {
    res.status(500).json({ error: "Failed to list uploaded videos" });
  }
});

// Blog CMS API
const defaultBlogs = [
  {
    id: "blog-chyawanaprash",
    category: "Ingredients",
    title: "Why chyawanaprash and dark chocolate belong together",
    excerpt: "A look at how deep cacao notes pair with the warm, spiced complexity of a classic ayurvedic blend.",
    image: "assets/chocolate.jpg",
    body: "Dark chocolate has a natural bitterness that makes it a beautiful canvas for layered flavors. Chyawanaprash brings warmth, spice, and fruit-forward depth, so the final bite feels more rounded than ordinary chocolate.\n\nThe best way to enjoy it is slowly. Let the chocolate soften, notice the cacao first, then the herbal notes that arrive after. It is a small pause with a lot of character."
  },
  {
    id: "blog-ashwagandha",
    category: "Rituals",
    title: "A calmer snack break with ashwagandha chocolate",
    excerpt: "Build a small afternoon ritual around flavor, pause, and a square of chocolate that feels considered.",
    image: "assets/bentogrid.webp",
    body: "Snack breaks often happen on autopilot. A square of ashwagandha chocolate invites a different rhythm: sit down, breathe, taste, and give the day one quiet minute.\n\nPair it with warm milk, herbal tea, or just a glass of water. The point is not ceremony for ceremony's sake, but a simple repeatable habit that feels good."
  },
  {
    id: "blog-brahmi",
    category: "Wellness",
    title: "Brahmi, focus, and the art of slow chocolate",
    excerpt: "How to turn a simple treat into a more attentive moment during busy workdays.",
    image: "assets/pure_chocolate_hero.png",
    body: "Brahmi has long been associated with clarity and attention. In chocolate, it becomes approachable: a familiar treat with an herbal edge that makes you pay attention to the bite.\n\nTry keeping one bar for focused work sessions. One piece before a task can mark the start of a cleaner, calmer block of time."
  }
];

app.get("/api/blogs", async (req, res) => {
  try {
    res.json(await getMongoData("blogs", "blogs", () => readDataFile("blog_cms.json", { blogs: defaultBlogs })));
  } catch (e) {
    res.json({ blogs: defaultBlogs });
  }
});

app.post("/api/blogs", async (req, res) => {
  const blogs = Array.isArray(req.body.blogs) ? req.body.blogs : [];
  const data = {
    blogs,
    updatedAt: req.body.updatedAt || new Date().toISOString()
  };
  try {
    await saveMongoData("blogs", "blogs", data);
    saveDataFile("blog_cms.json", data);
    res.json({ success: true, blogs, message: "Blog content updated successfully" });
  } catch (e) {
    res.status(500).json({ error: "Failed to save blog content" });
  }
});

// Subscriber API
app.get("/api/subscribers", async (req, res) => {
  try {
    res.json(await getMongoData("subscribers", "subscribers", () => readDataFile("subscribers.json", { subscribers: [] })));
  } catch (e) {
    res.json({ subscribers: [] });
  }
});

app.post("/api/subscribers", async (req, res) => {
  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "").trim().toLowerCase();
  const phone = String(req.body.phone || "").trim();

  if (!name || !email || !email.includes("@")) {
    return res.status(400).json({ success: false, error: "Name and valid email are required" });
  }

  const data = await getMongoData("subscribers", "subscribers", () => readDataFile("subscribers.json", { subscribers: [] }));

  const existingIndex = (data.subscribers || []).findIndex((subscriber) => subscriber.email === email);
  const subscriber = {
    id: existingIndex >= 0 ? data.subscribers[existingIndex].id : `subscriber-${Date.now()}`,
    name,
    email,
    phone,
    createdAt: existingIndex >= 0 ? data.subscribers[existingIndex].createdAt : new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (existingIndex >= 0) {
    data.subscribers[existingIndex] = subscriber;
  } else {
    data.subscribers.unshift(subscriber);
  }

  try {
    await saveMongoData("subscribers", "subscribers", data);
    saveDataFile("subscribers.json", data);
    res.json({ success: true, subscriber });
  } catch (e) {
    res.status(500).json({ error: "Failed to save subscriber" });
  }
});

// Instagram API
app.get("/api/instagram/posts", async (req, res) => {
  try {
    const data = await getHomepageData();
    res.json(data.instagram || { posts: [], profileUrl: "" });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch instagram posts" });
  }
});

app.post("/api/instagram/refresh", async (req, res) => {
  // This is a placeholder for actual Instagram scraping or API call.
  // For now, we will simulate adding a mock post to show the "replacement" logic.
  try {
    const data = await getHomepageData();
    if (!data.instagram) data.instagram = { posts: [], profileUrl: "" };

    // Mock new post
    const newPost = {
      id: "mock_" + Date.now(),
      imageUrl: "https://picsum.photos/600/600?random=" + Math.floor(Math.random() * 1000),
      link: data.instagram.profileUrl,
      timestamp: new Date().toISOString()
    };

    data.instagram.posts.unshift(newPost);
    if (data.instagram.posts.length > 8) {
      data.instagram.posts = data.instagram.posts.slice(0, 8);
    }

    await saveHomepageData(data);
    res.json({ success: true, message: "Instagram feed refreshed (Simulated)", post: newPost });
  } catch (e) {
    res.status(500).json({ error: "Failed to refresh instagram feed" });
  }
});


// --- Review Scoring & Moderation Helpers ---
const TOXIC_WORDS = ["scam", "fake", "bad", "worst", "hate", "stupid", "idiot", "fraud", "toxic", "garbage", "trash"];

function detectSpam(text) {
  if (!text) return false;
  // Rule: links like http/https
  const hasLinks = /https?:\/\/[^\s]+/gi.test(text);
  if (hasLinks) return true;

  // Rule: repeated words
  // Check for immediate repetitions like "very very"
  if (/\b(\w+)\s+\1\b/gi.test(text)) return true;

  // Check for excessive word repetition (e.g. "spam" 4+ times)
  const words = text.toLowerCase().split(/\s+/);
  const wordCounts = {};
  for (const word of words) {
    if (word.length > 3) {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
      if (wordCounts[word] > 3) return true;
    }
  }
  return false;
}

function detectToxicity(text) {
  if (!text) return false;
  const lowercaseText = text.toLowerCase();
  return TOXIC_WORDS.some(word => lowercaseText.includes(word));
}

function calculateReviewScore(review) {
  let score = 0;
  let flags = [];

  // +2 → Verified purchase
  if (review.is_verified) score += 2;

  // +1 → Review length > 50 characters
  if (review.body && review.body.length > 50) score += 1;

  // -2 → Spam indicators
  if (detectSpam(review.body)) {
    score -= 2;
    flags.push("spam");
  }

  // -3 → Toxic words
  if (detectToxicity(review.body)) {
    score -= 3;
    flags.push("toxic");
  }

  return { score, flags };
}

function updateReviewStatus(score, threshold = 1) {
  return score >= threshold ? "approved" : "pending";
}

// Review Management API
app.post("/api/reviews/submit", async (req, res) => {
  const { productId, review } = req.body;

  // Calculate Score and Moderation Fields
  const { score, flags } = calculateReviewScore(review);
  const status = updateReviewStatus(score);

  const updatedReview = {
    ...review,
    id: Date.now(),
    submittedAt: new Date().toISOString(),
    score,
    flags,
    status
  };

  if (status === "approved") {
    // Save to CMS (Approved)
    try {
      let cms = await getMongoData("productCms", "productCms", () => readDataFile("products_cms.json"));
      if (!cms[productId]) cms[productId] = {};
      if (!cms[productId].reviews) cms[productId].reviews = [];
      cms[productId].reviews.push(updatedReview);
      await saveMongoData("productCms", "productCms", cms);
      saveDataFile("products_cms.json", cms);
      return res.json({ success: true, message: "Review approved and published automatically", status: "approved" });
    } catch (e) {
      console.error("Auto-approval failed:", e);
    }
  }

  // Save to Pending
  let data = await getMongoData("pendingReviews", "pendingReviews", () => readDataFile("pending_reviews.json"));
  if (!data[productId]) data[productId] = [];
  data[productId].push(updatedReview);
  try {
    await saveMongoData("pendingReviews", "pendingReviews", data);
    saveDataFile("pending_reviews.json", data);
    res.json({ success: true, message: "Review submitted for moderation", status: "pending" });
  } catch (e) {
    res.status(500).json({ error: "Failed to save pending review" });
  }
});

app.get("/api/reviews/pending", async (req, res) => {
  try {
    res.json(await getMongoData("pendingReviews", "pendingReviews", () => readDataFile("pending_reviews.json")));
  } catch (e) {
    res.json({});
  }
});

app.post("/api/reviews/approve", async (req, res) => {
  const { productId, reviewId } = req.body;

  try {
    let pending = await getMongoData("pendingReviews", "pendingReviews", () => readDataFile("pending_reviews.json"));
    let cms = await getMongoData("productCms", "productCms", () => readDataFile("products_cms.json"));

    if (pending[productId]) {
      const reviewIdx = pending[productId].findIndex(r => r.id == reviewId);
      if (reviewIdx > -1) {
        const review = pending[productId].splice(reviewIdx, 1)[0];
        review.status = "approved"; // Update status on manual approval
        if (!cms[productId]) cms[productId] = {};
        if (!cms[productId].reviews) cms[productId].reviews = [];
        cms[productId].reviews.push(review);

        await saveMongoData("pendingReviews", "pendingReviews", pending);
        await saveMongoData("productCms", "productCms", cms);
        saveDataFile("pending_reviews.json", pending);
        saveDataFile("products_cms.json", cms);
        return res.json({ success: true });
      }
    }
    res.status(404).json({ error: "Review not found" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete("/api/reviews/:type/:productId/:reviewId", async (req, res) => {
  const { type, productId, reviewId } = req.params;
  const fileName = type === "pending" ? "pending_reviews.json" : "products_cms.json";
  const collectionName = type === "pending" ? "pendingReviews" : "productCms";
  const documentId = type === "pending" ? "pendingReviews" : "productCms";

  try {
    let data = await getMongoData(collectionName, documentId, () => readDataFile(fileName));
    if (type === "pending") {
      if (data[productId]) {
        data[productId] = data[productId].filter(r => r.id != reviewId);
      }
    } else {
      if (data[productId] && data[productId].reviews) {
        data[productId].reviews = data[productId].reviews.filter(r => r.id != reviewId);
      }
    }
    await saveMongoData(collectionName, documentId, data);
    saveDataFile(fileName, data);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Image Upload API
app.post("/api/upload", (req, res) => {
  const { fileName, base64Data } = req.body;

  if (!fileName || !base64Data) {
    return res.status(400).json({ success: false, error: "Missing file data" });
  }

  try {
    // Strip base64 prefix if present
    const base64Image = base64Data.split(";base64,").pop();
    const fileBuffer = Buffer.from(base64Image, "base64");
    const relativePath = `assets/uploads/${fileName}`;

    if (!MONGODB_ONLY) {
      const uploadDir = path.join(__dirname, "public", "assets", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, fileBuffer);
    }

    if (!isMongoConfigured()) {
      if (MONGODB_ONLY) {
        return res.status(500).json({ success: false, error: "MongoDB is required for uploads" });
      }

      return res.json({ success: true, url: relativePath });
    }

    getMongoDb()
      .then(async (db) => {
        const bucket = new GridFSBucket(db, { bucketName: "assets" });
        const existingFiles = await db.collection("assets.files").find({ filename: relativePath }).toArray();
        await Promise.all(existingFiles.map((file) => bucket.delete(file._id).catch(() => {})));

        await new Promise((resolve, reject) => {
          const uploadStream = bucket.openUploadStream(relativePath, {
            contentType: getContentType(fileName),
            metadata: {
              source: "admin-upload",
              uploadedAt: new Date()
            }
          });
          Readable.from(fileBuffer).pipe(uploadStream).on("error", reject).on("finish", resolve);
        });

        res.json({ success: true, url: relativePath });
      })
      .catch((error) => {
        console.error("MongoDB asset upload failed:", error.message);
        if (MONGODB_ONLY) {
          return res.status(500).json({ success: false, error: "MongoDB asset upload failed" });
        }

        res.json({ success: true, url: relativePath, warning: "Saved locally, but MongoDB asset upload failed" });
      });
  } catch (err) {
    console.error("Upload failed:", err);
    res.status(500).json({ success: false, error: "Upload failed" });
  }
});

// Middleware to fix Wayback Machine URLs before processing
app.use((req, res, next) => {
  // Fix Wayback URLs in the request path
  if (req.path.includes("/web/20") || req.path.includes("web.archive.org")) {
    // Extract the original path from Wayback URL
    // Pattern: /web/20230603165520/https://mvstselect.com/cart/add
    const match = req.path.match(/\/web\/\d+\/https?:\/\/[^\/]+(\/.+)/);
    if (match && match[1]) {
      req.url =
        match[1] +
        (req.url.includes("?") ? req.url.substring(req.url.indexOf("?")) : "");
      req.path = match[1];
      console.log(
        "Fixed Wayback URL in request:",
        req.originalUrl,
        "->",
        req.url
      );
    }
  }
  next();
});

const frontendDistPath = path.join(__dirname, "frontend", "dist");
const serveReactApp = (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
};

app.get(/^\/(assets|css)\/(.+)/, async (req, res, next) => {
  if (!isMongoConfigured()) return next();

  const assetPath = `${req.params[0]}/${req.params[1]}`.replace(/\\/g, "/");

  try {
    const db = await getMongoDb();
    const file = await db.collection("assets.files").findOne({ filename: assetPath });

    if (!file) return next();

    res.setHeader("Content-Type", file.contentType || getContentType(assetPath));
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

    const bucket = await getAssetsBucket();
    bucket.openDownloadStreamByName(assetPath).on("error", next).pipe(res);
  } catch (error) {
    next();
  }
});

if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  app.get(/^\/(?:pages\/)?[^/]+\.html$/, serveReactApp);
}

// Serve static assets from public without letting legacy HTML pages own routes.
app.use(express.static(path.join(__dirname, "public"), { index: false }));

// Cart endpoints - handle cart operations locally
app.post("/cart/add", (req, res) => {
  // This is a mock cart add endpoint
  // In a real scenario, you'd manage cart state (session, database, etc.)
  console.log("Add to cart request:", req.body);
  console.log("Add to cart form data:", req.body);

  // Handle both JSON and form data
  res.json({
    success: true,
    message: "Item added to cart (mock response)",
    items: [],
    // You can implement actual cart logic here
  });
});

app.post("/cart", (req, res) => {
  // Handle cart updates
  console.log("Cart update request:", req.body);
  res.json({ success: true, message: "Cart updated (mock response)" });
});

app.get("/cart", (req, res) => {
  if (fs.existsSync(frontendDistPath)) {
    return serveReactApp(req, res);
  }

  // Return cart data
  res.json({ items: [], total: 0 });
});

// Odoo JSON-RPC API endpoint
app.post("/api/order", async (req, res) => {
  try {
    const { suitcaseDetails } = req.body;

    if (!suitcaseDetails) {
      return res.status(400).json({ error: "Suitcase details are required" });
    }

    // Odoo configuration from environment variables
    const odooUrl = process.env.ODOO_URL;
    const odooDb = process.env.ODOO_DB;
    const odooUsername = process.env.ODOO_USERNAME;
    const odooApiKey = process.env.ODOO_API_KEY;

    if (!odooUrl || !odooDb || !odooUsername || !odooApiKey) {
      return res.status(500).json({
        error: "Odoo configuration is missing. Please check your .env file.",
      });
    }

    // Authenticate with Odoo and get user ID
    const authenticateData = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        db: odooDb,
        login: odooUsername,
        password: odooApiKey,
      },
      id: Math.floor(Math.random() * 1000000),
    };

    const authenticateResponse = await axios.post(
      `${odooUrl}/web/session/authenticate`,
      authenticateData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (
      !authenticateResponse.data.result ||
      !authenticateResponse.data.result.uid
    ) {
      return res.status(401).json({ error: "Odoo authentication failed" });
    }

    const uid = authenticateResponse.data.result.uid;

    // Create order in Odoo using JSON-RPC
    const orderData = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        service: "object",
        method: "execute_kw",
        args: [
          odooDb,
          uid,
          odooApiKey,
          "sale.order", // Odoo model for sales orders
          "create",
          [
            {
              partner_id: suitcaseDetails.customerId || 1, // Default partner/customer ID
              order_line: [
                [
                  0,
                  0,
                  {
                    product_id: suitcaseDetails.productId || 1,
                    name: suitcaseDetails.name || "Suitcase",
                    product_uom_qty: suitcaseDetails.quantity || 1,
                    price_unit: suitcaseDetails.price || 0,
                  },
                ],
              ],
              // Add any additional fields from suitcaseDetails
              ...(suitcaseDetails.notes && { note: suitcaseDetails.notes }),
            },
          ],
        ],
      },
      id: Math.floor(Math.random() * 1000000),
    };

    const orderResponse = await axios.post(`${odooUrl}/jsonrpc`, orderData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (orderResponse.data.error) {
      return res.status(500).json({
        error: "Failed to create order in Odoo",
        details: orderResponse.data.error,
      });
    }

    res.json({
      success: true,
      orderId: orderResponse.data.result,
      message: "Order created successfully in Odoo",
    });
  } catch (error) {
    console.error("Error creating order in Odoo:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
});


// ─── Analytics API ────────────────────────────────────────────────────────────

const ANALYTICS_FILE = path.join(__dirname, 'analytics.json');

async function readAnalytics() {
  if (isMongoConfigured()) {
    return getMongoData("analytics", "analytics", () => {
      try {
        if (fs.existsSync(ANALYTICS_FILE)) {
          return JSON.parse(fs.readFileSync(ANALYTICS_FILE, 'utf8'));
        }
      } catch (e) {}
      return { daily: {}, pages: {}, clicks: {} };
    });
  }

  try {
    if (fs.existsSync(ANALYTICS_FILE)) {
      return JSON.parse(fs.readFileSync(ANALYTICS_FILE, 'utf8'));
    }
  } catch (e) {}
  return { daily: {}, pages: {}, clicks: {} };
}

async function writeAnalytics(data) {
  try {
    await saveMongoData("analytics", "analytics", data);
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to write analytics:', e.message);
  }
}

// GET /api/analytics – summary for dashboard
app.get('/api/analytics', async (req, res) => {
  const data = await readAnalytics();

  // Build last-14-days array
  const days = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    const entry = data.daily[key] || {};
    days.push({
      date: key,
      label: d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      pageViews: entry.pageViews || 0,
      clicks: entry.clicks || 0,
      sessions: entry.sessions || 0,
      totalTime: entry.totalTime || 0,
    });
  }

  // Top pages (sorted by views)
  const topPages = Object.entries(data.pages || {})
    .map(([url, v]) => ({
      url,
      label: url === '/' ? 'Home' : url.replace(/^\/+/, ''),
      views: v.views || 0,
      avgTime: v.views ? Math.round((v.totalTime || 0) / v.views) : 0,
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 8);

  // Top clicks
  const topClicks = Object.entries(data.clicks || {})
    .map(([key, val]) => ({ key, label: key.replace(/_/g, ' '), value: val }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  // Aggregate totals (last 7 days vs previous 7 days)
  const last7 = days.slice(-7);
  const prev7 = days.slice(-14, -7);
  const totalViews7 = last7.reduce((s, d) => s + d.pageViews, 0);
  const totalViewsPrev7 = prev7.reduce((s, d) => s + d.pageViews, 0);
  const totalSessions7 = last7.reduce((s, d) => s + d.sessions, 0);
  const totalClicks7 = last7.reduce((s, d) => s + d.clicks, 0);
  const avgTimeAll = (() => {
    const allPages = Object.values(data.pages || {});
    const totalViews = allPages.reduce((s, p) => s + (p.views || 0), 0);
    const totalTime = allPages.reduce((s, p) => s + (p.totalTime || 0), 0);
    return totalViews > 0 ? Math.round(totalTime / totalViews) : 0;
  })();

  res.json({
    days,
    topPages,
    topClicks,
    kpi: {
      totalViews7,
      totalViewsPrev7,
      viewsChange: totalViewsPrev7 > 0
        ? Math.round(((totalViews7 - totalViewsPrev7) / totalViewsPrev7) * 100)
        : 0,
      totalSessions7,
      totalClicks7,
      avgTimeSeconds: avgTimeAll,
    },
  });
});

// POST /api/analytics/event – track a single event from frontend
app.post('/api/analytics/event', async (req, res) => {
  const { type, page, detail, duration } = req.body || {};
  if (!type) return res.status(400).json({ error: 'type required' });

  const data = await readAnalytics();
  const today = new Date().toISOString().split('T')[0];

  if (!data.daily[today]) data.daily[today] = { pageViews: 0, clicks: 0, totalTime: 0, sessions: 0 };
  if (!data.pages) data.pages = {};
  if (!data.clicks) data.clicks = {};

  if (type === 'pageview') {
    data.daily[today].pageViews = (data.daily[today].pageViews || 0) + 1;
    if (page) {
      if (!data.pages[page]) data.pages[page] = { views: 0, totalTime: 0 };
      data.pages[page].views = (data.pages[page].views || 0) + 1;
    }
  } else if (type === 'click') {
    data.daily[today].clicks = (data.daily[today].clicks || 0) + 1;
    if (detail) {
      data.clicks[detail] = (data.clicks[detail] || 0) + 1;
    }
  } else if (type === 'time_on_page') {
    const secs = parseInt(duration, 10) || 0;
    data.daily[today].totalTime = (data.daily[today].totalTime || 0) + secs;
    if (page) {
      if (!data.pages[page]) data.pages[page] = { views: 0, totalTime: 0 };
      data.pages[page].totalTime = (data.pages[page].totalTime || 0) + secs;
    }
  }

  await writeAnalytics(data);
  res.json({ ok: true });
});

// --- End of CMS API Endpoints ---


if (fs.existsSync(frontendDistPath)) {
  app.get(/^(?!\/api\/).*/, serveReactApp);
}

// Start server
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  if (!isMongoConfigured()) {
    if (MONGODB_ONLY) {
      console.error("MONGODB_URI is required when MONGODB_ONLY=true.");
      process.exit(1);
    }

    console.log("MongoDB is not configured. Using local JSON files.");
    return;
  }

  try {
    await getMongoDb();
    console.log(`MongoDB connected. Database: ${MONGODB_DB}`);
  } catch (error) {
    console.error("MongoDB connection failed. JSON fallbacks may be used:", error.message);
  }
});
