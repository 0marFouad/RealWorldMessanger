const express = require('express');
const app = express();
const port = 4000;
const handle = require('./handlers')

app.use(handle.notFound());
app.use(handle.errors);

app.get('/', (req, res) => res.send("Hello World"));

app.listen(port, console.log("Server is Up Now"));