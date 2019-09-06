const {
    eoC,
    staySilenceUntilMessageOccurre,
    showMessage,
    expectYesOrNo,
    expectSum,
    whatIsTheSumOfRandom,
    stepBack
} = require('./builders');


module.exports.mathDroidConversation = function() {
    return staySilenceUntilMessageOccurre("hello",
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


function jsonToConverstation(subtree) {
    if (typeof subtree === 'string' || subtree instanceof String) {
        return eoC(subtree);
    }

    if (subtree.hasOwnProperty("activation_phrase")) {
        return staySilenceUntilMessageOccurre(
                subtree["activation_phrase"],
                jsonToConverstation(subtree["start"])
            );
    }

    if (subtree["question_type"] === "yes/no") {
        return showMessage(
                subtree["question"],
                expectYesOrNo(
                    jsonToConverstation(subtree["anserws"]["yes"]),
                    jsonToConverstation(subtree["anserws"]["no"])
                )
            );
    }

    if (subtree["question_type"] === "sum") {
        const sum_paramter = parseInt(subtree["sum"], 10);
        return showMessage(
                subtree["question"],
                expectSum(
                    sum_paramter,
                    jsonToConverstation(subtree["anserws"]["__CORRECT"]),
                    jsonToConverstation(subtree["anserws"]["__INCORRECT"])
                )
            );
    }

    if (subtree["question_type"] === "sum_random") {
        return whatIsTheSumOfRandom(
                subtree["question"],
                jsonToConverstation(subtree["anserws"]["__CORRECT"]),
                jsonToConverstation(subtree["anserws"]["__INCORRECT"])
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

    return jsonToConverstation(
            JSON.parse(
                fs.readFileSync(conversationTreeFile)
            )
        );
}
