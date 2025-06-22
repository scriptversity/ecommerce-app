require('dotenv').config();
const app = require('./src/app');
const connectDatabase = require('./src/config/database');
// Connect to the database

const port = process.env.PORT || 3000;
const ENV_MODE = process.env.NODE_ENV || 'development';
app.set('port', port);

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  console.log('Shutting down the server due to uncaught exception...');
  process.exit(1);
});

// console.log(a);

connectDatabase();

const server = app.listen(port, () => {
  console.log(`server is running on port ${port} 🚀 in ${ENV_MODE} mode`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  console.log('Shutting down the server due to unhandled promise rejection...');
  server.close(() => {
    process.exit(1);
  });
});