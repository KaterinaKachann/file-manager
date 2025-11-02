import * as navigation from './navigation.js';
import * as fileOps from './fileOperations.js';
import * as osInfo from './osInfo.js';
import * as hashOps from './hashOperations.js';

const commandHandlers = {
  up: navigation.up,
  cd: navigation.cd,
  ls: navigation.ls,
  cat: fileOps.cat,
  add: fileOps.add,
  mkdir: fileOps.mkdir,
  rn: fileOps.rn,
  cp: fileOps.cp,
  mv: fileOps.mv,
  rm: fileOps.rm,
  os: osInfo.os,
  hash: hashOps.hash
};

export const operations = {
  async execute(command, args, currentDirectory) {
    const handler = commandHandlers[command];
    
    if (!handler) {
      throw new Error('Invalid input');
    }
    
    return await handler(args, currentDirectory);
  }
};

