"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var spinner_1 = __importDefault(require("./spinner"));
var exit_1 = __importDefault(require("./exit"));
var logger_1 = require("./logger");
exports.default = {
    spinner: spinner_1.default,
    exit: exit_1.default,
    error: logger_1.error,
    log: logger_1.log
};
//# sourceMappingURL=index.js.map