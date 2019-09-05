exports.eoC = function(message) {
    return function() {
        return {
            message: message,
            isEoC: true
        };
    }
}