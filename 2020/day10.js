import { day10 as jolts } from './input.js';

function getJoltDifferences(jolts){
    let differences = {
        '1': 0,
        '2': 0,
        '3': 1
    }

    for (let i = 1; i < jolts.length; i++){
        let diff = jolts[i] - jolts[i-1];
        differences[`${diff}`] ++;
    }

    return differences;
}

function getAllCombinations(jolts, pos, storedCombinations){
    if (pos === jolts.length - 1){
        return 1;
    }

    let combinations = 0;
    for (let i = 1; i <=3; i++){
        if (pos+i < jolts.length && jolts[pos+i] - jolts[pos] <= 3){
            if (storedCombinations[pos+i] !== undefined){
                combinations += storedCombinations[pos+i];
            }
            else{
                combinations += getAllCombinations(jolts, pos+i, storedCombinations);
            }
        }
    }

    storedCombinations[pos] = combinations;
    return combinations;
}

jolts.sort((a, b) => { 
    return (a - b); 
});
jolts.splice(0, 0, 0);
let joltDiff = getJoltDifferences(jolts);
let part1 = joltDiff['1'] * joltDiff['3'];
let allCombinations = getAllCombinations(jolts, 0, {});

console.log(`Answer part 1: ${part1}`);
console.log(`Answer part 2: ${allCombinations}`);