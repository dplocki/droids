class Droid {
    constructor(startMessageHandler) {
        this.startMessageHandler = startMessageHandler;
        this.currentMessageHandler = startMessageHandler;
    }

    message(message) {
        const response = this.currentMessageHandler(message)

        if (response.isError === true) {
            return "Sorry, I didn't get it.";
        }

        if (response.isEoC === true) {
            this.currentMessageHandler = this.startMessageHandler;
            return null;
        }

        this.currentMessageHandler = response.handler;
        return response.message
    }
}

module.exports = Droid;
