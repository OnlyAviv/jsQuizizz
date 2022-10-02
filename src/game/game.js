/// <reference path="../types.d.ts"/>

import got from 'got'; // Once the fetch API is in LTS support, 'got' will no longer be used
import EventEmitter from 'node:events';
import { Encoding, getKeyByValue, QuizizzError } from '../util.js';
import WebSocket from 'ws';
import { randomUUID } from 'node:crypto';

/**
 * @classdesc The Game client for quizizz
 * @extends {EventEmitter}
 */
export default class Game extends EventEmitter {
    #powerupCache;
    /**
     * Get a game room by the room PIN
     * @param {(String|Number)} pin The game PIN 
     * @returns {Promise<Types.Room>} The room data
     * @throws {QuizizzError}
     */
    static async getRoom(pin) {
        var { room, error } = await got.post("https://game.quizizz.com/play-api/v5/checkRoom", {
            json: { roomCode: pin }
        }).json();
        if (error) throw new QuizizzError(error);
        return room;
    }

    /**
     * @private
     * Load the powerups into the client. This function is used internally
     */
    async #loadPowerUps() {
        var powerups = await got("https://cf.quizizz.com/game/data/PowerupsConfig/v23.json").json();
        this.#powerupCache = {
            active: false
        }
        var response = await got.post("https://game.quizizz.com/play-api/awardPowerups", {
            json: {
                "roomHash": this.room.hash,
                "playerId": this.name,
                "gameType": this.room.type,
                "powerups": Object.keys(powerups).filter(p => powerups[p].status == "enabled").map((pu, i) => {
                    return {
                        name: pu,
                        meta: {
                            questionId: "",
                            attempt: -1,
                            questionNum: 0,
                            beltPosition: i
                        }
                    }
                })
            }
        }).json();
        // TODO: powerup typings
        this.powerups = {};
        response.powerups.forEach(p => this.powerups[p.name] = p._id);
    }

    /**
     * This function swaps out a used powerup for a new one. This function is used internally
     * @param {String} id previous powerup ID
     * @private
     */
    async #awardPowerUp(id) {
        var name = getKeyByValue(this.powerups, id);
        var response = await got.post("https://game.quizizz.com/play-api/awardPowerups", {
            json: {
                "roomHash": this.room.hash,
                "playerId": this.name,
                "gameType": this.room.type,
                "powerups": [{
                    name,
                    meta: {
                        questionId: "",
                        attempt: -1,
                        questionNum: 0,
                        beltPosition: 0
                    }
                }]
            },
            throwHttpErrors: false
        }).json();
        this.powerups[name] = response.powerups[0]._id;
    }

    /**
     * Joins a Quizizz room
     * @param {(Number|String)} pin The game pin to join
     * @param {String} [name="jsQuizizz Bot"] The username to join with
     * @param {Number} avatarID The avatar ID. See Game.avatars for the list of IDs
     * @param {Types.GameOptions} [options={}] The advanced options
     * @throws {Error} Throws an error if no pin is provided, or the socket probing fails
     */
    async joinGame(pin, name = "jsQuizizz Bot", avatarID = 1, options = {}) {
        if (!pin) throw new Error("No PIN provided")
        /**
         * @type {Types.Room}
         * @readonly
         */
        this.room = await Game.getRoom(pin);
        this.ia = [];
        /**
         * @readonly
         */
        this.avatarID = avatarID;
        /**
         * @readonly
         */
        this.name = name;
        /**
         * @readonly
         */
        this.active = false;
        this.options = options;
        this.options.time ||= 1;
        this.options.correctPoints ||= 1000;
        this.options.correctPoints = Math.min(7500, this.options.correctPoints);
        this.options.incorrectPoints ||= 0;
        this.options.incorrectPoints = Math.min(5000, this.options.incorrectPoints);
        this.options.streakBoost ||= 6;

        var sidResponse = await got("https://socket.quizizz.com/_gsocket/sockUpg/?experiment=authRevamp&EIO=4&transport=polling&t=ODn3agL");
        var cookie = sidResponse.headers["set-cookie"];
        var { sid } = JSON.parse(sidResponse.body.substring(1));
        // Two
        await got.post("https://socket.quizizz.com/_gsocket/sockUpg/?experiment=authRevamp&EIO=4&transport=polling&t=ODn3aj_&sid=" + sid, {
            body: "40",
            headers: {
                cookie
            }
        })

        // Three
        await got("https://socket.quizizz.com/_gsocket/sockUpg/?experiment=authRevamp&EIO=4&transport=polling&t=ODn3ak0&sid=" + sid, {
            headers: {
                cookie
            }
        });

        this.socket = new WebSocket("wss://socket.quizizz.com/_gsocket/sockUpg/?experiment=authRevamp&EIO=4&transport=websocket&sid=" + sid, {
            headers: { cookie }
        });

        this.socket.once("open", () => {
            this.socket.send("2probe");
            this.socket.once("message", (m) => {
                if (m != "3probe") throw new Error("Socking probing failed")
                this.socket.send("5");
                this.#connect();
            })
        })
    }

    /**
     * Leaves a Quizizz room. This will throw the "disconnect" event
     */
    leaveGame() {
        this.socket.close();
    }

    /**
     * Connects to the websockets. This function is used internally
     * @fires Game#disconnect
     * @private
     */
    async #connect() {
        this.socket.send(`420["v5/join",{"roomHash":"${this.room.hash}","player":{"id":"${this.name}","origin":"web","isGoogleAuth":false,"avatarId":${this.avatarID},"startSource":"preGameScreen","userAgent":"jsquizizz","uid":"${randomUUID()}","expName":"bigGameCod_exp","expSlot":"0"},"powerupInternalVersion":"19","__cid__":"v5/join.|1.1664052072023"}]`);
        this.socket.on("message", this.#handler.bind(this))
        this.socket.on("close", (code, reason) => {
            /**
             * The client disconnecting from the websocket event
             * @event Game#disconnect
             * @type {Types.Events.Disconnect}
             */
            this.emit("disconnect", {
                code,
                reason
            })
        });
    }

    /**
     * Sets up the client for when the game has begun. This function is used internally
     * @fires Game#start
     * @private
     */
    async #gameStarted() {
        this.active = true;
        this.index = -1;
        /**
         * The game has started
         * @event Game#start
         */
        this.emit("start");
        this.#question();
    }

    /**
     * Activates a powerup based on the powerups in `this.powerups`
     * @param {String} pu The powerup ID to activate
     * @param {string[]} [targets=[]] The targets (Only used for 'send-gift')
     */
    async activatePowerup(pu, targets = []) {
        var name = getKeyByValue(this.powerups, pu);
        var meta = { "questionId": this.room.questions[this.room.questionIds[this.index]]?._id || "", "attempt": 0, "playerId": this.name, "monsterId": this.avatarID, "player": { "playerId": this.name, "monsterId": this.avatarID } };
        switch (name) {
            case "streak-booster":
                meta.streakChangeBy = this.options.streakBoost;
                break;
            case "send-gift":
                meta.targets = targets.map(t => {
                    return {
                        monsterId: this.room.players.find(p => p.playerId == t).monsterId,
                        id: t
                    }
                });
        }
        this.socket.send(`422["v4/activatePowerup",{"id":"${pu}","powerupId":"${pu}","playerId":"${this.name}","roomHash":"${this.room.hash}","meta":${JSON.stringify(meta)},"gameType":"${this.room.type}","name":"${name}","__cid__":"v4/activatePowerup.|1.1664140424620"}]`);

        this.#powerupCache = {
            pu, name, active: true
        }
        await this.#awardPowerUp(pu);
    }

    /**
     * Skips the current question
     */
    async skip() {
        await got.post("https://quizizz.com/play-api/skipQuestion", {
            json: {"roomHash":this.room.hash,"gameType":this.room.type,"playerId":this.name,"questionId": this.room.questionIds[this.index]}
        })
        this.#question();
    }

    /**
     * Prepares the client to answer a question. This function is used internally
     * @fires Game#doneAnswering
     * @fires Game#question
     * @private
     */
    async #question() {
        this.index++;
        /**
         * @type {Types.Question}
         */
        var cq = this.room.questions[this.room.questionIds[this.index]];

        if (!cq) {
            var encoded = Encoding.encode(`{"roomHash":"${this.room.hash}","playerId":"${this.name}","endedAt":${Date.now()},"__cid__":"v2/playerGameOver.|1.1664120791123"}`, "v2/playerGameOver");
            this.active = false;
            this.socket.send(`422["v2/playerGameOver",{"odata":"${encoded}"}]`);
            /**
             * The client has answered all the questions
             * @event Game#doneAnswering
             */
            this.emit("doneAnswering");
            return;
        }

        /**
         * The client is ready to answer a question
         * @event Game#question
         * @type {Types.Events.Question}
         */
        this.emit("question", {
            question: cq.structure.query,
            answers: cq.structure.options,
            incorrectAnswers: this.ia,
            type: cq.type
        })
    }

    /**
     * Handles all the websocket events. This function is used internally
     * @param {import('ws').MessageEvent} event 
     * @throws {QuizizzError} Throws an error if the socket send a join error
     * @fires Game#join
     * @fires Game#powerup
     * @fires Game#gameEnded
     * @fires Game#kick
     * @private
     */
    async #handler(event) {
        var m = event.toString();
        if (m == "2") {
            this.socket.send("3");
        } else if (m.startsWith("42")) {
            var [type, response] = JSON.parse(m.substring(m.indexOf("[")));
            if (type == "v5/join") {
                if (response.error) throw new QuizizzError(response.error);
                this.room = response.room;
                await this.#loadPowerUps();
                /**
                 * You joined the game
                 * @event Game#join
                 */
                this.emit("join")
                if (response.room?.state == "running") {
                    this.#gameStarted();
                }
            } else if (type == "gameStarted" && !this.active) {
                this.#gameStarted();
            } else if (type == "v4/activatePowerup") {
                var powerUpData = {
                    name: response.powerupEffect.name
                };
                switch (response.powerupEffect.name) {
                    case 'eraser':
                    case '50-50':
                        powerUpData["visibleOptions"] = response.powerupEffect.meta.visibleOptionIndices
                        break;
                    case 'streak-booster':
                        powerUpData["streakChangeBy"] = response.powerupEffect.meta.streakChangeBy;
                }
                /**
                 * A powerup has been used
                 * @event Game#powerup
                 * @type {Types.Events.Powerup}
                 */
                this.emit("powerup", powerUpData);
            } else if (type == "v2/playerGameOver") {
                // We don't do anything here, but options are for the future!
            } else if (type == "gameEnded") {
                /**
                 * The game has ended
                 * @event Game#gameEnded
                 * @type {Types.Leaderboard[]}
                 */
                this.emit("gameEnded", response.leaderboard.map(p => {
                    return {
                        name: p.playerId,
                        rank: p.rank,
                        score: p.score
                    }
                }));
            } else if (type == "deletePlayer") {
                /**
                 * A player has been kicked from the game
                 * @event Game#kick
                 * @type {string}
                 */
                this.emit("kick", response.playerId)
                if (response.playerId == this.name) {
                    this.socket.close();
                }
            }
            // ignore add powerups, and replay game
        }

    }
    /**
     * Answers a question from the answer parameter
     * @param {(String|Array|Object)} answer The answer
     * @throws {Error} Throws an error if the user tries to answer a question while the game in inactive
     * @fires Game#answer
     */
    async answer(answer) {
        if (!this.active) throw new Error("The game isn't active");
        var cq = this.room.questions[this.room.questionIds[this.index]];
        var destroy = [];
        if (this.#powerupCache.active) {
            destroy.push({ "name": this.#powerupCache.name, "meta": { "questionId": cq._id, "attempt": 0, "playerId": this.name, "monsterId": this.avatarID, "player": { "playerId": this.name, "monsterId": this.avatarID } }, "powerupId": this.#powerupCache.pu, "status": "ACTIVATED", "id": this.#powerupCache.pu });
        }
        switch (cq.type) {
            case "MATCH":
            case "MSQ":
            case "REORDER":
                if (!answer instanceof Array) throw new Error(`Answer's for questions of type: ${cq.type} must be of type Array. Instead got ${typeof cq}`)
                break;
            case "MCQ":
                if (!answer instanceof Number) throw new Error(`Answer's for questions of: ${cq.type} must be of type Number. Instead got ${typeof cq}`)
                break;
            case "DRAW":
            case "BLANK":
                if (!answer instanceof String) throw new Error(`Answer's for questions of: ${cq.type} must be of type String. Instead got ${typeof cq}`)
        }
        if (answer instanceof Array) {
            answer = {
                options: answer,
                version: cq.__v
            };
        }

        var response = await got.post(`https://game.quizizz.com/play-api/v4/proceedGame`, {
            json: {
                "roomHash": this.room.hash,
                "playerId": this.name,
                "response": {
                    "attempt": cq.attempt,
                    "questionId": cq._id,
                    "questionType": cq.type,
                    "response": answer,
                    "responseType": "original",
                    "timeTaken": this.options.time,
                    "isEvaluated": false,
                    "state": "attempted",
                    "provisional": {
                        "scores": {
                            "correct": this.options.correctPoints,
                            "incorrect": this.options.incorrectPoints
                        },
                        "scoreBreakups": {
                            "correct": {
                                "base": 0,
                                "timer": 0,
                                "streak": 0,
                                "total": 0,
                                "powerups": []
                            },
                            "incorrect": {
                                "base": 0,
                                "timer": 0,
                                "streak": 0,
                                "total": 0,
                                "powerups": []
                            }
                        },
                        "teamAdjustments": {
                            "correct": 0,
                            "incorrect": 0
                        }
                    }
                },
                "questionId": cq._id,
                "powerupEffects": {
                    destroy
                },
                "gameType": this.room.type, // Maybe TBD
                "quizVersionId": cq.versionId
            }
        }).json();
        if (this.#powerupCache) {
            this.#powerupCache.active = false;
            switch (this.#powerupCache.name) {
                case "immunity":
                    if (!response.response.isCorrect) {
                        this.index--;
                        this.ia.push(answer);
                    }
                    break;
            }
        } else if (this.ia.length > 0) {
            this.ia = []; // Reset the IA
        }

        /**
         * You answered a question
         * @event Game#answer
         * @type {Types.Events.Answer}
         */
        this.emit("answer", {
            streak: response.player,
            isCorrect: response.response.isCorrect,
            attempt: response.response.attempt,
            score: response.response.score,
            leaderboard: response.leaderboard.map(p => {
                return {
                    name: p.playerId,
                    rank: p.rank,
                    score: p.score
                }
            })
        })
        this.#question();
    }

};