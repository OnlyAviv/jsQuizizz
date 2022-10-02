import Game from "./game/game.js";
import _MemeSet from "./memeset.js";
import _Quiz from './quiz.js';
import _Tag from "./tag.js";
import _User from "./user.js";

const Quiz = {
    search: _Quiz.search,
    getByID: _Quiz.getByID
}

const User = {
    getByID: _User.getByID
}

const MemeSet = {
    getByID: _MemeSet.getByID,
    getFeatured: _MemeSet.getFeatured,
    getFromUser: _MemeSet.getFromUser
}

const Tag = {
    getByID: _Tag.getByID,
    getFromUser: _Tag.getFromUser
}

export {Game, Quiz, User, MemeSet, Tag}
