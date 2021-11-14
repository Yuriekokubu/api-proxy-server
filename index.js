const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

//Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: 'อย่าส่งมาเยอะ ใจเย็นๆ',
});

// app.use(limiter);
app.set('trust proxy', 1);
app.use(cors());

const limitCheck = (req, res, next, options) => {
  console.log(req);
  res.status(options.statusCode).send(options.message);
};
// Set static folder
app.use(express.static('public'));
// app.use(express.static('public'));
app.use('/api', limiter, limitCheck, require('./routes'));

app.use(errorHandler);

app.listen(PORT, () => console.log('Server is running port' + ' ' + PORT));
