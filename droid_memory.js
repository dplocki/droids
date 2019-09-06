class DroidMemmory
{
    constructor(droid) {
        this.droid = droid;
        this.notAnyMore = false;
    }

    message(message) {
        if (this.notAnyMore == true) {
            return { message: "I know you, you are ok" };
        }

        const response = this.droid.message(message);

        if (response.hasOwnProperty("remember")) {
            this.notAnyMore = true;
        }

        return response;
    }
}

module.exports = DroidMemmory;
