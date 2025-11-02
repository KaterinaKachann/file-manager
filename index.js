import { fileManager } from './src/fileManager.js';

const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : null;

if (!username) {
  console.error('Error: --username argument is required');
  process.exit(1);
}

fileManager(username);

