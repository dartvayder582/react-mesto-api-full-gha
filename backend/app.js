const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const { errors } = require('celebrate');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const publicRoutes = require('./routes/auth');
const privateRoutes = require('./routes/index');
const auth = require('./middlewares/auth');
const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3001', 'https://mesto-russia.nomoredomainsrocks.ru'],
}));

// security and validation
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// req logger
app.use(requestLogger);

// req limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
});
app.use(limiter);

// crash-test
// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

// auth and routes
app.use(publicRoutes);
app.use(auth);
app.use(privateRoutes);

// err logger
app.use(errorLogger);

// errors
app.use(errors({ message: 'Переданы некорректные данные' }));
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
