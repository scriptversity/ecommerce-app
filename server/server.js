require('dotenv').config();
const app = require('./src/app');
const connectDatabase = require('./src/config/database');
// Connect to the database

const port = process.env.PORT || 3000;
const ENV_MODE = process.env.NODE_ENV || 'development';
app.set('port', port);

connectDatabase();

app.listen(port, () => {
  console.log(`server is running on port ${port} 🚀 in ${ENV_MODE} mode`);
});