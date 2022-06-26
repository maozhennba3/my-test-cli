#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var chalk_1 = __importDefault(require("chalk"));
var create_1 = __importDefault(require("../lib/create"));
var program = new commander_1.Command();
program
    .name("never-test-cli")
    .usage("<command> [option]")
    .version("never-test-cli ".concat(require("../../package.json").version));
program
    .command("create <project-name>")
    .description("create a new project")
    .option("-f, --force", "overwrite target directory if it exists")
    .option("-d, --default", "skip promots and use default preset")
    .option("-p, --preset <presetName>", "skip promots and use saved or promote preset")
    .action(function (projectName, options, command) {
    (0, create_1.default)(projectName, options);
});
program.command("config [value]")
    .description("inspect and modify the config")
    .option("-g, --get <key>", "get value by key")
    .option("-s, --set <key> <value>", "set option[key] is value")
    .option("-d, --delete <key>", "detele option by key")
    .action(function (value, keys) {
});
program.on("--help", function () {
    console.log("Run ".concat(chalk_1.default.cyan("never-test-cli <command> --help"), " for detailed usage of given command."));
});
program.parse(process.argv);
//# sourceMappingURL=index.js.map