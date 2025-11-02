import { createInterface } from 'readline';
import { homedir } from 'os';
import { chdir, cwd } from 'process';
import { operations } from './operations/index.js';

let currentDirectory = homedir();
let username = '';

export function fileManager(user) {
  username = user;
  
  chdir(currentDirectory);
  currentDirectory = cwd();
  
  console.log(`Welcome to the File Manager, ${username}!`);
  showCurrentDirectory();
  
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ''
  });
  
  rl.on('line', async (input) => {
    const trimmedInput = input.trim();
    
    if (trimmedInput === '.exit') {
      console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
      rl.close();
      process.exit(0);
      return;
    }
    
    if (!trimmedInput) {
      showCurrentDirectory();
      return;
    }
    
    try {
      const parts = trimmedInput.split(/\s+/);
      const command = parts[0];
      const args = parts.slice(1);
      
      const result = await operations.execute(command, args, currentDirectory);
      
      if (result.newDirectory) {
        currentDirectory = result.newDirectory;
        chdir(currentDirectory);
      }
      
      if (result.output) {
        console.log(result.output);
      }
      
      showCurrentDirectory();
    } catch (error) {
      if (error.message === 'Invalid input') {
        console.log('Invalid input');
      } else if (error.message === 'Operation failed') {
        console.log('Operation failed');
      } else {
        // Catch any unexpected errors and treat them as operation failed
        console.log('Operation failed');
      }
      showCurrentDirectory();
    }
  });
  
  rl.on('SIGINT', () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    rl.close();
    process.exit(0);
  });
}

function showCurrentDirectory() {
  console.log(`You are currently in ${cwd()}`);
}
