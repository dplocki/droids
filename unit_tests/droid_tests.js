const Droid = require('../droid');

exports.droid_should_return_message_from_handler = function (test) {
    // Assign
    const message = "ok";

    // Act
    const droid = new Droid(function () {
        return { message: message }
    });

    // Assert
    test.equal(droid.message("something"), message, "Droid should simply pass the message");
    test.done();
};

exports.droid_should_change_state_according_to_resposne = function (test) {
    // Assign
    const state2MessageHandler = function() {
        return {
            message: "Stage 2"
        };
    };
    const state1MessageHandler = function () {
        return {
            handler: state2MessageHandler,
            message: "Stage 1"
        }
    }

    // Act
    const droid = new Droid(state1MessageHandler);
    const response = droid.message("Something");
    
    // Assert
    test.equal(response, "Stage 1", "Droid should return message from first stage");
    test.equal(droid.currentMessageHandler, state2MessageHandler, "Droid didn't change his message handler");
    test.done();
};

exports.droid_should_return_return_to_begin_state_after_eoc = function (test) {
    // Assign
    const message = "ok";

    const state3MessageHandler = function() {
        return {
            isEoC: true
        }
    };
    const state2MessageHandler = function() {
        return {
            handler: state3MessageHandler,
            message: "Stage 2"
        };
    };
    const state1MessageHandler = function () {
        return {
            handler: state2MessageHandler,
            message: "Stage 1"
        }
    }

    // Act
    const droid = new Droid(state1MessageHandler);
    droid.message("you are in stage 1");
    droid.message("you are in stage 2");
    const messageReplay = droid.message("you are in stage 3");

    // Asssert
    test.equal(messageReplay, null, "Droid should not return any message (conversion has been finished)");
    test.equal(droid.currentMessageHandler, state1MessageHandler)
    test.done();
};

exports.droid_should_return_error_message = function (test) {
    // Assign
    const message = "test message";
    const state1MessageHandler = function () {
        return {
            handler: function () { throw new Exception("I shoudn't be called!"); },
            message: message,
            isError: true
        }
    }

    // Act
    const droid = new Droid(state1MessageHandler);
    const messageReplay = droid.message("move to stage 2");

    // Asssert
    test.notEqual(messageReplay, message, "Droid should not return normal message");
    test.equal(droid.currentMessageHandler, state1MessageHandler, "Droid should not change stage");
    test.done();
};