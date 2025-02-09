class DroidMemory
{
    constructor(droid, iKnowYouText) {
        this.droid = droid;
        this.notAnyMore = false;
        this.iKnowYouText = iKnowYouText;
    }

    message(message) {
        if (this.notAnyMore == true) {
            return { message: this.iKnowYouText };
        }

        const response = this.droid.message(message);
        if (response.hasOwnProperty("remember")) {
            this.notAnyMore = true;
        }

        return response;
    }
}

module.exports = DroidMemory;
