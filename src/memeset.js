/// <reference path="types.d.ts"/>

import User from "./user.js";
import { QuizizzError } from "./util.js";
import got from "got";


export default class MemeSet {
    /**
     * Gets a memeset from it's ID
     * @param {string} id The Memeset ID
     * @param {boolean} save Whether to save the data for faster recall
     * @returns {Promise<MemeSet>} The Memeset
     * @throws {import('./util.js').QuizizzError}
     */
    static async getByID(id, save = false) {
        var response = await got("https://quizizz.com/_api/main/getMemeSetGame/" + id, {
            throwHttpErrors: false
        }).json();
        if (response.error) throw new QuizizzError(response);
        return new MemeSet(id, response, save);
    }

    /**
     * Gets all the memesets that a user has created
     * @param {string} id The user id
     * @returns {Promise<MemeSet[]>} The list of memesets
     * @throws {import('./util.js').QuizizzError}
     */
    static async getFromUser(id) {
        var response = await got("https://quizizz.com/_api/main/memesets/user/" + id, {
            throwHttpErrors: false
        }).json();
        if (response.error) throw new QuizizzError(response);

        var memesets = [];

        for (let ms = 0; ms < response.data.length; ms++) {
            var memeset = response.data[ms];
            memesets.push(await MemeSet.getByID(memeset._id));
        };

        return memesets;
    }

    /**
     * Gets the features MemeSets
     * @returns {Promise<MemeSet[]>} The featured memesets
     * @throws {import('./util.js').QuizizzError}
     */
    static async getFeatured() {
        var response = await got("https://quizizz.com/_api/main/memesets?featured=true", {
            throwHttpErrors: false
        }).json();
        if (response.error) throw new QuizizzError(response);

        return response.map(ms => new MemeSet(ms._id));
    }

    /**
     * 
     * @param {string} id The memeset ID
     * @param {Types.Meme[]} data The memes
     * @param {boolean} [save=false] Whether to save the data for faster recall
     */
    constructor(id, data = false, save = false) {
        this.id = id;
        if (data && save) {
            this.memes = data.map(m => new Meme(m));
        }
    }

    /**
     * Gets the memeset's memes
     * @param {boolean} [save=false] Whether to save the data for faster recall
     * @returns {Promise<Meme[]>} The memeset's memes
     * @throws {import('./util.js').QuizizzError}
     */
    async getMemes(save = false) {
        if (this.memes) return this.memes;
        var response = await got("https://quizizz.com/_api/main/getMemeSetGame/" + this.id, {
            throwHttpErrors: false
        }).json();
        if (response.error) throw new QuizizzError(response);

        if (save) {
            this.memes = response.map(m => new Meme(m));
            return this.memes;
        }

        return response.map(m => new Meme(m));
    }
}

class Meme {
    /**
     * @param {Types.Meme} meme The meme
     */
    constructor(meme) {
        if (meme.type === "correct" || meme.type === "incorrect") {
            this.id = meme._id;
            this.setId = meme.setId;
            this.creatorId = meme.createdBy;
            /** @type {Types.MemeText} */
            this.top = {
                text: meme.topText,
                color: meme.topTextColor
            };
            /** @type {Types.MemeText} */
            this.bottom = {
                text: meme.bottomText,
                color: meme.bottomTextColor
            };
        }
        this.image = meme.finalURL;
        this.type = meme.type;
    }

    /**
     * Gets a memeset's creator
     * @returns {Promise<User>} The memeset's creator
     */
    async getCreator() {
        return await User.getByID(this.creatorId);
    }
};