import { resolve, dirname, join, parse } from 'path';
import { readdir, stat } from 'fs/promises';
import { cwd, chdir } from 'process';
import { platform } from 'os';

function getRootDirectory(currentPath) {
  if (platform() === 'win32') {
    const parsed = parse(currentPath);
    return parsed.root;
  } else {
    return '/';
  }
}

export async function up(args, currentDirectory) {
  const rootDir = getRootDirectory(currentDirectory);
  
  // Check if we're already at root
  if (currentDirectory === rootDir || dirname(currentDirectory) === currentDirectory) {
    return { newDirectory: currentDirectory };
  }
  
  const parentDir = dirname(currentDirectory);
  
  // Prevent going above root
  if (parentDir.length < rootDir.length || !parentDir.startsWith(rootDir)) {
    return { newDirectory: currentDirectory };
  }
  
  chdir(parentDir);
  const newDir = cwd();
  
  return { newDirectory: newDir };
}

export async function cd(args, currentDirectory) {
  if (args.length === 0) {
    throw new Error('Invalid input');
  }
  
  const rootDir = getRootDirectory(currentDirectory);
  const targetPath = resolve(currentDirectory, args[0]);
  
  // Check if path exists
  try {
    await stat(targetPath);
  } catch (error) {
    throw new Error('Operation failed');
  }
  
  // Prevent going above root
  if (!targetPath.startsWith(rootDir)) {
    return { newDirectory: currentDirectory };
  }
  
  chdir(targetPath);
  const newDir = cwd();
  
  // Verify we didn't go above root
  if (!newDir.startsWith(rootDir)) {
    chdir(currentDirectory);
    return { newDirectory: currentDirectory };
  }
  
  return { newDirectory: newDir };
}

export async function ls(args, currentDirectory) {
  const entries = await readdir(currentDirectory);
  const entriesInfo = [];
  
  for (const entry of entries) {
    const fullPath = join(currentDirectory, entry);
    const stats = await stat(fullPath);
    entriesInfo.push({
      name: entry,
      isDirectory: stats.isDirectory()
    });
  }
  
  // Sort: directories first, then files, both alphabetically
  entriesInfo.sort((a, b) => {
    if (a.isDirectory && !b.isDirectory) return -1;
    if (!a.isDirectory && b.isDirectory) return 1;
    return a.name.localeCompare(b.name);
  });
  
  // Format output
  const formattedEntries = entriesInfo.map(entry => {
    const type = entry.isDirectory ? 'directory' : 'file';
    return `${entry.name}\t${type}`;
  });
  
  return { output: formattedEntries.join('\n') };
}

