const express = require('express');
const morgan = require('morgan');

const appsData = require('./playstore');

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('server works');
});

app.get('/apps', (req, res) => {
  // if params -> req string
  // if params valid -> return array
  // filtered via params
  let filteredData;
  let sortedData;

  if ('sort' in req.query) {
    if (req.query.sort == 'app') {
      // sort by App (app name)
      filteredData = appsData.sort((a, b) => (a.App > b.App ? 1 : -1));
    } else if (req.query.sort == 'rating') {
      // sort by rating
      filteredData = appsData.sort((a, b) => (a.Rating > b.Rating ? 1 : -1));
    }
  } else {
    // default list
    filteredData = appsData;
  }

  if ('genre' in req.query) {
  }

  res.status(200).json(returnData);
});

app.listen(9001, () => {
  console.log('listening to port 9001');
});
