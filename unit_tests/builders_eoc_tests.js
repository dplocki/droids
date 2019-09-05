const Droid = require('../droid');
const eoC = require('../builders').eoC;

exports.single_eco_builder_must_create_loop = function (test) {
    // Assign
    const message = "I'm not taking with you";
    const handler = eoC("I'm not taking with you");
    const droid = new Droid(handler);
    
    // Act
    droid.message("asas");
    droid.message("sdsd");
    droid.message("cvcv");

    // Assert
    test.equal(droid.message("xcxcxc"), message, "Droid should always replay the message");
    test.equal(droid.currentMessageHandler, handler, "Droid should always be in one state");
    test.done();
};
