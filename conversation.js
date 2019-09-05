const {
    eoC,
    staySilenceUntilMessageOccurre,
    showMessage,
    expectYesOrNo,
    expectSum,
    whatIsTheSumOfRandom
} = require('./builders');


module.exports.mathDroidConversation = function() {
    return staySilenceUntilMessageOccurre("hello",
            showMessage(
                "Are you a droid?",
                expectYesOrNo(
                    showMessage(
                        "So then, prove you can do some math. What is the sum of 8 and 9?",
                        expectSum(8 + 9,
                            showMessage(
                                "​You are right! Wanna try another one?",
                                expectYesOrNo(
                                    whatIsTheSumOfRandom(
                                        eoC("You are right! I’ll remember you can do the maths!"),
                                        eoC("Nice try, human!")
                                    ),
                                    eoC("I see… Nice try, human!")
                                )
                            ),
                            eoC("Let’s try again. What is the sum of 8 and 9?")
                        )
                    ),
                    eoC("​That’s so sad.")
                )
            )
        );
};
