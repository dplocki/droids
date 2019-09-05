const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(session({
    secret: process.env.SECRET || 'donttellanyone'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).send("yeap, it is working");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
