import { day6 as groupAnswers } from './input.js';

function calculateTotalYesAnswersPerGroup(groupAnswers){
  let yesAnswers = {};

  for(let answer of groupAnswers){
    for(let c of answer){
      yesAnswers[c] = true;
    }
  }

  return Object.keys(yesAnswers).length;
}

function calculateYesAnsweredByEveryoneInGroup(groupAnswers){
  let yesAnswers = {};
  let totalSharedYes = 0;
  let numPeople = groupAnswers.length;

  for(let answer of groupAnswers){
    for(let c of answer){
      if (yesAnswers[c] === undefined){
        yesAnswers[c] = 0;
      }
      yesAnswers[c] ++;

      if(yesAnswers[c] === numPeople){
        totalSharedYes ++;
      }
    }
  }

  return totalSharedYes;
}

function parseGroupAnswers(groupAnswers){
  let differentGroups = groupAnswers.split(/\s\s+/);

  let groups = differentGroups.map( x => x.split(/\s/));
  return groups;
}

let totalYes = 0;
let totalEveryoneYes = 0;
let groups = parseGroupAnswers(groupAnswers);
for(let group of groups){
  totalYes += calculateTotalYesAnswersPerGroup(group);
 totalEveryoneYes += calculateYesAnsweredByEveryoneInGroup(group);
}

console.log(`Answer part 1: ${totalYes}`);
console.log(`Answer part 2: ${totalEveryoneYes}`);