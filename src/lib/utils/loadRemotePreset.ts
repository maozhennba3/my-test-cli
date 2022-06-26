import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import download from 'download-git-repo';

const remotePresetMap: Record<string, string> = {
    react: 'maozhennba3/react-cli-temp'
}
/**
 * @description: 拉取远程模板
 * @param {string} preset preset名称
 * @param {string} targetDir 目标文件夹
 * @param {any} clone 是否git clone
 * @return {*}
 */
const loadRemotePreset = async (preset: string, targetDir: string, clone: boolean) => {
    const tmpdir = path.join(os.tmpdir(), 'never-test-cli')
    await fs.remove(tmpdir);

    await new Promise((resolve, reject) => {
        download(remotePresetMap[preset], tmpdir, { clone }, ((err: Error) => {
            if (err) return reject(err);
            resolve(tmpdir)
        }))
    })

    return {
        targetDir,
        tmpdir
    }
}
export default loadRemotePreset;
