import { day4 as passportFile } from './input.js';

class Passport {
  byr = undefined;
  iyr = undefined;
  eyr = undefined;
  hgt = undefined;
  hcl = undefined
  ecl = undefined;
  pid = undefined;
  cid = undefined;

  constructor(){}
  
  set(key, value){
    if (key === 'byr'){
      this.byr = value;
    }

    if (key === 'iyr'){
      this.iyr = value;
    }

    if (key === 'eyr'){
      this.eyr = value;
    }

    if (key === 'hgt'){
      this.hgt = value;
    }

    if (key === 'hcl'){
      this.hcl = value;
    }

    if (key === 'ecl'){
      this.ecl = value;
    }

    if (key === 'pid'){
      this.pid = value;
    }

    if (key === 'cid'){
      this.cid = value;
    }
  }

  isValid(){
    return (this.byr !== undefined && this.iyr !== undefined && this.eyr !== undefined && this.hgt !== undefined && this.hcl !== undefined && 
      this.ecl !== undefined && this.pid !== undefined);
  }

  isReallyValid(){
    return (this.#isBirthYearValid() &&
            this.#isExpirationYearValid() &&
            this.#isEyeColorValid() &&
            this.#isHairColorValid() &&
            this.#isHeightValid() &&
            this.#isIssueYearValid() &&
            this.#isPassportIdValid());
  }

  #isBirthYearValid(){
    let regex = new RegExp(/^[0-9]{4}$/);
    if (this.byr !== undefined && regex.test(this.byr)){
      let year = Number.parseInt(this.byr);
      return (year >= 1920 && year <= 2002);
    }

    return false;
  }

  #isIssueYearValid(){
    let regex = new RegExp(/^[0-9]{4}$/);
    if (this.iyr !== undefined && regex.test(this.iyr)){
      let year = Number.parseInt(this.iyr);
      return (year >= 2010 && year <= 2020);
    }

    return false;
  }
  
  #isExpirationYearValid(){
    let regex = new RegExp(/^[0-9]{4}$/);
    if (this.eyr !== undefined && regex.test(this.eyr)){
      let year = Number.parseInt(this.eyr);
      return (year >= 2020 && year <= 2030);
    }

    return false;
  }

  #isHeightValid(){
    let regex = new RegExp(/^[0-9]+(cm|in)$/);

    if (this.hgt !== undefined && regex.test(this.hgt)){
      let height = Number.parseInt(this.hgt.substr(0, this.hgt.length-2));
      let metricUnit = this.hgt.substr(this.hgt.length-2);

      if (metricUnit === 'cm'){
        return (height >= 150 && height <= 193);
      }

      if (metricUnit === 'in'){
        return (height >= 59 && height <= 76);
      }
    }

    return false;
  }

  #isHairColorValid(){
    let regex = new RegExp(/^#[0-9a-f]{6}$/);
    return (this.hcl !== undefined && regex.test(this.hcl));
  }

  #isEyeColorValid(){
    return (this.ecl !== undefined && 
      (this.ecl === 'amb' ||
      this.ecl === 'blu' ||
      this.ecl === 'brn' ||
      this.ecl === 'gry' ||
      this.ecl === 'grn' ||
      this.ecl === 'hzl' ||
      this.ecl === 'oth'));
  }

  #isPassportIdValid(){
    let regex = new RegExp(/^[0-9]{9}$/);
    return (this.pid !== undefined && regex.test(this.pid));
  }
}

function parsePassportFile(passportFile){
  let passports = [];
  let passportBatchs = passportFile.split(/\s\s+/);
  
  for(let batch of passportBatchs){
    let fields = batch.split(/\s/);
    let passport = new Passport();
  
    for (let field of fields){
      let keyValue = field.split(':');
      passport.set(keyValue[0], keyValue[1]);
    }
    passports.push(passport);
  }

  return passports;
}

let passports = parsePassportFile(passportFile);
let validPassports = 0;
let reallyValidPassports = 0;

for (let passport of passports) {
  if (passport.isValid()){
    validPassports ++;
  }

  if (passport.isReallyValid()){
    reallyValidPassports ++;
  }
}

console.log(`Total passports: ${passports.length}`);
console.log(`Answer part 1: ${validPassports}`);
console.log(`Answer part 2: ${reallyValidPassports}`);