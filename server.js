require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

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

// Product CMS API
app.get("/api/product-cms/:id", (req, res) => {
  console.log("==> HIT GET /api/product-cms/ ID:", req.params.id);
  const { id } = req.params;
  const filePath = path.join(__dirname, "products_cms.json");
  if (!fs.existsSync(filePath)) {
    console.log("  File not found, returning empty object");
    return res.json({});
  }
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    console.log("  Data found for ID:", !!data[id]);
    res.json(data[id] || {});
  } catch (e) {
    console.log("  Error parsing JSON:", e.message);
    res.json({});
  }
});

app.post("/api/product-cms/:id", (req, res) => {
  const { id } = req.params;
  const filePath = path.join(__dirname, "products_cms.json");
  let data = {};
  if (fs.existsSync(filePath)) {
    try {
      data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (e) { }
  }
  data[id] = req.body;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  res.json({ success: true });
});

// Products API
app.get("/api/products", (req, res) => {
  const filePath = path.join(__dirname, "products.json");
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Products file not found" });
  }
  try {
    res.json(readJsonFile(filePath));
  } catch (e) {
    console.error("Failed to parse products.json:", e.message);
    res.status(500).json({ error: "Failed to parse products.json" });
  }
});

app.post("/api/products", (req, res) => {
  const filePath = path.join(__dirname, "products.json");
  const newData = req.body;
  
  let oldData = {};
  if (fs.existsSync(filePath)) {
    try {
      oldData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (e) {}
  }

  fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), "utf8");
  res.json({ success: true, message: "Products updated successfully" });
});

app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const productsPath = path.join(__dirname, "products.json");
  const cmsPath = path.join(__dirname, "products_cms.json");
  try {
    // 1. Remove from products.json
    if (fs.existsSync(productsPath)) {
      const data = JSON.parse(fs.readFileSync(productsPath, "utf8"));
      if (data[id]) {
        delete data[id];
        fs.writeFileSync(productsPath, JSON.stringify(data, null, 2), "utf8");
      }
    }

    // 2. Remove from products_cms.json
    if (fs.existsSync(cmsPath)) {
      const data = JSON.parse(fs.readFileSync(cmsPath, "utf8"));
      if (data[id]) {
        delete data[id];
        fs.writeFileSync(cmsPath, JSON.stringify(data, null, 2), "utf8");
      }
    }

    res.json({ success: true, message: `Product ${id} deleted successfully` });
  } catch (e) {
    console.error("Failed to delete product:", e);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// Home Page API
app.get("/api/homepage", (req, res) => {
  const filePath = path.join(__dirname, "homepage.json");
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Home page file not found" });
  }
  try {
    const data = readJsonFile(filePath);
    res.json(data && typeof data === "object" && !Array.isArray(data) ? data : {});
  } catch (e) {
    console.error("Failed to parse homepage.json:", e.message);
    res.status(500).json({ error: "Failed to parse homepage.json" });
  }
});

app.post("/api/homepage", (req, res) => {
  const filePath = path.join(__dirname, "homepage.json");
  const data = req.body;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  res.json({ success: true, message: "Home page updated successfully" });
});

