const Droid = require('../droid');
const { expectSum, eoC } = require('../builders');


exports.expectSum_should_react_on_correct = function (test) {
    // Assign
    const message = "Yes!";
    const handler = expectSum(
            1,
            eoC(message),
            eoC("No!")
        );
    const droid = new Droid(handler);
    
    // Act
    const response = droid.message("1");

    // Assert
    test.equal(response, message, "Droid should replay the correct message");
    test.done();
};


exports.expectSum_should_react_on_incorrect = function (test) {
    // Assign
    const message = "No!";
    const handler = expectSum(
            1,
            eoC("Yes!"),
            eoC(message)
        );
    const droid = new Droid(handler);
    
    // Act
    const response = droid.message("2");

    // Assert
    test.equal(response, message, "Droid should replay the correct message");
    test.done();
};


exports.expectSum_should_react_on_incorrect_input = function (test) {
    // Assign
    const message = "yes/no";
    const handler = expectSum(
            1,
            eoC(message),
            eoC(message)
        );
    const droid = new Droid(handler);
    
    // Act
    const response = droid.message("???");

    // Assert
    test.notEqual(response, message, "Droid should replay with the error message");
    test.equal(droid.currentMessageHandler, handler, "Droid should return to start state");
    test.done();
};
