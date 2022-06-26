"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.error = void 0;
var chalk_1 = __importDefault(require("chalk"));
var chalkTag = function (msg) { return chalk_1.default.bgBlackBright.white.dim(" ".concat(msg, " ")); };
var error = function (msg, tag) {
    if (tag === void 0) { tag = null; }
    console.error(chalk_1.default.bgRed(' ERROR ') + ' ' + (tag ? chalkTag(tag) : '') + chalk_1.default.red(msg));
    if (msg instanceof Error) {
        console.error(msg.stack);
    }
};
exports.error = error;
var log = function (msg, tag) {
    if (msg === void 0) { msg = ''; }
    if (tag === void 0) { tag = null; }
    console.log(chalk_1.default.bgBlue.black(' INFO ') + (tag ? chalkTag(tag) : ''), msg);
};
exports.log = log;
//# sourceMappingURL=logger.js.map