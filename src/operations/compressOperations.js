import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { resolve } from 'path';
import { stat } from 'fs/promises';

export async function compress(args, currentDirectory) {
  if (args.length !== 2) {
    throw new Error('Invalid input');
  }
  
  const sourcePath = resolve(currentDirectory, args[0]);
  const destPath = resolve(currentDirectory, args[1]);
  
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
  
  // Use streams for compression with Brotli
  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(destPath);
  const compressStream = createBrotliCompress();
  
  await pipeline(readStream, compressStream, writeStream);
  
  return {};
}

export async function decompress(args, currentDirectory) {
  if (args.length !== 2) {
    throw new Error('Invalid input');
  }
  
  const sourcePath = resolve(currentDirectory, args[0]);
  const destPath = resolve(currentDirectory, args[1]);
  
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
  
  // Use streams for decompression with Brotli
  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(destPath);
  const decompressStream = createBrotliDecompress();
  
  await pipeline(readStream, decompressStream, writeStream);
  
  return {};
}

