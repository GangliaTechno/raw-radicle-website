require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || "raw_radicles";

const imports = [
  { fileName: "homepage.json", collection: "homepage", documentId: "homepage" },
  { fileName: "products.json", collection: "products", documentId: "products" },
  { fileName: "products_cms.json", collection: "productCms", documentId: "productCms" },
  { fileName: "blog_cms.json", collection: "blogs", documentId: "blogs" },
  { fileName: "subscribers.json", collection: "subscribers", documentId: "subscribers" },
  { fileName: "pending_reviews.json", collection: "pendingReviews", documentId: "pendingReviews" },
  { fileName: "analytics.json", collection: "analytics", documentId: "analytics" }
];

const readJsonFile = (filePath) => {
  const content = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  if (!content.trim()) return {};
  return JSON.parse(content);
};

const main = async () => {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is missing. Add it to your .env file first.");
  }

  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db(MONGODB_DB);

    for (const item of imports) {
      const filePath = path.join(__dirname, "..", item.fileName);

      if (!fs.existsSync(filePath)) {
        console.log(`Skipped ${item.fileName}: file not found`);
        continue;
      }

      const data = readJsonFile(filePath);
      await db.collection(item.collection).replaceOne(
        { _id: item.documentId },
        {
          _id: item.documentId,
          data,
          sourceFile: item.fileName,
          importedAt: new Date()
        },
        { upsert: true }
      );

      console.log(`Imported ${item.fileName} -> ${item.collection}`);
    }

    console.log(`Import complete. Database: ${MONGODB_DB}`);
  } finally {
    await client.close();
  }
};

main().catch((error) => {
  console.error("Import failed:", error.message);
  process.exit(1);
});
