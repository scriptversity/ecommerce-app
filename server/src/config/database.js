const mongoose = require('mongoose');

const connectDatabase = async () => {
  const uri = process.env.DB_URI;

  if (!uri) {
    console.error('❌ DB_URI not defined in environment variables');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri, {});

    console.log(`✅ MongoDB connected → ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDatabase;
