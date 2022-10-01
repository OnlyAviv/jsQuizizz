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
        
        `id`</td><td>`string`</td><td>The memeset's ID</td></tr><tr><td>`Meme[]`</td><td>`Meme[]` | `undefined`</td><td>Gets the quizzes that the user has created</td></tr><tr><td>`Meme.id`</td><td>`string`</td><td>The meme's ID</td></tr><tr><td>`Meme.setId`</td><td>`string`</td><td>The ID of the memeset that this meme is included in</td></tr><tr><td>`Meme.creatorId`</td><td>`string`</td><td>The ID of the creator of this meme</td></tr><tr><td>`Meme.top`</td><td>
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
        
        `static`</td><td>`search`</td><td>
        | Parameter | Type                | Default | Description        |
        |-----------|---------------------|---------|--------------------|
        | `query`   | `string`            | `""`    | The search query   |
        | `filters` | `Object` [`Filter`](#filter) | `{}`    | The search filters |
        </td><td>
        
        `Promise<Quiz[]>`</td><td>Searches for quizzes based on the query and filters</td><td>
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
        
        `subjects`</td><td>`string[]`</td><td>The subjects that this quiz is associated with</td></tr><tr><td>`subtopics`</td><td>`string[]`</td><td>The subtopics that this quiz is associated with</td></tr><tr><td>`topics`</td><td>`string[]`</td><td>The topics that this quiz is associated with</td></tr><tr><td>`image`</td><td>`string`</td><td>The quiz's image</td></tr><tr><td>`grades`</td><td>`number[]`</td><td>The grades that this quiz is associated with</td></tr><tr><td>`stats`</td><td>[`Stats`](#Stats)</td><td>The statistics of this quiz</td></tr></tbody></table>
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
        
        `id`</td><td>`string`</td><td>The user's ID</td></tr><tr><td>`numOfQuizzes`</td><td>`number`</td><td>The number of quizzes that this user has created</td></tr><tr><td>`numOfTags`</td><td>`number`</td><td>The number of tags (or "collections") that this user has created</td></tr><tr><td>`numOfMemeSets`</td><td>`number`</td><td>The number of memesets that this user has created</td></tr><tr><td>`firstName`</td><td>`string`</td><td>The user's first name</td></tr><tr><td>`lastName`</td><td>`string`</td><td>The user's last name</td></tr><tr><td>`username`</td><td>`string`</td><td>The user's username</td></tr><tr><td>`occupation`</td><td>`string`</td><td>The user's occupation</td></tr><tr><td>`avatar`</td><td>`string`</td><td>The user's avatar</td></tr><tr><td>`courses`</td><td>[`Course[]`](#Course)</td><td>The courses that the user is enrolled with</td></tr><tr><td>`organization`</td><td>
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
        
        `dynamic`</td><td>`joinGame`</td><td>
        
        </td><td>`Promise<Nothing>`</td><td>Joins the Quizizz game</td><td>
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
        
        `dynamic`</td><td>`activatePowerup`</td><td></td><td>`Promise<Nothing>`</td><td>Activates the powerup provided</td><td>
        ```js
        await myGame.activatePowerup(myGame.powerups["50-50"])
        ```
        </td></tr><tr><td>
        
        `dynamic`</td><td>`answer`</td><td></td><td>`Promise<Nothing>`</td><td>Answers the current question with the answer provided</td><td>
        ```js
        await myGame.answer(1)
        ```
        </td></tr></tbody></table>
    - **Properties**
    - **Events**
- ### Types
    - **QuestionContent**
    - **Room**

- ### **TODO** *Before* Publish
    - Document **Filter** into the original spot
    - Document **GameOptions** into the original spot