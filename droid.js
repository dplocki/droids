class Droid {
    constructor(startMessageHandler) {
        this.startMessageHandler = startMessageHandler;
        this.currentMessageHandler = startMessageHandler;
        this.handlersHistory = [];
    }

    message(message) {
        const response = this.currentMessageHandler(cleanMessage(message));

        if (response.isError && response.isError == true) {
            return { message: "Sorry, I didn't understand you." };
        }

        if (response.isEoC && response.isEoC === true) {
            this.currentMessageHandler = this.startMessageHandler;
            this.handlersHistory = [];
        } else if (response.stepBack && response.stepBack === true) {
            this.currentMessageHandler = this.handlersHistory[this.handlersHistory.length - 1];
        } else {
            this.currentMessageHandler = response.handler || this.currentMessageHandler;
            this.handlersHistory.push(response.handler);
        }

        return response;
    }

    isWaitingForBegin() {
        return this.startMessageHandler === this.currentMessageHandler;
    }
}


function cleanMessage(message) {
    return message.trim().toLowerCase();
}


module.exports = Droid;
