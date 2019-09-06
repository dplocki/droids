class Scribe {
    constructor(droid) {
        this.droid = droid;
        this.log = [];
    }

    message(message) {
        const response = this.droid.message(message);
        if (response === null || response.message === null) {
            return null;
        }

        const timestamp = new Date();
        this.log.push({
            timestamp: timestamp,
            user: message,
            droid: response.message
        })

        return {
            timestamp: timestamp,
            response: response.message
        };
    }
}

module.exports = Scribe;