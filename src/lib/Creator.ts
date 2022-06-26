/*
 * @Author: Melody 264418894@qq.com
 * @Date: 2022-06-25 16:23:09
 * @LastEditors: Melody 264418894@qq.com
 * @LastEditTime: 2022-06-26 01:20:34
 */
import chalk from 'chalk';
import execa from 'execa';
import inquirer from 'inquirer';
import EventEmitter from 'events';
import utils from './utils/common/index'
import loadRemotePreset from './utils/loadRemotePreset';
import defaults from './utils/constants'
import copyFile from './utils/copyFile';
import writeFileTree from './utils/wirteFileTree';
const { spinner, exit, error, log, } = utils;

class Creator extends EventEmitter {
    name: string;
    context: any;

    constructor(name: string, context: any) {
        super();
        this.name = name;
        this.context = context;

        this.run = this.run.bind(this);
    }

    // 创建项目
    async create(cliOptions: any, preset = null as any) {
        const { run, context, name } = this;
        if (cliOptions.preset) {
            preset = await this.resolvePreset(cliOptions.preset, cliOptions.clone);
        } else {
            preset = await this.resolvePreset(defaults.preset.default, cliOptions.clone)
        }

        log(chalk.blue.bold(`mz CLI v${require('../../package.json').version}`));
        spinner.logWithSpinner(`✨`, `正在创建项目 ${chalk.yellow(context)}.`);
        this.emit('creation', { event: 'creating' });

        spinner.stopSpinner();

        // 设置文件名 版本号
        const { pkgVersion, pkgDescription } = await inquirer.prompt([{
            name: 'pkgVersion',
            type: 'input',
            message: '请输入版本号',
            default: '1.0.0'
        }, {
            name: 'pkgDescription',
            type: 'input',
            message: '请输入项目简介',
            default: 'project created by never-test-cli'
        }])

        // 临时文件拷贝到项目中
        const pkgJson = await copyFile(preset.tmpdir, preset.targetDir)
        const pkg = Object.assign(pkgJson, {
            version: pkgVersion,
            description: pkgDescription
        })

        // 写入package.json
        log();
        spinner.logWithSpinner('📄', `生成 ${chalk.yellow('package.json')} 等模板文件`);

        await writeFileTree(context, {
            'package.json': JSON.stringify(pkg, null, 2)
        })

        spinner.stopSpinner()
        log()
        log(`🎉  项目创建成功 ${chalk.yellow(name)}.`)
        this.emit('creation', { event: 'done' })
    }

    // 执行
    run(command: any, args: any[]) {
        if (!args) { [command, ...args] = command.split(/\s+/) }
        return execa(command, args, { cwd: this.context })
    }

    // 处理预设-获取远程模板
    async resolvePreset(name: string, clone: any) {
        let preset;
        spinner.logWithSpinner(`正在拉取远程 preset  ${chalk.cyan(name)} `);
        this.emit('creation', { event: 'fetch-remote-preset' })
        try {
            preset = await loadRemotePreset(name, this.context, clone);

            spinner.stopSpinner();
        } catch (err: any) {
            spinner.stopSpinner();
            error(`获取远程 preset ${chalk.cyan(name)} 失败`)
            throw err;
        }
        return preset;
    }
}

export default Creator;