import { day2 as data } from './input.js'

class Policy {
  constructor(character, min, max) {
    this.character = character;
    this.min = min;
    this.max = max;
  }

  validatePasswordPart1(password){
    let count = 0;
    for(let c of password){
      if (c === this.character){
        count ++;
      }
    }

    return (count >= this.min && count <= this.max);
  }

  validatePasswordPart2(password){
    return ((password[this.min-1] === this.character && password[this.max-1] !== this.character) || (password[this.min-1] !== this.character && password[this.max-1] === this.character));
  }
}

class Password {
  constructor(policy, password) {
    this.policy = policy;
    this.password = password;
  }

  isValidPart1(){
    return this.policy.validatePasswordPart1(this.password);
  }

  isValidPart2(){
    return this.policy.validatePasswordPart2(this.password);
  }
}



function parseData(data){
  let passwordsPolicies = data.map((element) => {
    let parts = element.split(' ');
    let range = parts[0].split('-');
    let character = parts[1][0];
    let password = parts[2];

    let policy = new Policy(character, parseInt(range[0]), parseInt(range[1]));
    let passwordPolicy = new Password(policy, password);
    return passwordPolicy;
  });

  return passwordsPolicies;
}

let passwordsPolicies = parseData(data);
let validPasswordsPart1 = 0;
let validPasswordsPart2 = 0;
for(let password of passwordsPolicies){
  if(password.isValidPart1()){
    validPasswordsPart1 ++;
  }

  if(password.isValidPart2()){
    validPasswordsPart2 ++;
  }
}

console.log(`Valid passwords part 1 = ${validPasswordsPart1}`);
console.log(`Valid passwords part 2 = ${validPasswordsPart2}`);
