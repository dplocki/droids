function notUnderstand() {
    return {
        isError: true
    };
}


function random(low, high) {
    return Math.floor(Math.random() * (high - low) + low)
}


exports.eoC = function(message, rememberPackage) {
    return function() {
        let result = {
            message: message,
            isEoC: true,
        };

        if (rememberPackage) {
            result['remember'] = rememberPackage;
        }

        return result;
    }
}


exports.expectYesOrNo = function(actionOnYes, actionOnNo) {
    return function(message) {
        if (message == "yes") {
            return actionOnYes();
        } else if (message == "no") {
            return actionOnNo();
        }

        return notUnderstand();
    }
}


exports.expectSum = function(expectedSum, actionOnCorrect, actionOnIncorrect) {
    return function(message) {
        if (isNaN(message)) {
            return notUnderstand();
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


exports.whatIsTheSumOfRandom = function(messageTemplate, actionOnCorrect, actionOnIncorrect) {
    const numberA = random(0, 50);
    const numberB = random(0, 50);
    const numberPlaceholder = "{RANDOM_NUMBER}";
    const message = messageTemplate.replace(numberPlaceholder, numberA).replace(numberPlaceholder, numberB);

    return exports.showMessage(
        message,
        exports.expectSum(
            numberA + numberB,
            actionOnCorrect,
            actionOnIncorrect
        )
    );
}


exports.staySilentUntilMessageOccurs = function(expectedMessage, actionOnOccurred) {
    return function(message) {
        if (message == expectedMessage) {
            return actionOnOccurred();
        }

        return {
            handler: null,
            message: null
        };
    };
};


exports.stepBack = function(message) {
    return function() {
        return {
            message: message,
            stepBack: true
        };
    };
};
