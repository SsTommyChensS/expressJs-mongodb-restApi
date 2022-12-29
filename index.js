require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index.routes');
const app = express();

//Connect mongo database
const mongoString = process.env.DATABASE_URL;
mongoose.set('strictQuery', false);
mongoose.connect(mongoString);

//Check the connection of database
const db = mongoose.connection;
db.on('error', () => {
    console.log('Database connect failed!');
});
db.once('connected', () => {
    console.log('Database connected!');
})

app.use(express.json());
//Join available routes
app.use('/api', routes);

app.listen(3000, () => {
    console.log(`Server started at port ${3000}`);
})