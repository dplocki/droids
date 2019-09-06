class DroidMemmory
{
    constructor(droid) {
        this.droid = droid;
        this.notAnyMore = false;
    }

    message(message) {
        if (this.notAnyMore == true) {
            return "I know you, you are ok";
        }

        const response = this.droid.message(message);

        if (response === "You are right! I’ll remember you can do the maths!") {
            this.notAnyMore = true;
        }

        return response;
    }
}

module.exports = DroidMemmory;
