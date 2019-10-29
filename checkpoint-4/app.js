const express = require('express');
const morgan = require('morgan');

// is this cheating?
const { encrypt } = require('caesar-encrypt');
const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('shit works');
});
