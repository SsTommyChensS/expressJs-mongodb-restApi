require('dotenv').config();

const express = require('express');
const connectMongoServer = require('./config/db');
const routes = require('./routes/index.routes');
const app = express();

//Connect mongo server
connectMongoServer();


app.use(express.json());
//Join available routes
const port = process.env.SERVER_PORT;
app.use('/api', routes)
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})