import { EOL, cpus, homedir, userInfo, arch } from 'os';

export async function os(args, currentDirectory) {
  if (args.length === 0) {
    throw new Error('Invalid input');
  }
  
  const option = args[0];
  
  try {
    switch (option) {
      case '--EOL': {
        const eol = JSON.stringify(EOL);
        return { output: eol };
      }
      
      case '--cpus': {
        const cpuInfo = cpus();
        const output = [
          `Total amount of CPUS: ${cpuInfo.length}`,
          ...cpuInfo.map((cpu, index) => 
            `${index + 1}. Model: ${cpu.model}, Clock rate: ${(cpu.speed / 1000).toFixed(2)} GHz`
          )
        ];
        return { output: output.join('\n') };
      }
      
      case '--homedir': {
        const home = homedir();
        return { output: home };
      }
      
      case '--username': {
        const username = userInfo().username;
        return { output: username };
      }
      
      case '--architecture': {
        const architecture = arch();
        return { output: architecture };
      }
      
      default:
        throw new Error('Invalid input');
    }
  } catch (error) {
    if (error.message === 'Invalid input') {
      throw error;
    }
    throw new Error('Operation failed');
  }
}

