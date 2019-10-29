const express = require('express');
const morgan = require('morgan');

// is this cheating?
const { encrypt } = require('caesar-encrypt');
const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('server works');
});

app.listen(9001, () => {
  console.log('listening to port 9001');
});
