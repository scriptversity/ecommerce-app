const seedProducts = require("./productSeeder");

seedProducts()
  .then(() => {
    console.log("✅ Product model was seeded successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  });