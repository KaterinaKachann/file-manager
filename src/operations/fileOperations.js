import { createReadStream, createWriteStream } from 'fs';
import { stat, writeFile, mkdir as fsMkdir, rename, unlink } from 'fs/promises';
import { resolve, join, dirname } from 'path';
import { pipeline } from 'stream/promises';

export async function cat(args, currentDirectory) {
  if (args.length === 0) {
    throw new Error('Invalid input');
  }
  
  const filePath = resolve(currentDirectory, args[0]);
  
  // Check if file exists
  try {
    const fileStat = await stat(filePath);
    if (fileStat.isDirectory()) {
      throw new Error('Operation failed');
    }
  } catch (error) {
    if (error.message === 'Operation failed') {
      throw error;
    }
    throw new Error('Operation failed');
  }
  
  const readStream = createReadStream(filePath, 'utf8');
  
  let content = '';
  readStream.on('data', (chunk) => {
    content += chunk;
  });
  
  await new Promise((resolve, reject) => {
    readStream.on('end', resolve);
    readStream.on('error', reject);
  });
  
  return { output: content };
}

export async function add(args, currentDirectory) {
  if (args.length === 0) {
    throw new Error('Invalid input');
  }
  
  const filePath = join(currentDirectory, args[0]);
  await writeFile(filePath, '');
  return {};
}

export async function mkdir(args, currentDirectory) {
  if (args.length === 0) {
    throw new Error('Invalid input');
  }
  
  const dirPath = join(currentDirectory, args[0]);
  await fsMkdir(dirPath, { recursive: false });
  return {};
}

export async function rn(args, currentDirectory) {
  if (args.length !== 2) {
    throw new Error('Invalid input');
  }
  
  const oldPath = resolve(currentDirectory, args[0]);
  
  // Check if source file exists
  try {
    await stat(oldPath);
  } catch (error) {
    throw new Error('Operation failed');
  }
  
  const newPath = join(dirname(oldPath), args[1]);
  await rename(oldPath, newPath);
  return {};
}

export async function cp(args, currentDirectory) {
  if (args.length !== 2) {
    throw new Error('Invalid input');
  }
  
  const sourcePath = resolve(currentDirectory, args[0]);
  const targetDir = resolve(currentDirectory, args[1]);
  
  // Check if source file exists
  try {
    const sourceStat = await stat(sourcePath);
    if (sourceStat.isDirectory()) {
      throw new Error('Operation failed');
    }
  } catch (error) {
    if (error.message === 'Operation failed') {
      throw error;
    }
    throw new Error('Operation failed');
  }
  
  // Check if target directory exists
  try {
    const targetStat = await stat(targetDir);
    if (!targetStat.isDirectory()) {
      throw new Error('Operation failed');
    }
  } catch (error) {
    throw new Error('Operation failed');
  }
  
  // Use streams for copying
  const fileName = sourcePath.split(/[/\\]/).pop();
  const targetPath = join(targetDir, fileName);
  
  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(targetPath);
  
  await pipeline(readStream, writeStream);
  
  return {};
}

export async function mv(args, currentDirectory) {
  if (args.length !== 2) {
    throw new Error('Invalid input');
  }
  
  const sourcePath = resolve(currentDirectory, args[0]);
  const targetDir = resolve(currentDirectory, args[1]);
  
  // Check if source file exists
  try {
    const sourceStat = await stat(sourcePath);
    if (sourceStat.isDirectory()) {
      throw new Error('Operation failed');
    }
  } catch (error) {
    if (error.message === 'Operation failed') {
      throw error;
    }
    throw new Error('Operation failed');
  }
  
  // Check if target directory exists
  try {
    const targetStat = await stat(targetDir);
    if (!targetStat.isDirectory()) {
      throw new Error('Operation failed');
    }
  } catch (error) {
    throw new Error('Operation failed');
  }
  
  // Use streams for copying
  const fileName = sourcePath.split(/[/\\]/).pop();
  const targetPath = join(targetDir, fileName);
  
  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(targetPath);
  
  await pipeline(readStream, writeStream);
  
  // Delete source file
  await unlink(sourcePath);
  
  return {};
}

export async function rm(args, currentDirectory) {
  if (args.length === 0) {
    throw new Error('Invalid input');
  }
  
  const filePath = resolve(currentDirectory, args[0]);
  
  // Check if file exists
  try {
    await stat(filePath);
  } catch (error) {
    throw new Error('Operation failed');
  }
  
  await unlink(filePath);
  return {};
}

