function dontUnderstand() {
    return {
        isError: true
    };
}


function random(low, high) {
return 10;
    return Math.floor(Math.random() * (high - low) + low)
}


exports.eoC = function(message) {
    return function() {
        return {
            message: message,
            isEoC: true
        };
    }
}


exports.expectYesOrNo = function(actionOnYes, actionOnNo) {
    return function(message) {
        if (message == "yes") {
            return actionOnYes();
        } else if (message == "no") {
            return actionOnNo();
        }

        return dontUnderstand();
    }
}


exports.expectSum = function(expectedSum, actionOnCorrect, actionOnIncorrect) {
    return function(message) {
        if (isNaN(message)) {
            return dontUnderstand();
        }

        const providedSum = parseInt(message, 10);
        if (providedSum == expectedSum) {
            return actionOnCorrect();
        }
        
        return actionOnIncorrect();
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


exports.whatIsTheSumOfRandom = function(actionOnCorrect, actionOnIncorrect) {
    const numberA = random(1, 99);
    const numberB = random(1, 99);
    const message = `What is the sum of ${numberA} and ${numberB}?`;

    return exports.showMessage(
        message,
        exports.expectSum(
            numberA + numberB,
            actionOnCorrect,
            actionOnIncorrect
        )
    );
}


exports.staySilenceUntilMessageOccurre = function(expectedMessage, actionOnOccurred) {
    return function(message) {
        if (message == expectedMessage) {
            return actionOnOccurred();
        }

        return {
            handler: null,
            message: null
        };
    };
}
