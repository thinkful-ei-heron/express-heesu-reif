const express = require('express');
const morgan = require('morgan');
const movieData=require('./movie-data-small');

const app=express();

app.get('/movie', (req, res) => {
    let filterData=movieData;
    if(req.query.genre) {
        filterData=movieData.filter(item => 
            item.genre.toLowerCase().includes(req.query.genre)
        )
    }

    if(req.query.country) {
        filterData=movieData.filter(item => 
            item.country.toLowerCase().includes(req.query.country)
        )
    }

    if(req.query.avg_vote) {
        filterData=movieData.filter(item => 
            item.avg_vote >= req.query.avg_vote
        )
    }

    res.status(200).json(filterData);
});

app.listen(8000, () => {
    console.log('listening to port 8000');
});