require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { GridFSBucket, MongoClient } = require("mongodb");

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || "raw_radicles";
const projectRoot = path.join(__dirname, "..");
const sourceDirs = [
  path.join(projectRoot, "public"),
  path.join(projectRoot, "frontend", "public"),
  path.join(projectRoot, "frontend", "dist")
];

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

const walkFiles = (dir) => {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walkFiles(fullPath) : [fullPath];
  });
};

const uploadFile = async (db, bucket, sourceDir, filePath) => {
  const relativePath = path.relative(sourceDir, filePath).replace(/\\/g, "/");
  const assetPath = relativePath;
  const existingFiles = await db.collection("assets.files").find({ filename: assetPath }).toArray();

  await Promise.all(existingFiles.map((file) => bucket.delete(file._id).catch(() => {})));

  await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(bucket.openUploadStream(assetPath, {
        contentType: getContentType(filePath),
        metadata: {
          source: "public-folder",
          originalPath: filePath,
          sourceDir,
          importedAt: new Date()
        }
      }))
      .on("error", reject)
      .on("finish", resolve);
  });

  console.log(`Imported ${assetPath}`);
};

const main = async () => {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is missing. Add it to your .env file first.");
  }

  const files = sourceDirs.flatMap((sourceDir) =>
    walkFiles(sourceDir).map((filePath) => ({ sourceDir, filePath }))
  );
  if (files.length === 0) {
    console.log("No files found in public asset folders");
    return;
  }

  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db(MONGODB_DB);
    const bucket = new GridFSBucket(db, { bucketName: "assets" });

    for (const file of files) {
      await uploadFile(db, bucket, file.sourceDir, file.filePath);
    }

    console.log(`Asset import complete. Files: ${files.length}. Database: ${MONGODB_DB}`);
  } finally {
    await client.close();
  }
};

main().catch((error) => {
  console.error("Asset import failed:", error.message);
  process.exit(1);
});
