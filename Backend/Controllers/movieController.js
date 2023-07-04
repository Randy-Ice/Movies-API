const Movie = require('../Models/movieModel');

const listOfMovies = async (req, res) => {
    const movie = await Movie.find({})
    res.status(200).json(movie)
}



module.exports = {
    listOfMovies
}