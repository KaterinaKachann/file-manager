import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { resolve } from 'path';
import { stat } from 'fs/promises';

export async function hash(args, currentDirectory) {
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
  
  const hashStream = createHash('sha256');
  const readStream = createReadStream(filePath);
  
  readStream.on('data', (chunk) => {
    hashStream.update(chunk);
  });
  
  await new Promise((resolvePromise, rejectPromise) => {
    readStream.on('end', resolvePromise);
    readStream.on('error', rejectPromise);
  });
  
  const hashValue = hashStream.digest('hex');
  return { output: hashValue };
}

