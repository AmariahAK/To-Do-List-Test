const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  
const todoRoutes = require('./routes/todoRoutes');  
const sequelize = require('./config/db');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://127.0.0.1:5500'  
}));  
app.use(bodyParser.json());
app.use('/api', todoRoutes);

// Sync database
sequelize.sync().then(() => console.log('Database synced successfully'));

module.exports = app;