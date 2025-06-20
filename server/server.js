require('dotenv').config();
const app = require('./src/app');

const port = process.env.PORT || 3000;
const ENV_MODE = process.env.NODE_ENV || 'development';
app.set('port', port);

app.listen(3000, () => {
  console.log(`server is running on port ${port} 🚀 in ${ENV_MODE} mode`);
});