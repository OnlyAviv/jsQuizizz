/// <reference path="types.d.ts"/>

import got from "got";
import User from "./user.js";
import { QuizizzError } from "./util.js";

export default class Quiz {
    /**
     * 
     * @param {string} id The Quiz ID
     * @returns {Promise<Quiz>} The quiz
     * @throws {import('./util.js').QuizizzError}
     */
   static async getByID(id) {
      var response = await got("https://quizizz.com/quiz/" + id, {
         throwHttpErrors: false
      }).json();
      if (response.error) throw new QuizizzError(response);
      return new Quiz(response.data.quiz);
   }

   /**
    * 
    * @param {string} [query=""] The search query
    * @param {Types.Filter} [filters={}] The search filters
    * @returns {Promise<Quiz[]>}
    */
   static async search(query="", filter={}) {

    var response = await got("https://quizizz.com/_api/main/search?filters=" + JSON.stringify(filter) + "&query=" + query, {
        throwHttpErrors: false
     }).json();
     if (response.error) throw new QuizizzError(response);
     return response.data.hits.map(quiz => new Quiz(quiz))
   }

   /**
    * @private
    * @param {Types.Quiz} data The quiz data
    */
   constructor(data) {
      this.id = data._id;

      // Basic creator info. To get more info, use 'getCreator()'
      this.creator = {
        id: data.createdBy._id,
        avatar: data.createdBy.media,
        username: data.createdBy.local.username
      }

      this.tagIds = data.tagIds || [];
      this.name = data.info.name;
      this.lang = data.info.lang;
      
      this.questions = data.info.questions.map(q => {
        return {
            id: q._id,
            type: q.type,
            query: q.structure.query,
            options: q.structure.options,
            answer: q.structure.answer,
            explain: q.structure.explain,
            hasCorrectAnswer: q.structure.settings.hasCorrectAnswer
        }
      });
      
      this.subjects = data.info.subjects;
      this.subtopics = data.info.subtopics;
      this.topics = data.info.topics;
      this.image = data.info.image;
      this.grades = [...new Set(data.info.grade)];

      this.stats = data.stats;
   }

   async getCreator() {
    return await User.getByID(this.creator.id);
   }
};