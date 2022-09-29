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

    - **Importing**
        ```js
        import {MemeSet} from 'jsquizizz'
        ```
    - **Functions**
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
        await MemeSet.getFromuser("abcdef")
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
- ### Quiz
- ### Tag
- ### User
- ### Game
- ### Quiz
- ### Tag
- ### User
- ### Game