require('dotenv').config()
const express = require('express');
const cors = require('cors');
const {
  productRouter,
  commonImageRouter,
  colorModelRouter,
  sizeRouter,
  apiRouter
} = require('./routes');
const {sequelize} = require('./db');
const PORT = process.env.PORT || 7000;
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL
}));
app.use(express.json());
app.use('/apiProduct', productRouter);
app.use('/apiCommonImage', commonImageRouter);
app.use('/apiColorModel', colorModelRouter);
app.use('/apiSize', sizeRouter);
app.use('/api', apiRouter);

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
