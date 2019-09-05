const express = require('express');
const bodyParser = require('body-parser');
const mathDroidConversation = require('./conversation').mathDroidConversation;
const Droid = require('./droid');

const app = express();
const port = process.env.PORT || 3000;
const droidsDatabase = new Map();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json'}));


app.put("/", (req, res) => {
    const body = req.body;
    const droidName = body.droidId;
    const message = body.message;
    const droid = droidsDatabase.get(droidName) || new Droid(mathDroidConversation());

    droidsDatabase.set(droidName, droid);

    res.status(200).send(droid.message(message));
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
