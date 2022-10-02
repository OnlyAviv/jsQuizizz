/// <reference path="types.d.ts"/>

import { QuizizzError } from "./util.js";
import got from "got";
import Quiz from "./quiz.js";
import User from "./user.js";

export default class Tag {
    /**
     * Gets a tag from it's ID
     * @param {string} id The tag ID
     * @param {boolean} [save=false] Whether to save the data for faster recall
     * @returns {Promise<Tag>} The tag
     * @throws {import('./util.js').QuizizzError}
     */
     static async getByID(id, save=false) {
        var response = await got(`https://quizizz.com/_api/main/tags/${id}/public`, {
            throwHttpErrors: false
        }).json();
        if (response.error) throw new QuizizzError(response);
        return new Tag(response.data.userId, response.data, save);
    }

    /**
     * 
     * @param {string} id The User ID
     * @returns {Promise<Tag>} The tags
     */
    static async getFromUser(id) {
        var response = await got("https://quizizz.com/_api/main/tags/user/" + id + "?type=quiz", {
            throwHttpErrors: false
        }).json();
        if (response.error) throw new QuizizzError(response);
        return new Tag(id, response.data);
    }

    /**
     * @param {string} cid
     * @param {Types.Tag} data 
     * @param {boolean} [save=false] Whether to save the data for faster recall
     */
    constructor(cid, data, save=false) {
        this.id = data._id;
        this.creatorId = cid;
        this.visibility = data.visibility;
        this.name = data.name;
        this.type = data.entityType; // quiz, game, or meme
        this.totalItems = data.totalItems;
        if (data.items && save) {
            this.items = data.items.map(item => new Quiz(item));
        }
    }
    /**
     * Get the items in the tag
     * @param {boolean} [save=boolean] Whether to save the data for faster recall
     * @returns {Promise<import('./quiz').default[]>} The items in the tag
     */
    async getItems(save=false) {
        if (this.items) return this.items;

        var response = await got(`https://quizizz.com/_api/main/tags/${this.id}/public`, {
            throwHttpErrors: false
        }).json();
        if (response.error) throw new QuizizzError(response);

        if (save) {
            this.items = response.data.items.map(item => new Quiz(item));
            return this.items;
        }

        // TODO: See if "game" and "meme" ever show up for this instance
        return response.data.items.map(item => new Quiz(item));
    }

    /**
     * Get the creator of the tag
     * @returns {Promise<import('./user').default>} The creator
     */
    async getCreator() {
        return await User.getByID(this.creatorId);
    }
}