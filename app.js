const express = require('express');
const bodyParser = require('body-parser');
const Conversations = require('./src/conversations');
const Droid = require('./src/droid');
const DroidMemmory = require('./src/droid_memory');
const Scribe = require('./src/scribe');

const app = express();
const port = process.env.PORT || 3000;
const droidsDatabase = new Map();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json'}));


function getDroid(droidName) {
    if (!droidsDatabase.has(droidName)) {
        droidsDatabase.set(
            droidName,
            new Scribe(
                new DroidMemmory(
                    new Droid(
                        //Conversations.mathDroidConversation()
                        Conversations.loadConversationTree("example.conversation.json")
                    )
                )
            )
        );
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


app.get("/:droidName/:day", (req, res) => {
    const droidName = req.params['droidName'];
    const dayDate = new Date(req.params['day']);

    if (isNaN(dayDate))
    {
        res.status(400).send(null);
        return;
    }

    const dayDateString = dayDate.toDateString();

    if (droidsDatabase.has(droidName))
    {
        const results = droidsDatabase
            .get(droidName)
            .log
            .filter(x => x.timestamp.toDateString() === dayDateString)

        if (results.length > 0) {
            res.status(200).send(results);
            return;
        }
    }

    res.status(404).send(null);
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
