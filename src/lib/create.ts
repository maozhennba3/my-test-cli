/*
 * @Author: Melody 264418894@qq.com
 * @Date: 2022-06-19 23:46:13
 * @LastEditors: Melody 264418894@qq.com
 * @LastEditTime: 2022-06-26 01:15:04
 */
import fs from 'fs-extra';
import path = require('path');
import chalk from 'chalk';
import validatePackageName from 'validate-npm-package-name';
import utils from './utils/common/index'
import inquirer from 'inquirer'
import Creator from './Creator';

const { spinner, exit, error } = utils;

/**
 * @description: 创建项目
 * @param {string} projectName
 * @param {any} options
 * @return {*}
 */
const create = async (projectName: string, options: any) => {
    // 当前目录
    const cwd: string = options.cwd || process.cwd();
    // 是否在当前目录
    const inCurrent: boolean = projectName === '.';
    const name = inCurrent ? path.relative('../', cwd) : projectName;
    const targetDir: string = path.resolve(cwd, projectName);

    const result = validatePackageName(name);
    if (!result.validForNewPackages) {
        result.errors && result.errors.forEach(err => {
            console.error(chalk.red.dim('❌ ' + err))
        })
        result.warnings && result.warnings.forEach(warn => {
            console.error(chalk.red.dim('⚠️ ' + warn))
        })
        exit(1)
    }
    // 检查文件夹是否存在
    if (fs.existsSync(targetDir)) {
        if (options.force) {
            await fs.remove(targetDir);
        } else {
            if (inCurrent) {
                const { ok } = await inquirer.prompt({
                    name: 'ok',
                    type: 'confirm',
                    message: '是否在当前目录生成项目?'
                })
                if (!ok) {
                    return;
                }
            } else {
                const { action } = await inquirer.prompt({
                    name: 'action',
                    type: 'list',
                    choices: [
                        {
                            name: '覆盖', value: 'overwrite',
                        },
                        {
                            name: '取消', value: 'cancel',
                        }
                    ],
                    message: `目标文件夹${chalk.cyan(targetDir)}已存在,请选择:`
                })
                if (action === 'cancel') {
                    return;
                } else {
                    console.log(`\nRemoving ${chalk.cyan(targetDir)}...`)
                    fs.remove(targetDir);
                }
            }
        }
    }
    const creator = new Creator(name, targetDir);
    await creator.create(options);
}

const func = (projectName: string, options: any) => {
    create(projectName, options).catch((err: any) => {
        spinner.stopSpinner(false);
        error(err)
    })
}
export default func;