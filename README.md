# jsQuizizz
[![NPM](https://img.shields.io/npm/v/jsquizizz?color=darkcyan&logo=npm&style=for-the-badge&label=Version)](https://nodei.co/npm/jsquizizz/)
---
## Overview
jsQuizizz is a NodeJS Wrapper for the Quizizz API.

## Installing
> The package is not uploaded to NPM yet
This package can be installed using NodeJS's package manager, `npm`.
```bash
npm install jsquizizz
```

## Importing
> To use the new esm syntax, set your `type` to `module` in your `package.json`. [Click me](https://nodejs.org/api/packages.html#packages_package_json_and_file_extensions) for more information
- You can import the entire package into a single variable (***esm***)
    ```js
    import * as Quizizz from 'jsquizziz'
    ```

- You can import certain parts of the package into different variables (***esm***)
    ```js
    import {MemeSet, Quiz, Tag, User, Game} from 'jsquizziz'
    ```
- You can also import this package into non-esm modules (***commonjs***)
    ```js
    var Quizizz = await import("jsquizizz")
    ```

## Documentation
- ### MemeSet
    Quizizz shows the players memes after every question answered. These memes are stored in MemeSets, and the `MemeSet` class allows us to get these MemeSets
    - **Methods**
        <table><thead><tr><th>Type<th>Method<th>Parameters<th>Returns<th>Description<th>Example<tbody><tr><td>

        `static`<td>`getByID`<td>
        | **Parameter** | **Type** | **Default** | **Description** |
        |---------------|----------|-|----------------|
        | `id`          | `string` | Required | The MemeSet ID  |
        | `save`        | `boolean`| `false` | Whether to save the memes to memory for faster recall |
        <td>
        
        `Promise<MemeSet>`<td>Gets a MemeSet via it's ID<td>
        ```js
        await MemeSet.getByID("abcdef", false) 
        ```
        <tr><td>

        `static`<td>`getFromUser`<td>
        | **Parameter** | **Type** | **Description** |
        |---------------|----------|-----------------|
        | `id`          | `string` | The User ID     |
        <td>
        
        `Promise<MemeSet[]>`<td>Gets a list of MemeSets from a user's ID<td>
        ```js
        await MemeSet.getFromUser("abcdef")
        ```
        <tr><td>

        `static`<td>`getFeatured`<td>None<td>`Promise<MemeSet[]>`<td>Gets the currently featured MemeSets<td>
        ```js
        await MemeSet.getFeatured()
        ```
        <tr><td>

        `dynamic`<td>`getMemes`<td>
        | **Parameter** | **Type**  | **Default** | **Description**|
        |---------------|-----------|-------------|------------------------------------------------------|
        | `save`        | `boolean` | `false`     | Whether to save the data to memory for faster recall |
        <td>
        
        `Promise<Meme[]>`<td>Gets the memes from the MemeSet<td>
        ```js
        await myMemeSet.getMemes(true)
        ```
        <tr><td>

        `dynamic`<td>`Meme.getCreator`<td>None<td>`Promise<User>`<td>Gets the meme's creator.<td>
        ```js
        await (await myMemeSet.getMemes(false))[0].getCreator();
        ```
        </table>
    - **Properties**
        <table><thead><tr><th>Property</th><th>Types</th><th>Description</th></tr></thead><tbody><tr><td>
        
        `id`</td><td>`string`</td><td>The memeset's ID</td></tr><tr><td>`memes`</td><td>`Meme[]` `undefined`</td><td>Gets the quizzes that the user has created</td></tr><tr><td>`Meme.id`</td><td>`string`</td><td>The meme's ID</td></tr><tr><td>`Meme.setId`</td><td>`string`</td><td>The ID of the memeset that this meme is included in</td></tr><tr><td>`Meme.creatorId`</td><td>`string`</td><td>The ID of the creator of this meme</td></tr><tr><td>`Meme.top`</td><td>
        | Property | Types    | Description                                   |
        |----------|----------|-----------------------------------------------|
        | `text`   | `string` | The text on the top of the meme (May be `""`) |
        | `color`  | `string` | The color of the text (May be `""`)           |
        </td><td>The top text of the meme (if there is any)</td></tr><tr><td>
        
        `Meme.bottom`</td><td>
        | Property | Types    | Description                                   |
        |----------|----------|-----------------------------------------------|
        | `text`   | `string` | The text on the top of the meme (May be `""`) |
        | `color`  | `string` | The color of the text (May be `""`)           |
        </td><td>The bottom text of the meme (if there is any)</td></tr><tr><td>
        
        `Meme.image`</td><td>`string`</td><td>The meme's image</td></tr><tr><td>`Meme.type`</td><td>`string`</td><td>The meme's type (mainly `"correct"` and `"incorrect"`, but others do exist)</td></tr></tbody></table>
- ### Quiz
    Quizizz is a service based of many, many quizzes. The `Quiz` class helps to fetch these quizzes.
    - **Methods**
        <table><thead><tr><th>Type</th><th>Method</th><th>Parameters</th><th>Returns</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td>
        
        `static`</td><td>`getByID`</td><td>
        | Parameter | Type     | Default  | Description |
        |-----------|----------|----------|-------------|
        | `id`      | `string` | Required | The Quiz ID |
        </td><td>
        
        `Promise<Quiz>`</td><td>Gets a Quiz via it's ID</td><td>
        ```js
        await Quiz.getByID("abcdef")
        ```
        </td></tr><tr><td>
        
        `static`</td><td>`search`</td><td><table><thead><tr><th>Parameter</th><th>Types</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td>`query`</td><td>`string`</td><td>`""`</td><td>The search query</td></tr><tr><td>`filters`</td><td>
        | Parameter         | Types       | Default | Description                            |
        |-------------------|-------------|---------|----------------------------------------|
        | `grade_type.aggs` | `string[]`  | N/A     | The grade types                        |
        | `subject.aggs`    | `string[]`  | N/A     | The subjects                           |
        | `lang.aggs`       | `string[]`  | N/A     | The languages                          |
        | `occupation`      | `string[]`  | N/A     | The creator's occupations              |
        | `cloned`          | `boolean[]` | N/A     | Whether the quiz is a clone of another |
        | `isProfane`       | `boolean[]` | N/A     | Whether the quiz is profane            |
        | `type`            | `string[]`  | N/A     | The type of quiz                       |
        | `createdBy`       | `string[]`  | N/A     | Who created the quiz                   |
        </td><td>
        
        `{}`</td><td>The search filters</td></tr></tbody></table></td><td>`Promise<Quiz[]>`</td><td>Searches for quizzes based on the query and filters</td><td>
        ```js
        await Quiz.search("apple", {createdBy: ["abcdef"]})
        ```
        </td></tr><tr><td>
        
        `dynamic`</td><td>`getCreator`</td><td>None</td><td>`Promise<User>`</td><td>Gets the quiz's creator.</td><td>
        ```js
        await myQuiz.getCreator()
        ```
        </td></tr></tbody></table>
    - **Properties**
        <table><thead><tr><th>Property</th><th>Types</th><th>Description</th></tr></thead><tbody><tr><td>
        
        `id`</td><td>`string`</td><td>The quiz's ID</td></tr><tr><td>`creator`</td><td>
        | Property   | Types    | Description         |
        |------------|----------|---------------------|
        | `id`       | `string` | The user's ID       |
        | `avatar`   | `string` | The user's avatar   |
        | `username` | `string` | The user's username |
        </td><td>Gets the quizzes that the user has created</td></tr><tr><td>
        
        `tagIds`</td><td>`string[]`</td><td>A list of tags that this quiz is associated with. (This property's value is `[]` unless the quiz has been generated from the `Tag.getItems()` function)</td></tr><tr><td>`questions`</td><td>
        | Property           | Types                                       | Description                                                         |
        |--------------------|---------------------------------------------|---------------------------------------------------------------------|
        | `id`               | `string`                                    | The question's ID                                                   |
        | `type`             | `string`                                    | The question's type (`"MCQ"`, `"MSQ"`, `"DRAW"`, `"MATCH"`, etc)    |
        | `query`            | [`QuestionContent`](#QuestionContent)       | The question's question                                             |
        | `options`          | [`QuestionContent[]`](#QuestionContent)     | The question's options                                              |
        | `answer`           | `string`\|`number`\|`number[]`\|`undefined` | The question's answer                                               |
        | `explain`          | [`QuestionContent`](#QuestionContent)       | The question's answer explanation (If there even is an explanation) |
        | `hasCorrectAnswer` | `boolean`                                   | Whether the question has a *correct* answer                         |
        </td><td>The quiz's questions</td></tr><tr><td>
        
        `subjects`</td><td>`string[]`</td><td>The subjects that this quiz is associated with</td></tr><tr><td>`subtopics`</td><td>`string[]`</td><td>The subtopics that this quiz is associated with</td></tr><tr><td>`topics`</td><td>`string[]`</td><td>The topics that this quiz is associated with</td></tr><tr><td>`image`</td><td>`string`</td><td>The quiz's image</td></tr><tr><td>`grades`</td><td>`number[]`</td><td>The grades that this quiz is associated with</td></tr><tr><td>`stats`</td><td>
        | Property         | Types    | Description                                                               |
        |------------------|----------|---------------------------------------------------------------------------|
        | `played`         | `number` | The number of times this quiz has been played                             |
        | `totalPlayers`   | `number` | The total number of players that have played this quiz                    |
        | `totalCorrect`   | `number` | The total number of correct answers that have been submitted in this quiz |
        | `totalQuestions` | `number` | The total number of questions that have been answered in this quiz        |
        </td><td>The statistics of this quiz</td></tr></tbody></table>
- ### Tag
    User's can tag their quizzes to group them into sections. The `Tag` class can `process` these sections and quizzes
    - **Methods**
        <table><thead><tr><th>Type</th><th>Method</th><th>Parameters</th><th>Returns</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td>
        
        `static`</td><td>`getByID`</td><td>
        | Parameter | Type      | Default  | Description                                 |
        |-----------|-----------|----------|---------------------------------------------|
        | `id`      | `string`  | Required | The Tag ID                                  |
        | `save`    | `boolean` | `false`  | Whether to save the data to memory for faster recall |
        </td><td>

        `Promise<Tag>`</td><td>Gets a tag via it's ID</td><td>
        ```js
        await Tag.getByID("abcdef", false)
        ```
        </td></tr><tr><td>
        
        `static`</td><td>`getFromUser`</td><td>
        | Parameter | Type     | Default  | Description   |
        |-----------|----------|----------|---------------|
        | `id`      | `string` | Required | The user's ID |
        </td><td>
        
        `Promise<Tag[]>`</td><td>Gets a list of tags from a user's ID</td><td>
        ```js
        await Tag.getFromUser("abcdef")
        ```
        </td></tr><tr><td>

        `dynamic`</td><td>`getItems`</td><td>
        | Parameter | Type      | Default | Description                                          |
        |-----------|-----------|---------|------------------------------------------------------|
        | `save`    | `boolean` | `false` | Whether to save the data to memory for faster recall |
        </td><td>
        
        `Promise<Quiz[]>`</td><td>Gets all the items tagged with this tag</td><td>
        ```js
        await myTag.getItems(true)
        ```
        <br></td></tr><tr><td>
        `dynamic`</td><td>`getCreator`</td><td>None</td><td>`Promise<User>`</td><td>Gets the tag's creator.</td><td>
        ```js
        await myTag.getCreator()
        ```
        </td></tr></tbody></table>
    - **Properties**
        <table><thead><tr><th>Property</th><th>Types</th><th>Description</th></tr></thead><tbody><tr><td>
        
        `id`</td><td>`string`</td><td>The tag's ID</td></tr><tr><td>`creatorId`</td><td>`string`</td><td>The tag's creator's ID</td></tr><tr><td>`visibility`</td><td>`boolean`</td><td>The tag's visibility</td></tr><tr><td>`name`</td><td>`string`</td><td>The tag's name</td></tr><tr><td>`type`</td><td>`string`</td><td>The tag's type (`"quiz"`, `"game"`, `"meme"`. I am yet to find a tag that does not have the `"quiz"` type)</td></tr><tr><td>`totalItems`</td><td>`number`</td><td>The number of items enclosed within this tag</td></tr><tr><td>`items`</td><td>`Quiz[]` | `undefined`</td><td>The items enclosed in this tag. This property will always be `undefined` except on two circumstances:<br>1. You call the `getItems` method with the `save` parameter set to `true`<br>2. You call the `getByID` static method with the `save` parameter set to `true`</td></tr></tbody></table>
- ### User
    The `User` class is a class that holds several aliases to the other class methods that get content based on a user id
    - **Methods**
        <table><thead><tr><th>Type</th><th>Method</th><th>Parameters</th><th>Returns</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td>
        
        `static`</td><td>`getByID`</td><td>
        | Parameter | Type     | Default  | Description   |
        |-----------|----------|----------|---------------|
        | `id`      | `string` | Required | The user's ID |
        </td><td>
        
        `Promise<User>`</td><td>Gets a user from their ID</td><td>
        ```js
        await User.getByID("abcdef")
        ```
        </td></tr><tr><td>
        
        `dynamic`</td><td>`getQuizzes`</td><td>None</td><td>`Promise<Quiz[]>`</td><td>Gets the quizzes that the user has created</td><td>
        ```js
        await myUser.getQuizzes()
        ```
        </td></tr><tr><td>
        
        `dynamic`</td><td>`getMemeSets`</td><td>None</td><td>`Promise<MemeSet[]>`</td><td>Gets the memesets that the user has created</td><td>
        ```js
        await myUser.getMemeSets()
        ```
        </td></tr><tr><td>
        
        `dynamic`</td><td>`getTags`</td><td>None</td><td>`Promise<Tag[]>`</td><td>Gets all the tags that the user has created</td><td>
        ```js
        await myUser.getTags()
        ```
        </td></tr></tbody></table>
    - **Properties**
        <table><thead><tr><th>Property</th><th>Types</th><th>Description</th></tr></thead><tbody><tr><td>
        
        `id`</td><td>`string`</td><td>The user's ID</td></tr><tr><td>`numOfQuizzes`</td><td>`number`</td><td>The number of quizzes that this user has created</td></tr><tr><td>`numOfTags`</td><td>`number`</td><td>The number of tags (or "collections") that this user has created</td></tr><tr><td>`numOfMemeSets`</td><td>`number`</td><td>The number of memesets that this user has created</td></tr><tr><td>`firstName`</td><td>`string`</td><td>The user's first name</td></tr><tr><td>`lastName`</td><td>`string`</td><td>The user's last name</td></tr><tr><td>`username`</td><td>`string`</td><td>The user's username</td></tr><tr><td>`occupation`</td><td>`string`</td><td>The user's occupation</td></tr><tr><td>`avatar`</td><td>`string`</td><td>The user's avatar</td></tr><tr><td>`courses`</td><td>An array of `Course` objects:
        | Property       | Types    | Description                      |
        |----------------|----------|----------------------------------|
        | `displayName`  | `string` | The display name of this course  |
        | `internalName` | `string` | The internal name of this course |
        | `_id`          | `string` | The course's ID                  |
        | `uniqueName`   | `string` | The unique name of this course   |
        </td><td>The courses that the user is enrolled with</td></tr><tr><td>`organization`</td><td>
        | Property | Types    | Description                  |
        |----------|----------|------------------------------|
        | `id`     | `string` | The organization ID          |
        | `name`   | `string` | The name of the organization |
        | `type`   | `string` | The type of the organization |
        </td><td>
        
        The user's organization (**This may be `undefined`**)</td></tr></tbody></table>
- ### Game
    The `Game` class is probably the most complex class in this package. This class allows you to join a Quizizz game as a client.
    - **Methods**
        <table><thead><tr><th>Type</th><th>Method</th><th>Parameters</th><th>Returns</th><th>Description</th><th>Example</th></tr></thead><tbody><tr><td>
        
        `dynamic`</td><td>`joinGame`</td><td><table><thead><tr><th>Parameters</th><th>Types</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td>`pin`</td><td>`string` `number`</td><td>Required</td><td>The room PIN</td></tr><tr><td>`name`</td><td>`string`</td><td>`"jsQuizizz Bot"`</td><td>The name to join the room with</td></tr><tr><td>`avatarID`</td><td>`number`</td><td>`1`</td><td>The ID of the avatar you would like to join with. **TODO: Add Avatar ID's to a new static property within `Game`**</td></tr><tr><td>`options`</td><td>
        | Parameters        | Types    | Default | Description                                                                                                                                                                                                                                          |
        |-------------------|----------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
        | `correctPoints`   | `number` | `1000`  | How many points to give the player if they answer correctly. (0-7500)                                                                                                                                                                                |
        | `incorrectPoints` | `number` | `0`     | How many points to give the player if they answer incorrectly. (0-5000)                                                                                                                                                                              |
        | `time`            | `number` | `0`     | When Quizizz asks the client how long it took to answer, what should the client respond?                                                                                                                                                             |
        | `streakBoost`     | `number` | `6`     | When the `streak-boost` powerup is used, how far should the streak be boosted? (*This parameter is only client-side, and is used for point evaluation, but in our instance, we custom set the points, so this parameter serves **no** real purpose*) |
        </td><td></td><td>The optional parameters for the game</td></tr></tbody></table></td><td>
        
        `Promise<Nothing>`</td><td>Joins the Quizizz game</td><td>
        ```js
        await myGame.joinGame(123456, "Not_A_Robot", {
            correctPoints: 1000
        });
        ```
        </td></tr><tr><td>
        
        `dynamic`</td><td>`leaveGame`</td><td>None</td><td>Nothing</td><td>Leaves the Quizizz Game. This will cause the [`disconnect`](#disconnect) event to fire</td><td>
        ```js
        myGame.leaveGame()
        ```
        </td></tr><tr><td>
        
        `dynamic`</td><td>`activatePowerup`</td><td>
        | Parameters | Types      | Default  | Description                                                                                                                                          |
        |------------|------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------|
        | `pu`       | `string`   | Required | The powerup to use. (See the `myGame.powerups` array for the powerups)                                                                               |
        | `targets`  | `string[]` | `[]`     | For the `send-gift` powerup, you must specify a list of player IDs as targets. See [powerups](#powerups) for more information on this unique powerup |
        </td><td>
        
        `Promise<Nothing>`</td><td>Activates the powerup provided</td><td>
        ```js
        await myGame.activatePowerup(myGame.powerups["50-50"])
        ```
        </td></tr><tr><td>
        
        `dynamic`</td><td>`answer`</td><td>
        | Parameters | Types                      | Default  | Description                        |
        |------------|----------------------------|----------|------------------------------------|
        | `answer`   | `string` `number[]` `number` | Required | The answer to the current question |
        </td><td>
        
        `Promise<Nothing>`</td><td>Answers the current question with the answer provided</td><td>
        ```js
        await myGame.answer(1)
        ```
        </td></tr></tbody></table>
    - **Properties**
        <table><thead><tr><th>Property</th><th>Types</th><th>Description</th></tr></thead><tbody><tr><td><a id="powerups"></a>

        `powerups`</td><td><table><thead><tr><th>Property</th><th>Powerup Title</th><th>Description</th></tr></thead><tbody><tr><td>`double-jeopardy`</td><td>Double Jeopardy</td><td>
        > Players get double points if they choose the answer correctly but lose it all if they choose the wrong answer
        
        This powerup serves no real purpose, as we custom set our points in the `options` parameter</td></tr><tr><td>`2x`</td><td>x2</td><td>
        > Players get twice the points for answering a question right
        
        This powerup serves no real purpose, as we custom set our points in the `options` parameter</td></tr><tr><td>`50-50`</td><td>50-50</td><td>
        > Eliminates half of the incorrect options
        
        Adds half of the incorrect options to the `ia` property, and the `incorrectAnswers` property from the `question` event data</td></tr><tr><td>`eraser`</td><td>Eraser</td><td>
        > Eliminates one wrong option
        
        Adds one incorrect option to the `ai` property, and the `incorrectAnswers` property from the `question` event data</td></tr><tr><td>`immunity`</td><td>Immunity</td><td>
        > 2 attempts are allowed for answering the same question
        
        Gives you another attempt to answer the current question if you get it wrong, you can use this as many times as you want</td></tr><tr><td>`time-freeze`</td><td>Time Freeze</td><td>
        > The timer is frozen to allow players to answer 1 question
        
        This powerup serves no real purpose, as we custom set our time in the `options` parameter</td></tr><tr><td>`power-play`</td><td>Power Play</td><td>
        > All players in the quiz get 50% more points in 20 seconds
        
        This powerup applies to all players *except* the client, as the client's points are custom set in the `options` parameter</td></tr><tr><td>`supersonic`</td><td>Supersonic</td><td>
        > Get 1.5x points for 20 seconds with ultra fast gameplay
        
        This powerup serves no real purpose, as we custom set our points in the `options` parameter</td></tr><tr><td>`streak-saver`</td><td>Streak Saver</td><td>
        > Ensures a player’s streak against an incorrect answer
        
        This powerup serves no real purpose, as the streak saver is only client side (for points), and we custom set our points in the `options` parameter</td></tr><tr><td>`glitch`</td><td>Glitch</td><td>
        > All players' screens glitch for 10 seconds (does not add to scores)
        
        Nothing more needs to said about this.</td></tr><tr><td>`add-points`</td><td>+1000pt</td><td>
        > No description
        
        This powerup serves no real purpose, as we custom set our points in the `options` parameter</td></tr><tr><td>`streak-booster`</td><td>Streak Booster</td><td>
        > Apply to boost your streak counter by +6
        
        This powerup serves no real purpose, as the streak booster is only client side (for points), and we custom set our points in the `options` parameter</td></tr><tr><td>`send-gift`</td><td>Gift</td><td>
        > Players can send another player an extra 800 points
        
        This powerup requires you to specify the `targets` parameter for the `activatePowerup` method. If you send a player more than 9 gifts in a single question cycle, their game will crash when they try to answer.</td></tr></tbody></table></td><td>The available powerups</td></tr><tr><td>`room`</td><td>`Room` (*See `types.d.ts:78` for `Room` types*)</td><td>The game room</td></tr><tr><td>`ia`</td><td>`(number|number[]|string)[]`</td><td>The list of invalid answers for the current question, this array is populated when the following powerups are used: `50-50`, `eraser`, `immunity` </td></tr><tr><td>`name`</td><td>`string`</td><td>The client's name</td></tr><tr><td>`options`</td><td>`object`</td><td>The game options. This object has the same content as the `options` parameter, but fully populated</td></tr><tr><td>`socket`</td><td>`WebSocket`</td><td>The websocket that the client uses to connect to the room</td></tr><tr><td>`index`</td><td>`number`</td><td>The current question's index</td></tr><tr><td>`avatarID`</td><td>`number`</td><td>The client's avatar id</td></tr></tbody></table>
    - **Events**
        <table><thead><tr><th>Event</th><th>Data</th><th>Description</th></tr></thead><tbody><tr><td>
        
        `disconnect`</td><td>
        | Property | Types    | Description           |
        |----------|----------|-----------------------|
        | `code`   | `number` | The disconnect code   |
        | `reason` | `buffer` | The disconnect reason |
        </td><td>The 
        
        `disconnect` event is fired when the client gets disconnected from the websocket</td></tr><tr><td>`start`</td><td>None</td><td>The `start` event is fired when the game has started</td></tr><tr><td>`doneAnswering`</td><td>None</td><td>The `doneAnswering` event is fired when the client has answered all the questions</td></tr><tr><td>`join`</td><td>None</td><td>The `join` event is fired when the client successfully joins the game</td></tr><tr><td>`powerup`</td><td>
        | Property         | Types                  | Description                                                                                                            |
        |------------------|------------------------|------------------------------------------------------------------------------------------------------------------------|
        | `name`           | `string`               | The powerup's name                                                                                                     |
        | `visibleOptions` | `number[]` `undefined` | The new visible options for the current question. Is always `undefined` unless the powerup used is `50-50` or `eraser` |
        | `streakChangeBy` | `number`               | The streak boost that the client received. Is always `undefined` unless the powerup used is `streak-booster`           |
        </td><td>

        The `powerup` event is fired when a powerup has been successfully activated</td></tr><tr><td>`gameEnded`</td><td>[`Leaderboard[]`](#leaderboard)</td><td> The `gameEnded` event is fired when the game has ended</td></tr><tr><td>`kick`</td><td>
        | Type     | Description     |
        |----------|-----------------|
        | `string` | The player's ID |
        </td><td>
        
        The `kick` event is fired when a player has been kicked from the game</td></tr><tr><td>`answer`</td><td><table><thead><tr><th>Property</th><th>Types</th><th>Description</th></tr></thead><tbody><tr><td>`streak`</td><td>
        | Property        | Types    | Description                             |
        |-----------------|----------|-----------------------------------------|
        | `currentStreak` | `number` | The client's current streak             |
        | `maximumStreak` | `number` | The client's highest streak in the game |
        </td><td>The client's streak</td></tr><tr><td>
        
        `isCorrect`</td><td>`boolean`</td><td>Whether the client was correct or not</td></tr><tr><td>`attempt`</td><td>`number`</td><td>The attempt on the question. (As of my testing, this value is always the same)</td></tr><tr><td>`score`</td><td>`number`</td><td>The client's current score</td></tr><tr><td>`leaderboard`</td><td>[`Leaderboard[]`](#leaderboard)</td><td>The game's current leaderboard</td></tr></tbody></table></td><td>The `answer` event is fired when the client answers a question</td></tr><tr><td>`question`</td><td>
        | Property           | Types                                   | Description                                                                                              |
        |--------------------|-----------------------------------------|----------------------------------------------------------------------------------------------------------|
        | `question`         | [`QuestionContent`](#questioncontent)   | The question query                                                                                       |
        | `answers`          | [`QuestionContent[]`](#questioncontent) | The answers                                                                                              |
        | `incorrectAnswers` | `(string\|number[]\|number)[]`          | The incorrect options. This array populates when `immunity` is used, and the question is attempted again |
        | `type`             | `string`                                | The question type (`MCQ`, `MSQ`, `DRAW`, `MATCH`, `REORDER`, `BLANK`, and a few others)                  |
        </td><td>
        
        The `question` event is fired when the client needs to answer a question. (**It is <u>HIGHLY RECOMMENDED</u> that the `myGame.answer` method is called within the listener for this event**)</td></tr></tbody></table>
- ### Types
    - <a id="questioncontent"></a> **QuestionContent**
        <table><thead><tr><th>Property</th><th>Types</th><th>Description</th></tr></thead><tbody><tr><td>
        
        `type`</td><td>`string`</td><td>The content type</td></tr><tr><td>`media`</td><td><table><thead><tr><th>Property</th><th>Types</th><th>Description</th></tr></thead><tbody><tr><td>`type`</td><td>`string`</td><td>The media type</td></tr><tr><td>`video`</td><td>`string`</td><td>The media's video</td></tr><tr><td>`meta`</td><td>An array of `Media` objects:
        | Property     | Types     | Description                            |
        |--------------|-----------|----------------------------------------|
        | `width`      | `number`  | The media's width                      |
        | `height`     | `number`  | The media's height                     |
        | `layout`     | `string`  | The layout of the media                |
        | `text`       | `string`  | The media's text content               |
        | `bgColor`    | `string`  | The media's background color           |
        | `videoId`    | `string`  | The video ID associated with the media |
        | `start`      | `number`  | The start time of the media            |
        | `end`        | `number`  | The end time of the media              |
        | `duration`   | `number`  | How long should the media run for?     |
        | `kind`       | `string`  | The kind of media                      |
        | `embeddable` | `boolean` | Whether the media is embeddable        |
        | `title`      | `string`  | The media's title                      |
        | `lat`        | `number`  | The latitude of the media              |
        | `long`       | `number`  | The longitude of the media             |
        | `heading`    | `string`  | The heading of the media               |
        | `pitch`      | `number`  | The pitch of the media                 |
        </td><td>The media's metadata</td></tr></tbody></table></td><td>The content's media</td></tr><tr><td>

        `text`</td><td>`string[]` `string`</td><td>The content text</td></tr><tr><td>`hasMath`</td><td>`boolean`</td><td>Whether the content has math</td></tr><tr><td>`math`</td><td>
        | Property   | Types      | Description    |
        |------------|------------|----------------|
        | `latex`    | `string[]` | The latex math |
        | `template` | `string`   | The template   |
        
        </td><td>The question's latex math</td></tr></tbody></table>
    - <a id="leaderboard"></a> **Leaderboard**
        | Property | Types    | Description              |
        |----------|----------|--------------------------|
        | `name`   | `string` | The player's name        |
        | `id`     | `string` | The player's ID          |
        | `rank`   | `number` | The player's rank        |
        | `score`  | `number` | The player's final score |