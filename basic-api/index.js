const express = require('express');
const config = require('dotenv').config()
const app = express();
const cors = require('cors');
const port = 5000;
const { notesRouter } = require('./api/v1/index');
require('./db');

app.use(express.json());

app.use(cors());

// root(/)
app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/notes', notesRouter)

app.listen(port, () => {
    console.log(`backend app running on port http://localhost:${port}`)
})