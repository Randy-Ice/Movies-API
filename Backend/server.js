const mongoose = require('mongoose');
require('dotenv').config();
const helmet = require('helmet')
const morgan = require('morgan')
const logger = require('./log/winston');
const express = require('express');
const app = express();

//^register routes
const movieRoutes = require('./Routes/movieRoutes');


process.on('uncaughtException', (ex) => {
    console.log(ex.message)
    logger.error(ex.message)
})

//& middleware
app.use(express.json());
app.use(helmet())
if(app.get('env') === 'development'){
    app.use(morgan('tiny'))
    console.log('morgan enabled')
}

app.get('/', (req, res) => {
    res.status(200).send('<h1 style="color: red;">Hello travelers</h1>')
})

app.use('/api/movies', movieRoutes)


mongoose.connect(process.env.MONGODB)
.then(() => {
    app.listen(process.env.PORT, () => {
    console.log(`Database connection established, listening on port: ${process.env.PORT}`)
    })
})
.catch((err)=> {
    console.log(err.message)
    logger.error(err.message)
})

//