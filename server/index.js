require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const handle = require('./handlers');
const routes = require('./routes');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(handle.notFound);
app.use(handle.errors);

app.get('/', function(req,res){
    res.send("hello omar");
});

app.use('/api/auth', routes.auth);
app.use('/api/chat', routes.messages);

app.listen(4000, console.log(`Server is Up Now on PORT ${port}`));