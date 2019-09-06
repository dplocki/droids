class Scribe {
    constructor(droid) {
        this.droid = droid;
        this.log = [];
    }

    message(message) {
        const wasWaitingForBeginBefore = this.droid.isWaitingForBegin();
        const response = this.droid.message(message);
        const wasWaitingForBeginAfter = this.droid.isWaitingForBegin();

        if (wasWaitingForBeginBefore && wasWaitingForBeginAfter) {
            return null;
        }

        const timestamp = new Date();
        this.log.push({
            timestamp: timestamp,
            user: message,
            droid: response
        })

        return {
            timestamp: timestamp,
            response: response
        };
    }
}

module.exports = Scribe;