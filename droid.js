class Droid {
    constructor(startMessageHandler) {
        this.startMessageHandler = startMessageHandler;
        this.currentMessageHandler = startMessageHandler;
    }

    message(message) {
        const response = this.currentMessageHandler(cleanMessage(message));

        if (response.isError && response.isError == true) {
            return "Sorry, I didn't understand you.";
        }

        if (response.isEoC && response.isEoC === true) {
            this.currentMessageHandler = this.startMessageHandler;
        } else {
            this.currentMessageHandler = response.handler;
        }

        return response.message;
    }
}


function cleanMessage(message) {
    return message.trim().toLowerCase();
}


module.exports = Droid;
