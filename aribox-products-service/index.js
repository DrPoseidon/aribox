require('dotenv').config()
const express = require('express');
const cors = require('cors');
const router = require('./router');
const {sequelize} = require('./db');
const PORT = process.env.PORT || 7000;
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL
}));
app.use(express.json());
app.use('/api', router);

const start = async () => {
  try{
    app.listen(PORT, () => {
      console.log(`Сервер запущен на ${PORT} порту`);
    });
    await sequelize.authenticate();
  } catch(e) {
    console.log(e);
  }
}

start();
