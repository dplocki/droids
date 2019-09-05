const express = require('express');
const bodyParser = require('body-parser');
const mathDroidConversation = require('./conversation').mathDroidConversation;
const Droid = require('./droid');
const Scribe = require('./scribe');

const app = express();
const port = process.env.PORT || 3000;
const droidsDatabase = new Map();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json'}));


function getDroid(droidName) {
    if (!droidsDatabase.has(droidName)) {
        droidsDatabase.set(droidName, new Scribe(new Droid(mathDroidConversation())));
    }

    return droidsDatabase.get(droidName);
}


app.put("/", (req, res) => {
    const body = req.body;
    const droidName = body.droidId;
    const message = body.message;
    const droid = getDroid(droidName);

    res.status(200).send(droid.message(message));
});


app.get("/:droidName", (req, res) => {
    const droidName = req.params['droidName'];

    if (droidsDatabase.has(droidName))
    {
        res.status(200).send(droidsDatabase.get(droidName).log);
        return;
    }

    res.status(404).send(null);
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
