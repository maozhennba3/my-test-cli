/*
 * @Author: Melody 264418894@qq.com
 * @Date: 2022-06-26 01:00:35
 * @LastEditors: Melody 264418894@qq.com
 * @LastEditTime: 2022-06-26 01:16:41
 * @Description: 
 */
import chalk from 'chalk'

const chalkTag = (msg: string) => chalk.bgBlackBright.white.dim(` ${msg} `)

export const error = (msg: any, tag = null as any) => {
    console.error(chalk.bgRed(' ERROR ') + ' ' + (tag ? chalkTag(tag) : '') + chalk.red(msg))
    if (msg instanceof Error) {
        console.error(msg.stack)
    }
}

export const log = (msg = '' as string, tag = null as any) => {
    console.log(chalk.bgBlue.black(' INFO ') + (tag ? chalkTag(tag) : ''), msg)
}