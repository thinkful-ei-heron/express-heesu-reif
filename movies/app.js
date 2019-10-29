const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const movieData = require('./movie-data-small');

const app = express();

app.use(morgan('dev'));
app.use(function validateBearerToken(req, res, next) {
  // leaving this open is fine, I'm on windows and don't want to create a new env_var for this
  const apiToken = 'f2234a8a-fa6b-11e9-8f0b-362b9e155667';
  const authToken = req.get('Authorization');
  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' });
  }
  next();
});
app.use(helmet());
app.use(cors());

app.get('/movie', (req, res) => {
  let filterData = movieData;
  if (req.query.genre) {
    filterData = movieData.filter(item =>
      item.genre.toLowerCase().includes(req.query.genre)
    );
  }

  if (req.query.country) {
    filterData = movieData.filter(item =>
      item.country.toLowerCase().includes(req.query.country)
    );
  }

  if (req.query.avg_vote) {
    filterData = movieData.filter(item => item.avg_vote >= req.query.avg_vote);
  }

  res.status(200).json(filterData);
});

app.listen(8000, () => {
  console.log('listening to port 8000');
});