app.get("/api/uploads/videos", (req, res) => {
  const uploadDir = path.join(__dirname, "public", "assets", "uploads");
  const videoExtensions = new Set([".mp4", ".webm", ".mov", ".m4v"]);

  try {
    if (!fs.existsSync(uploadDir)) {
      return res.json({ videos: [] });
    }

    const videos = fs
      .readdirSync(uploadDir)
      .filter((fileName) => videoExtensions.has(path.extname(fileName).toLowerCase()))
      .sort()
      .map((fileName) => `assets/uploads/${fileName}`);

    res.json({ videos });
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

app.get("/api/blogs", (req, res) => {
  const filePath = path.join(__dirname, "blog_cms.json");
  if (!fs.existsSync(filePath)) {
    return res.json({ blogs: defaultBlogs });
  }
  try {
    const data = fs.readFileSync(filePath, "utf8");
    res.json(data ? JSON.parse(data) : { blogs: defaultBlogs });
  } catch (e) {
    res.json({ blogs: defaultBlogs });
  }
});

app.post("/api/blogs", (req, res) => {
  const filePath = path.join(__dirname, "blog_cms.json");
  const blogs = Array.isArray(req.body.blogs) ? req.body.blogs : [];
  const data = {
    blogs,
    updatedAt: req.body.updatedAt || new Date().toISOString()
  };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  res.json({ success: true, blogs, message: "Blog content updated successfully" });
});

// Subscriber API
app.get("/api/subscribers", (req, res) => {
  const filePath = path.join(__dirname, "subscribers.json");
  if (!fs.existsSync(filePath)) {
    return res.json({ subscribers: [] });
  }
  try {
    const data = fs.readFileSync(filePath, "utf8");
    res.json(data ? JSON.parse(data) : { subscribers: [] });
  } catch (e) {
    res.json({ subscribers: [] });
  }
});

app.post("/api/subscribers", (req, res) => {
  const filePath = path.join(__dirname, "subscribers.json");
  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "").trim().toLowerCase();
  const phone = String(req.body.phone || "").trim();

  if (!name || !email || !email.includes("@")) {
    return res.status(400).json({ success: false, error: "Name and valid email are required" });
  }

  let data = { subscribers: [] };
  if (fs.existsSync(filePath)) {
    try {
      const content = fs.readFileSync(filePath, "utf8");
      if (content.trim()) data = JSON.parse(content);
    } catch (e) {}
  }

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

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  res.json({ success: true, subscriber });
});

// Instagram API
app.get("/api/instagram/posts", (req, res) => {
  const filePath = path.join(__dirname, "homepage.json");
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    res.json(data.instagram || { posts: [], profileUrl: "" });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch instagram posts" });
  }
});

app.post("/api/instagram/refresh", async (req, res) => {
  // This is a placeholder for actual Instagram scraping or API call.
  // For now, we will simulate adding a mock post to show the "replacement" logic.
  const filePath = path.join(__dirname, "homepage.json");
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
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

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
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
app.post("/api/reviews/submit", (req, res) => {
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
    const cmsFile = path.join(__dirname, "products_cms.json");
    try {
      let cms = JSON.parse(fs.readFileSync(cmsFile, "utf8"));
      if (!cms[productId]) cms[productId] = {};
      if (!cms[productId].reviews) cms[productId].reviews = [];
      cms[productId].reviews.push(updatedReview);
      fs.writeFileSync(cmsFile, JSON.stringify(cms, null, 2), "utf8");
      return res.json({ success: true, message: "Review approved and published automatically", status: "approved" });
    } catch (e) {
      console.error("Auto-approval failed:", e);
    }
  }

  // Save to Pending
  const filePath = path.join(__dirname, "pending_reviews.json");
  let data = {};
  if (fs.existsSync(filePath)) {
    try {
      const content = fs.readFileSync(filePath, "utf8");
      if (content.trim()) data = JSON.parse(content);
    } catch (e) { }
  }
  if (!data[productId]) data[productId] = [];
  data[productId].push(updatedReview);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  res.json({ success: true, message: "Review submitted for moderation", status: "pending" });
});

app.get("/api/reviews/pending", (req, res) => {
  const filePath = path.join(__dirname, "pending_reviews.json");
  if (!fs.existsSync(filePath)) return res.json({});
  try {
    const data = fs.readFileSync(filePath, "utf8");
    res.json(data ? JSON.parse(data) : {});
  } catch (e) {
    res.json({});
  }
});

app.post("/api/reviews/approve", (req, res) => {
  const { productId, reviewId } = req.body;
  const pendingFile = path.join(__dirname, "pending_reviews.json");
  const cmsFile = path.join(__dirname, "products_cms.json");

  try {
    let pending = JSON.parse(fs.readFileSync(pendingFile, "utf8"));
    let cms = JSON.parse(fs.readFileSync(cmsFile, "utf8"));

    if (pending[productId]) {
      const reviewIdx = pending[productId].findIndex(r => r.id == reviewId);
      if (reviewIdx > -1) {
        const review = pending[productId].splice(reviewIdx, 1)[0];
        review.status = "approved"; // Update status on manual approval
        if (!cms[productId]) cms[productId] = {};
        if (!cms[productId].reviews) cms[productId].reviews = [];
        cms[productId].reviews.push(review);

        fs.writeFileSync(pendingFile, JSON.stringify(pending, null, 2), "utf8");
        fs.writeFileSync(cmsFile, JSON.stringify(cms, null, 2), "utf8");
        return res.json({ success: true });
      }
    }
    res.status(404).json({ error: "Review not found" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete("/api/reviews/:type/:productId/:reviewId", (req, res) => {
  const { type, productId, reviewId } = req.params;
  const fileName = type === "pending" ? "pending_reviews.json" : "products_cms.json";
  const filePath = path.join(__dirname, fileName);

  try {
    let data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (type === "pending") {
      if (data[productId]) {
        data[productId] = data[productId].filter(r => r.id != reviewId);
      }
    } else {
      if (data[productId] && data[productId].reviews) {
        data[productId].reviews = data[productId].reviews.filter(r => r.id != reviewId);
      }
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
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
    const uploadDir = path.join(__dirname, "public", "assets", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Strip base64 prefix if present
    const base64Image = base64Data.split(";base64,").pop();
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, base64Image, { encoding: "base64" });

    const relativePath = `assets/uploads/${fileName}`;
    res.json({ success: true, url: relativePath });
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

function readAnalytics() {
  try {
    if (fs.existsSync(ANALYTICS_FILE)) {
      return JSON.parse(fs.readFileSync(ANALYTICS_FILE, 'utf8'));
    }
  } catch (e) {}
  return { daily: {}, pages: {}, clicks: {} };
}

function writeAnalytics(data) {
  try {
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to write analytics.json:', e.message);
  }
}

// GET /api/analytics – summary for dashboard
app.get('/api/analytics', (req, res) => {
  const data = readAnalytics();

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
app.post('/api/analytics/event', (req, res) => {
  const { type, page, detail, duration } = req.body || {};
  if (!type) return res.status(400).json({ error: 'type required' });

  const data = readAnalytics();
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

  writeAnalytics(data);
  res.json({ ok: true });
});

// --- End of CMS API Endpoints ---


if (fs.existsSync(frontendDistPath)) {
  app.get(/^(?!\/api\/).*/, serveReactApp);
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
