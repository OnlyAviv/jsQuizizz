/// <reference path="types.d.ts"/>

import { QuizizzError } from "./util.js";
import got from "got";
import Quiz from "./quiz.js";
import MemeSet from "./memeset.js";
import Tag from "./tag.js";


export default class User {    
    /**
     * Gets a user by ID
     * @param {string} id The user ID
     * @returns {Promise<User>} The user
     * @throws {import('./util.js').QuizizzError}
     */
    static async getByID(id) {
        var response = await got("https://quizizz.com/user/" + id, {
            throwHttpErrors: false
        }).json();
        if (response.error) throw new QuizizzError(response);
        return new User(response.data);
    }

    /**
     * @param {object} data The user data;
     * @param {Types.User} data.user The user 
     */
    constructor(data) {
        this.id = data.user.id;

        this.numOfQuizzes = data.totalQuizzes;
        this.numOfTags = data.totalCollections;
        this.numOfMemeSets = data.totalMemeSets;

        this.firstName = data.user.firstName;
        this.lastName = data.user.lastName;
        this.username = data.user.local.username;
        this.occupation = data.user.occupation;
        this.avatar = data.user.media;

        this.courses = data.user.courses || [];

        if (data.user.organization) {
            this.organization = {
                id: data.user.organization.id,
                name: data.user.organization.name,
                type: data.user.organization.organizationType
            }  
        }
        
    }

    /**
     * @throws {import('./util.js').QuizizzError}
     * @returns {Promise<import('./quiz').default[]>} The quizzes the user has created
     */
    async getQuizzes() {
        return await Quiz.search("", {
            createdBy: [this.id]
        })
    }

    /**
     * Gets a user's memesets
     * @returns {Promise<import('./memeset').default[]>}
     */
    async getMemeSets() {
        return await MemeSet.getFromUser(this.id);
    }

    /**
     * @returns {Promise<import('./tag').default[]>} The tag
     */
    async getTags() {
        return await Tag.getFromUser(this.id);
    }
};