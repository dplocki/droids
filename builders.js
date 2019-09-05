function dontUnderstand() {
    return {
        isError: true
    };
}


exports.eoC = function(message) {
    return function() {
        return {
            message: message,
            isEoC: true
        };
    }
}


exports.expectYesOrNo = function(onYesAction, onNoAction) {
    return function(message) {
        if (message == "yes") {
            return onYesAction();
        } else if (message == "no") {
            return onNoAction();
        }

        return dontUnderstand();
    }
}


exports.expectSum = function(expectedSum, actionIfCorrect, actionIfIncorrect) {
    return function(message) {
        if (isNaN(message)) {
            return dontUnderstand();
        }

        const providedSum = parseInt(message, 10);
        if (providedSum == expectedSum) {
            return actionIfCorrect();
        }
        
        return actionIfIncorrect();
    };
}


exports.showMessage = function(message, action) {
    return function() {
        return {
            message: message,
            handler: action
        }
    }
}
