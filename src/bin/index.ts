#! /usr/bin/env node

import {
    Command
} from 'commander';
import chalk from 'chalk'
import create from '../lib/create';

const program = new Command();

// 配置版号和首行提示
program
    .name("never-test-cli")
    .usage(`<command> [option]`)
    .version(`never-test-cli ${require("../../package.json").version}`);


// 配置create 命令
program
    .command("create <project-name>") // 增加创建指令
    .description("create a new project") // 添加描述信息
    .option("-f, --force", "overwrite target directory if it exists") // 强制覆盖
    .option("-d, --default", "skip promots and use default preset") // 使用默认预设
    .option("-p, --preset <presetName>", "skip promots and use saved or promote preset")
    .action((projectName: string, options: any, command: any) => {
        // 引入 create 模块，并传入参数
        create(projectName, options);
    });

// 配置config
program.command("config [value]")
    .description("inspect and modify the config")
    .option("-g, --get <key>", "get value by key")
    .option("-s, --set <key> <value>", "set option[key] is value")
    .option("-d, --delete <key>", "detele option by key")
    .action((value: string, keys: string) => {
        // do something
    })

// 高亮优化--help 提示
// 监听 --help 指令
program.on("--help", function () {
    // 前后两个空行调整格式，更舒适
    console.log(
        `Run ${chalk.cyan(
            "never-test-cli <command> --help"
        )} for detailed usage of given command.`
    );
});

// process.argv 是 nodejs 提供的属性
// npm run server --port 3000
// 后面的 --port 3000 就是用户输入的参数
program.parse(process.argv)
