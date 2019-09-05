class Scribe {
    constructor(droid) {
        this.droid = droid;
        this.log = [];
    }

    message(message) {
        const response = this.droid.message(message);

        this.log.push({
            timestamp: new Date(),
            user: message,
            droid: response
        })

        return response;
    }
}

module.exports = Scribe;