require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const movieData = require('./movie-data-small');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use(function validateBearerToken(req, res, next) {
  const authToken = req.get('Authorization');
  console.log('authToken: ' + authToken);
  const apiToken = process.env.API_TOKEN;
  console.log('apiToken: ' + apiToken);
  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' });
  }
  next();
});

app.get('/movie', (req, res) => {
  let outputData = movieData;
  const filterGenre = () => {
    if (req.query.genre) {
      outputData = outputData.filter(item =>
        item.genre.toLowerCase().includes(req.query.genre)
      );
    }
  };
  const filterCountry = () => {
    if (req.query.country) {
      outputData = outputData.filter(item =>
        item.country.toLowerCase().includes(req.query.country)
      );
    }
  };
  const filterVote = () => {
    if (req.query.avg_vote) {
      outputData = outputData.filter(
        item => item.avg_vote >= req.query.avg_vote
      );
    }
  };
  const filterMovies = () => {
    filterGenre();
    filterCountry();
    filterVote();
    return outputData;
  };

  res.status(200).json(filterMovies());
});

app.listen(8000, () => {
  console.log('listening to port 8000');
});
