# Droids

The node project.

# Task:

Create an API for Droids:

 * Many Droids know this api and can use it
 * It’s possible to send answer YES, NO, or any number (0-100)
 * Api returns next question from given survey in JSON format
 * It’s possible to get a whole conversation (questions and Droid’s answers) for given Droid, but only by a
human who knows droidId and the day that conversation has a place.
 * Conversation starts when HELLO message is received
 * Droid that proved, it can do the maths, should not be able to prove again.
 * Conversation:
```
Are you a droid?
    If yes: ​So then, prove you can do some math. What is the sum of 8 and 9?
        If correct: ​You are right! Wanna try another one?
            If yes: ​What is the sum of {RANDOM_NUMBER} and {RANDOM_NUMBER}?
                If correct​: You are right! I’ll remember you can do the maths! ​EoC
                If incorrect: Nice try, human! ​EoC
            If no: ​I see… Nice try, human! ​EoC
        If incorrect: ​Let’s try again. What is the sum of 8 and 9?
    If no:​That’s so sad. ​EoC
```
 * Samples:
```js
{
    "message": "hello",
    "droidId": "101761aa-f705-4aea-8fb7-0b3b980ebf0f"
}

{
    "message": "yes",
    "droidId": "101761aa-f705-4aea-8fb7-0b3b980ebf0f"
}

{
    "message": "no",
    "droidId": "101761aa-f705-4aea-8fb7-0b3b980ebf0f"
}

{
    "message": "99",
    "droidId": "101761aa-f705-4aea-8fb7-0b3b980ebf0f"
}
```

# Initialize

```
npm install
```

During development suggest running command is following:

```
npm run dev
```

# API

| PATH               | METHOD      | Description  |
| ------------------ |-------------| ------------ |
| `/`                | PUT         | The main way to communicate with bot according to requested specification |
| `/:droidName/:day` | GET         | Returns the history of conversion for given Droid and date |

# Tests

Run command:

```
npm test
```
