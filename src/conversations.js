const {
    eoC,
    staySilentUntilMessageOccurs,
    showMessage,
    expectYesOrNo,
    expectSum,
    whatIsTheSumOfRandom,
    stepBack
} = require('./builders');


module.exports.mathDroidConversation = function() {
    return staySilentUntilMessageOccurs("hello",
            showMessage(
                "Are you a droid?",
                expectYesOrNo(
                    showMessage("So then, prove you can do some math. What is the sum of 8 and 9?",
                        expectSum(8 + 9,
                            showMessage("​You are right! Wanna try another one?",
                                expectYesOrNo(
                                    whatIsTheSumOfRandom("What is the sum of {RANDOM_NUMBER} and {RANDOM_NUMBER}?",
                                        eoC("You are right! I’ll remember you can do the maths!", { canMath: true }),
                                        eoC("Nice try, human!")
                                    ),
                                    eoC("I see… Nice try, human!")
                                )
                            ),
                            stepBack("Let’s try again. What is the sum of 8 and 9?")
                        )
                    ),
                    eoC("​That’s so sad.")
                )
            )
        );
};


function jsonToConversation(subtree) {
    if (typeof subtree === 'string' || subtree instanceof String) {
        return eoC(subtree);
    }

    if (subtree.hasOwnProperty("activation_phrase")) {
        return staySilentUntilMessageOccurs(
                subtree["activation_phrase"],
                jsonToConversation(subtree["start"])
            );
    }

    if (subtree["question_type"] === "yes/no") {
        return showMessage(
                subtree["question"],
                expectYesOrNo(
                    jsonToConversation(subtree["answers"]["yes"]),
                    jsonToConversation(subtree["answers"]["no"])
                )
            );
    }

    if (subtree["question_type"] === "sum") {
        const sum_parameter = parseInt(subtree["sum"], 10);
        return showMessage(
                subtree["question"],
                expectSum(
                    sum_parameter,
                    jsonToConversation(subtree["answers"]["__CORRECT"]),
                    jsonToConversation(subtree["answers"]["__INCORRECT"])
                )
            );
    }

    if (subtree["question_type"] === "sum_random") {
        return whatIsTheSumOfRandom(
                subtree["question"],
                jsonToConversation(subtree["answers"]["__CORRECT"]),
                jsonToConversation(subtree["answers"]["__INCORRECT"])
            );
    }

    if (subtree["question_type"] === "step_back") {
        return stepBack(subtree["question"]);
    }

    if (subtree["question_type"] === "eoc") {
        return eoC(subtree["question"], subtree["remember"]);
    }

    throw new Error(`Parsing error: unfamiliar node: ${subtree}`);
}


module.exports.loadConversationTree = function(conversationTreeFile) {
    const fs = require("fs");

    return jsonToConversation(
            JSON.parse(
                fs.readFileSync(conversationTreeFile)
            )
        );
}
