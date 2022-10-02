export class QuizizzError extends Error {
    constructor(errorJSON) {
        super(errorJSON.message)
        this.type = errorJSON.type;
    }
}
// Modified from many different sources on GitHub. Sadly, I cannot find the original creator of this decoding function.
// If you are the original creator, let me know, and I will give you credit for your excellent work!
export class Encoding {
    static encode(params, value_in_code, allowedStr = 2) {
        const s = this.encodeRaw(value_in_code, true);
        return `${s}${this.encodeRaw(params, false, value_in_code)}${String.fromCharCode(33 + s.length)}${allowedStr}`;
    }
    static encodeRaw(text, sendResolved, strUtf8 = "quizizz.com") {
        let dispatchedStretch = 0;
        dispatchedStretch = sendResolved ? strUtf8.charCodeAt(0) : strUtf8.charCodeAt(0) + strUtf8.charCodeAt(strUtf8.length - 1);
        const xmlCells = [];
        for (let i = 0; i < text.length; i++) {
            const sendValue = text[i].charCodeAt(0);
            const c = sendResolved ? this.safeAdd(sendValue, dispatchedStretch) : this.addOffset(sendValue, dispatchedStretch, i, 2);
            xmlCells.push(String.fromCharCode(c));
        }
        return xmlCells.join("");
    }
    static decode(event, e = false) {
        if (e) {
            const e = this.extractHeader(event);
            return this.decodeRaw(e, true);
        }
        {
            const e = this.decode(this.extractHeader(event), true);
            const artistTrack = this.extractData(event);
            return this.decodeRaw(artistTrack, false, e);
        }
    }
    static decodeRaw(data, position, strUtf8 = "quizizz.com") {
        const artistTrack = this.extractVersion(data);
        let pos = 0;
        pos = position ? strUtf8.charCodeAt(0) : strUtf8.charCodeAt(0) + strUtf8.charCodeAt(strUtf8.length - 1);
        pos = -pos;
        const resultArray = [];
        for (let i = 0; i < data.length; i++) {
            const container = data[i].charCodeAt(0);
            const a = position ? this.safeAdd(container, pos) : this.addOffset(container, pos, i, artistTrack);
            resultArray.push(String.fromCharCode(a));
        }
        return resultArray.join("");
    }
    static addOffset(prop, view, value, options) {
        return 2 === options ? this.verifyCharCode(prop) ? this.safeAdd(prop, value % 2 == 0 ? view : -view) : prop : this.safeAdd(prop, value % 2 == 0 ? view : -view);
    }
    static extractData(ext) {
        const ifTokenLength = ext.charCodeAt(ext.length - 2) - 33;
        return ext.slice(ifTokenLength, -2);
    }
    static extractHeader(header) {
        const i = header.charCodeAt(header.length - 2) - 33;
        return header.slice(0, i);
    }
    static extractVersion(old) {
        if ("string" == typeof old && old[old.length - 1]) {
            const aStatedRank = parseInt(old[old.length - 1], 10);
            if (!isNaN(aStatedRank)) {
                return aStatedRank;
            }
        }
        return null;
    }
    static safeAdd(attrs, model) {
        const o = attrs + model;
        return o > 65535 ? o - 65535 + 0 - 1 : o < 0 ? 65535 - (0 - o) + 1 : o;
    }
    static verifyCharCode(len) {
        if ("number" == typeof len) {
            return !(len >= 55296 && len <= 56319 || len >= 56320 && len <= 57343);
        }
    }
};

export function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}
