const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        minLength: 3,
        trim: true,
        required: true,
        unique: true
    },
    description: {
        type: String,
        minLength: 3,
        trim: true,
        required: true
    },
    release_date: {
        type: Date,
        required: true
    },
    rating: {
        type: String,
        enum: ['G', 'PG-13', 'R', 'NC-17'],
        required: true,
        validator: {
            validate: (v) => {
                return v && v.length > 0
            },
            message: "Please enter a rating for the given movie"
        }
    },
    genre: {
        type: [String],
        trim: true,
        required: true,
        validator: {
            validate: (v) => {
                return v && v.length > 0
            },
            message: 'Enter at least one genre for the given movie'
        },
    },
    runtime: {
        type: String,
        trim: true,
        required: true
        },
    cast: {
        type: [String],
         trim: true,
        required: true
    },
    showtimes: {
        type: [Object],
        trim: true,
        required:true
     }
    
}, {timestamps: true})


const Movie = mongoose.model('Movie', movieSchema)

const add = async () => {
    const movie = new Movie({
        title: 'Indiana Jones and the Dial of Destiny',
        description:`
        Harrison Ford returns as the legendary hero archaeologist in the highly anticipated fifth installment of the iconic “Indiana Jones” franchise, which is directed by James Mangold (“Ford v Ferrari,” “Logan”). Starring along with Ford are Phoebe Waller-Bridge (“Fleabag”), Antonio Banderas (“Pain and Glory”), John Rhys-Davies (“Raiders of the Lost Ark”), Shaunette Renee Wilson (“Black Panther”), Thomas Kretschmann (“Das Boot”), Toby Jones (“Jurassic World: Fallen Kingdom”), Boyd Holbrook (“Logan”), Oliver Richters (“Black Widow”), Ethann Isidore (“Mortel”) and Mads Mikkelsen (“Fantastic Beasts: The Secrets of Dumbledore”). Directed by James Mangold, the film is produced by Kathleen Kennedy, Frank Marshall and Simon Emanuel, with Steven Spielberg and George Lucas serving as executive producers. John Williams, who has scored each Indy adventure since the original "Raiders of the Lost Ark" in 1981, is once again composing the score.
        `,
        release_date: Date('June, 30, 2023'),
        rating: 'PG-13',
        genre: 'Action/Adventure',
        runtime: '2 hr 34 min',
        cast: ['one', 'two'],
        showtimes: [
            {day: 'Monday', showtime: ['1pm', '5pm']},
            {day: 'Tuesday', showtime: ['7pm']}
        ],


    })
    try{
        const save = await movie.save()
        console.log(save)
    }
    catch(err){
        console.log(err.message)
    }
}
add()




module.exports = mongoose.model('Movie', movieSchema)