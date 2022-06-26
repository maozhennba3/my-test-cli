/*
 * @Author: Melody
 * @Date: 2022-06-25 23:48:06
 * @LastEditors: Melody 264418894@qq.com
 * @LastEditTime: 2022-06-26 00:00:06
 */

const exit = (code: number) => {
    if (code > 0) {
        // throw new Error(`Process exited with code ${code}`)
        console.log(`Process exited with code ${code}`)
    }
}

export default exit;