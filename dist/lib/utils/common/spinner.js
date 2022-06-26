"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ora_1 = __importDefault(require("ora"));
var chalk_1 = __importDefault(require("chalk"));
var spinner = (0, ora_1.default)();
var lastMsg = null;
var logWithSpinner = function (symbol, msg) {
    if (!msg) {
        msg = symbol;
        symbol = chalk_1.default.green('✔');
    }
    if (lastMsg) {
        spinner.stopAndPersist({
            symbol: lastMsg.symbol,
            text: spinner.text,
        });
    }
    spinner.text = ' ' + msg;
    lastMsg = {
        symbol: symbol + ' ',
        text: msg,
    };
    spinner.start();
};
var stopSpinner = function (persist) {
    if (lastMsg && persist !== false) {
        spinner.stopAndPersist({
            symbol: lastMsg.symbol,
            text: lastMsg.text,
        });
    }
    else {
        spinner.stop();
    }
    lastMsg = null;
};
var pauseSpinner = function () {
    spinner.stop();
};
var resumeSpinner = function () {
    spinner.start();
};
exports.default = {
    logWithSpinner: logWithSpinner,
    stopSpinner: stopSpinner,
    pauseSpinner: pauseSpinner,
    resumeSpinner: resumeSpinner
};
//# sourceMappingURL=spinner.js.map