import { createInterface } from 'readline';
import { homedir } from 'os';
import { chdir, cwd } from 'process';

let username = '';

export function fileManager(user) {
  username = user;
  
  chdir(homedir());
  
  console.log(`Welcome to the File Manager, ${username}!`);
  showCurrentDirectory();
  
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ''
  });
  
  rl.on('line', (input) => {
    const trimmedInput = input.trim();
    
    if (trimmedInput === '.exit') {
      console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
      rl.close();
      process.exit(0);
      return;
    }
    
    showCurrentDirectory();
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
