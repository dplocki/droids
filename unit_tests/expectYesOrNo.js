const Droid = require('../droid');
const { expectYesOrNo, eoC } = require('../builders');


exports.expectYesOrNo_should_react_correctly_on_yes = function (test) {
    // Assign
    const message = "I'm ok with yes";
    const handler = expectYesOrNo(
            eoC(message),
            eoC("I'm not ok with no")
        );
    const droid = new Droid(handler);
    
    // Act
    const response = droid.message("yes");

    // Assert
    test.equal(response, message, "Droid should replay the correct message");
    test.equal(droid.currentMessageHandler, handler, "Droid should return to start state");
    test.done();
};


exports.expectYesOrNo_should_react_correctly_on_no = function (test) {
    // Assign
    const message = "I'm ok with no";
    const handler = expectYesOrNo(
            eoC("I'm not ok with yes"),
            eoC(message)
        );
    const droid = new Droid(handler);
    
    // Act
    const response = droid.message("no");

    // Assert
    test.equal(response, message, "Droid should replay the correct message");
    test.equal(droid.currentMessageHandler, handler, "Droid should return to start state");
    test.done();
};


exports.expectYesOrNo_should_be_limited_to_yes_or_no = function (test) {
    // Assign
    const message = "yes/no";
    const handler = expectYesOrNo(
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
