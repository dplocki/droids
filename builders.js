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
