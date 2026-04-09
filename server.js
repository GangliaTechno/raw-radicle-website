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

// Products API
app.get("/api/products", (req, res) => {
  const filePath = path.join(__dirname, "products.json");
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Products file not found" });
  }
  try {
    const data = fs.readFileSync(filePath, "utf8");
    res.json(JSON.parse(data));
  } catch (e) {
    res.status(500).json({ error: "Failed to parse products.json" });
  }
});

app.post("/api/products", (req, res) => {
  const filePath = path.join(__dirname, "products.json");
  const data = req.body;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  res.json({ success: true, message: "Products updated successfully" });
});

// Home Page API
app.get("/api/homepage", (req, res) => {
  const filePath = path.join(__dirname, "homepage.json");
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Home page file not found" });
  }
  try {
    const data = fs.readFileSync(filePath, "utf8");
    res.json(JSON.parse(data));
  } catch (e) {
    res.status(500).json({ error: "Failed to parse homepage.json" });
  }
});

app.post("/api/homepage", (req, res) => {
  const filePath = path.join(__dirname, "homepage.json");
  const data = req.body;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  res.json({ success: true, message: "Home page updated successfully" });
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

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")));

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

// --- End of CMS API Endpoints ---

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
