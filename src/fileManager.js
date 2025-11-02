import { createInterface } from 'readline';
import { homedir } from 'os';
import { chdir } from 'process';

let username = '';

export function fileManager(user) {
  username = user;
  
  chdir(homedir());
  
  console.log(`Welcome to the File Manager, ${username}!`);
  
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
  });
  
  rl.on('SIGINT', () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    rl.close();
    process.exit(0);
  });
}
