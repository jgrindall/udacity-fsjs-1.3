// Import readline module for getting input from console
// Find more here: https://nodejs.org/api/readline.html#readline_readline
const readline = require('readline');

// define question/output interface
const rl = readline.createInterface({
  // readable stream
  input: process.stdin,
  // writeable stream
  output: process.stdout
});

// Create questions for STDIN Input from console.
const menuQ = ():Promise<string> => {
  return new Promise<string>((resolve) => {
    // (readable, writeable from readline interface)
    rl.question('Your choice: ', (answer:string) => {
      resolve(answer);
    });
  });
};

const milkQ = ():Promise<string> => {
  return new Promise<string>((resolve) => {
    rl.question('How many cups of milk to add? ', (answer:string) => {
      resolve(answer);
    });
  });
};

const espressoQ = ():Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    rl.question('How many shots of espresso to add? ', (answer:string) => {
      resolve(answer);
    });
  });
};

const peppermintQ = ():Promise<string> => {
  return new Promise<string>((resolve) => {
    rl.question('How many shots of peppermint to add? ', (answer:string) => {
      resolve(answer);
    });
  });
};

// Create parent class Mocha
class Mocha {
  milk:number;
  shot:number;
  chocolateType:string;

  constructor() {
    this.milk = 1;
    this.shot = 1;
    this.chocolateType = 'dark';
  }
  // list the ingredients of the mocha
  prepare() {
    console.log('Your', this.chocolateType, ' Chocolate Mocha Ingredients:');
    console.log(this.chocolateType, ' chocolate');
    console.log('Cups of milk: ', this.milk);
    console.log('Cups of espresso: ', this.shot, '\n\n');
  }
}

// inherits from Mocha
class WhiteChocolateMocha extends Mocha {
  chocolateType = 'White';
}
// inherits from Mocha
class DarkChocolateMocha extends Mocha {
  chocolateType = 'Dark';
}
// inherits from Mocha
class PeppermintMocha extends Mocha {
  // add peppermint property
  peppermintSyrup:number;
  constructor() {
    // include super to pull in parent constructor
    super();
    this.peppermintSyrup = 1;
  }
  // Overrides Mocha prepare with additional statements
  prepare() {
    console.log('Your Peppermint Mocha Ingredients:');
    console.log('Dark chocolate');
    console.log('Cups of milk: ', this.milk);
    console.log('Cups of espresso: ', this.shot);
    console.log('Pumps of peppermint: ', this.peppermintSyrup, '\n\n');
  }
}

// display menu and return selected menu item
const showMenu = async ():Promise<string> => {
  console.log(
    'Select Mocha from menu: \n',
    '1: Create White Chocolate Mocha \n',
    '2: Create Dark Chocolate Mocha \n',
    '3: Create Peppermint Mocha\n',
    '0: Exit\n'
  );
  const qMenu:string = await menuQ();
  return qMenu;
};

// User questions
const userOptions = async (mochaObject:Mocha) => {
  const milkPicked:string = await milkQ();
  const milkChoice:number = parseInt(milkPicked);
  const espPicked:string = await espressoQ();
  const espChoice:number = parseInt(espPicked);
  // If peppermint mocha
  if (mochaObject instanceof PeppermintMocha) {
    const pepPicked:string = await peppermintQ();
    const pepChoice:number = parseInt(pepPicked);
    mochaObject.peppermintSyrup = pepChoice;
  }

  mochaObject.milk = milkChoice;
  mochaObject.shot = espChoice;
  mochaObject.prepare();
};

const main = () => {
  let menuChoice:number = 0;
  const buildMocha = async ():Promise<void>=> {
    do {
      const optionPicked:string = await showMenu();
      menuChoice = parseInt(optionPicked);
      switch (menuChoice) {
        case 0: {
          break;
        }
        case 1: {
          const whiteMocha:Mocha = new WhiteChocolateMocha();
          await userOptions(whiteMocha);
          break;
        }
        case 2: {
          const darkMocha:Mocha = new DarkChocolateMocha();
          await userOptions(darkMocha);
          break;
        }
        case 3: {
          const peppermintMocha:Mocha = new PeppermintMocha();
          await userOptions(peppermintMocha);
          break;
        }
        default: {
          console.log('Option invalid, please choose from menu.');
          break;
        }
      }
    } while (menuChoice != 0);
    // end readline process
    rl.close();
  };
  buildMocha();
};

main();
