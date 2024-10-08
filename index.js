require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3001;

// Connect to mongoDB
connectDB();

// Cross Origin Resource Sharing
app.use(cors());

app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('working')
})


app.use('/signin', require('./routes/signin'));

app.use('/register', require('./routes/register'));

app.use('/image', require('./routes/image'));

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get('/pokemon', (req, res, next) => {
    function fetchPokemon(afterFetch) {
    let randomNum = getRandomInt(1, 20)
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomNum}/?offset=1&limit=1`)
        .then(res => res.json())
        .then(result => afterFetch(result))
        .catch(err => {
        console.log(err);
        res.sendStatus(500); // Make sure you close the connection on an error!
        })
    }
    fetchPokemon((data) => res.json({data}))
  });


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
