require("dotenv").config();
const mongoose = require("mongoose");
const products = require("./products.json");
const Product = require("../models/product");

const seedProducts = async () => {
  const uri = process.env.DB_URI;
  if (!uri) {
    console.error("❌ DB_URI not set in .env file");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ Connected to MongoDB @ ${conn.connection.host}`);

    await Product.deleteMany();
    console.log("🗑️ Existing products removed");

    await Product.insertMany(products);
    console.log("📦 New products seeded");

    await mongoose.disconnect();
    console.log("🔌 Disconnected from DB");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

// if (require.main === module) {
//   seedProducts();
// }

module.exports = seedProducts;
