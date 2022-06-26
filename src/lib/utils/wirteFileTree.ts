import fs from 'fs-extra';
import path from 'path';

// 删除需要删除的文件
const deleteRemovedFiles = async (dir: string, newFiles: Record<string, string>, previousFiles: Record<string, string>) => {
    // 找到存在于目前文件系统中但是不存在与新文件系统中
    const filesToDelete = Object.keys(previousFiles).filter((filename: string) => !newFiles[filename] as any);

    return Promise.all(filesToDelete.map((filename: string) => {
        return fs.unlink(path.join(dir, filename))
    }))
}

// 写文件树
const writeFileTree = async (dir: string, newFiles: Record<string, string>, previousFiles?: Record<string, string>) => {
    if (previousFiles) {
        await deleteRemovedFiles(dir, newFiles, previousFiles)
    }
    Object.keys(newFiles).forEach((filename: string) => {
        const filePath: string = path.join(dir, filename);
        fs.ensureDir(path.dirname(filePath)); // 确保文件目录存在
        fs.writeFileSync(filePath, newFiles[filename]) // 
    })
}

export default writeFileTree;