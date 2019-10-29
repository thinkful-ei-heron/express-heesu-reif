require('dotenv').config();
<<<<<<< HEAD
const apiToken = process.env.API_TOKEN;
=======
>>>>>>> 3dacb1b7d67aa98b52c65dfd87385321ed0a89f2
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
<<<<<<< HEAD

const movieData = require('./movie-data-small.json');
=======
const movieData = require('./movie-data-small');

>>>>>>> 3dacb1b7d67aa98b52c65dfd87385321ed0a89f2
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());require('dotenv').config();
const apiToken = process.env.API_TOKEN;
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const movieData = require('./movie-data-small.json');
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

function validateBearerToken(req, res, next) {
  const authToken = req.get('Authorization') || '';

  if (!authToken.startsWith('Bearer ')) {
    return res.status(400).json({error: 'Authorization token not found'});
  }

  const [bearer, token] = authToken.split(' ');
  if (token !== apiToken) {
    return res.status(401).json({ error: 'Token is invalid' });
  }
  next();
};

app.get('/movie', validateBearerToken, (req, res) => {
  let outputData = movieData;
  const filterGenre = () => {
    if (req.query.genre) {
      outputData = outputData.filter(item =>
        item.genre.toLowerCase().includes(req.query.genre.toLowerCase())
      );
    }
  };
  const filterCountry = () => {
    if (req.query.country) {
      outputData = outputData.filter(item =>
        item.country.toLowerCase().includes(req.query.country.toLowerCase())
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


<<<<<<< HEAD
function validateBearerToken(req, res, next) {
  const authToken = req.get('Authorization') || '';

  if (!authToken.startsWith('Bearer ')) {
    return res.status(400).json({error: 'Authorization token not found'});
  }

  const [bearer, token] = authToken.split(' ');
  if (token !== apiToken) {
    return res.status(401).json({ error: 'Token is invalid' });
  }
  next();
};

app.get('/movie', validateBearerToken, (req, res) => {
=======
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
>>>>>>> 3dacb1b7d67aa98b52c65dfd87385321ed0a89f2
  let outputData = movieData;
  const filterGenre = () => {
    if (req.query.genre) {
      outputData = outputData.filter(item =>
<<<<<<< HEAD
        item.genre.toLowerCase().includes(req.query.genre.toLowerCase())
=======
        item.genre.toLowerCase().includes(req.query.genre)
>>>>>>> 3dacb1b7d67aa98b52c65dfd87385321ed0a89f2
      );
    }
  };
  const filterCountry = () => {
    if (req.query.country) {
      outputData = outputData.filter(item =>
<<<<<<< HEAD
        item.country.toLowerCase().includes(req.query.country.toLowerCase())
=======
        item.country.toLowerCase().includes(req.query.country)
>>>>>>> 3dacb1b7d67aa98b52c65dfd87385321ed0a89f2
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
