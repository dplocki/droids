const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json'}));


app.post("/", (req, res) => {
    const body = req.body;
    const droidName = body.droidId;
    const message = body.message;

    res.status(200).send([
        droidName,
        message
    ]);
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
