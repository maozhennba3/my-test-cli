import fs from 'fs-extra';
import path from 'path';

const copyFile = async (temp: string, targetDir: string) => {
    await fs.copy(temp, targetDir);
    // 删除目标文件夹的.git文件
    await fs.remove(path.resolve(targetDir, './.git'));
    const pkgJson = await fs.readJSON(targetDir + '/package.json');
    return pkgJson;
}

export default copyFile;