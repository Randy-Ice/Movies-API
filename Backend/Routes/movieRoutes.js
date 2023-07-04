const express = require('express');
const router = express.Router();
const {listOfMovies} = require('../Controllers/movieController');

router.get('/', listOfMovies)



module.exports = router