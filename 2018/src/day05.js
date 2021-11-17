//day 05
import {readFileSync} from 'fs';

function partOne(polymer){
    console.log('You\'ve managed to sneak in to the prototype suit manufacturing lab. The Elves are making decent progress, but are still struggling with the suit\'s size reduction capabilities.');
    console.log('While the very latest in 1518 alchemical technology might have solved their problem eventually, you can do better. You scan the chemical composition of the suit\'s material and discover that it is formed by extremely long polymers (one of which is available as your puzzle input).');
    console.log('The polymer is formed by smaller units which, when triggered, react with each other such that two adjacent units of the same type and opposite polarity are destroyed. Units\' types are represented by letters; units\' polarity is represented by capitalization. For instance, r and R are units with the same type but opposite polarity, whereas r and s are entirely different types and do not react.');
    console.log('For example:');
    console.log('In aA, a and A react, leaving nothing behind.');
    console.log('In abBA, bB destroys itself, leaving aA. As above, this then destroys itself, leaving nothing.');
    console.log('In abAB, no two adjacent units are of the same type, and so nothing happens.');
    console.log('In aabAAB, even though aa and AA are of the same type, their polarities match, and so nothing happens.');
    console.log('Now, consider a larger example, dabAcCaCBAcCcaDA:');
    console.log('dabAcCaCBAcCcaDA  The first \'cC\' is removed.');
    console.log('dabAaCBAcCcaDA    This creates \'Aa\', which is removed.');
    console.log('dabCBAcCcaDA      Either \'cC\' or \'Cc\' are removed (the result is the same).');
    console.log('dabCBAcaDA        No further actions can be taken.');
    console.log('After all possible reactions, the resulting polymer contains 10 units.');
    console.log('How many units remain after fully reacting the polymer you scanned? (Note: in this puzzle and others, the input is large; if you copy/paste your input, make sure you get the whole thing.)');
    console.log('-----------------------------------');
    console.log('Your puzzle answer was  ' + remainingUnitsAfterStabilisePolymer(polymer));
    console.log('-----------------------------------');
}

function remainingUnitsAfterStabilisePolymer(polymer){
    let stablePolymer = removeReactingUnits(polymer);
    return stablePolymer.length;
}

function removeReactingUnits(polymer){
    let polymerChar = polymer.split('');
    let stablePolymer = [];

    polymerChar.forEach(unit => {
        if (stablePolymer.length === 0){
            stablePolymer.push(unit);
        }
        else{
            if(stablePolymer[stablePolymer.length-1].toUpperCase() === unit.toUpperCase() && stablePolymer[stablePolymer.length-1] !== unit){
                stablePolymer.pop();
            }
            else
            stablePolymer.push(unit);
            {}
        }
    });

    return stablePolymer.join('');
}

function partTwo(polymer){
    console.log('--- Part Two ---');
    console.log('Time to improve the polymer.');
    console.log('One of the unit types is causing problems; it\'s preventing the polymer from collapsing as much as it should. Your goal is to figure out which unit type is causing the most problems, remove all instances of it (regardless of polarity), fully react the remaining polymer, and measure its length.');
    console.log('For example, again using the polymer dabAcCaCBAcCcaDA from above:');
    console.log('Removing all A/a units produces dbcCCBcCcD. Fully reacting this polymer produces dbCBcD, which has length 6.');
    console.log('Removing all B/b units produces daAcCaCAcCcaDA. Fully reacting this polymer produces daCAcaDA, which has length 8.');
    console.log('Removing all C/c units produces dabAaBAaDA. Fully reacting this polymer produces daDA, which has length 4.');
    console.log('Removing all D/d units produces abAcCaCBAcCcaA. Fully reacting this polymer produces abCBAc, which has length 6.');
    console.log('In this example, removing all C/c units was best, producing the answer 4.');
    console.log('What is the length of the shortest polymer you can produce by removing all units of exactly one type and fully reacting the result?');
    console.log('-----------------------------------');
    console.log("Your puzzle answer was  " + createShortestPolymer(polymer));
    console.log('-----------------------------------');
}

function createShortestPolymer(polymer){
    let alphabet = Array.from(new Set(polymer.toUpperCase()));
    let minPolymerLength = polymer.length;
    alphabet.forEach(l => {
        let newPolymer = polymer.replace(new RegExp(l, 'gi'), '');
        let newPolymerLength = remainingUnitsAfterStabilisePolymer(newPolymer);
        if (newPolymerLength < minPolymerLength){
            minPolymerLength = newPolymerLength;
        }
    });
    return minPolymerLength;
}

function day05(){
    console.log("--- Day 5: Alchemical Reduction ---");
    let polymer = readPolymer();
    partOne(polymer);
    partTwo(polymer); 
    console.log('\n\n');
}

function readPolymer(){
    let polymer = readFileSync('resources/day05_input.txt', 'utf8');
    return polymer;
}

export { day05, removeReactingUnits, createShortestPolymer };