import { day7 as bagRules } from './input.js';

class BagRule {
  name;
  contains;
  contained;

  constructor(name) {
    this.name = name;
    this.contains = {};
    this.contained = {};
  }

  addBag (name, amount) {
    this.contains[name] = amount;
  }

  addPartOfBag (name) {
    this.contained[name] = true;
  }
}

class LuggageRules {
  rules = {};

  constructor(writtenRules){
    let ruleLines = writtenRules.split('\n');
    let regex = /(\d) (\w+ \w+)/;

    for(let line of ruleLines){
      let lineParts = line.split(' bags contain ');
      let name = lineParts[0];

      if (this.rules[name] === undefined){
        this.rules[name] = new BagRule(name);
      }

      if (lineParts[1] !== 'no other bags.'){
        let contents = lineParts[1].split(',');
        
        for (let content of contents){
          let matches = content.match(regex);

          for (let i = 1; i < matches.length; i+=2) {
            let amount = Number.parseInt(matches[i]);
            let bag = matches[i+1];

            this.rules[name].addBag(bag, amount);

            if (this.rules[bag] === undefined) {
              this.rules[bag] = new BagRule(bag);
            }

            this.rules[bag].addPartOfBag(name);
          }
        }
      }
    }
  }

  findBagsContainingBag(name){
    let bags = new Set();
    let bagsToCheck = [...Object.keys(this.rules[name].contained)];

    while (bagsToCheck.length > 0){
      let nextBag = bagsToCheck.shift();
      if (!bags.has(nextBag)){
        bags.add(nextBag);
        bagsToCheck.push(...Object.keys(this.rules[nextBag].contained));
      }
    }

    return bags;
  }

  findBagsInBag(name){
    let numBags = 0;

    for(let bag in this.rules[name].contains){
      numBags += this.rules[name].contains[bag];
      let numBagsInBag = this.findBagsInBag(bag);
      numBags += (this.rules[name].contains[bag] * numBagsInBag);
    }

    return numBags;
  }
}

let rules = new LuggageRules(bagRules);
let bagsWithShinyGold = rules.findBagsContainingBag('shiny gold');
let bagsInsideShinyGold = rules.findBagsInBag('shiny gold');

console.log(`Answer part 1: ${bagsWithShinyGold.size}`);
console.log(`Answer part 2: ${bagsInsideShinyGold}`);