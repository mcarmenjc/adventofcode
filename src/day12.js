//day 12
import {readFileSync} from 'fs';

function partOne(initialState, rules){
    console.log('The year 518 is significantly more underground than your history books implied. Either that, or you\'ve arrived in a vast cavern network under the North Pole.');
    console.log('After exploring a little, you discover a long tunnel that contains a row of small pots as far as you can see to your left and right. A few of them contain plants - someone is trying to grow things in these geothermally-heated caves.');
    console.log('The pots are numbered, with 0 in front of you. To the left, the pots are numbered -1, -2, -3, and so on; to the right, 1, 2, 3.... Your puzzle input contains a list of pots from 0 to the right and whether they do (#) or do not (.) currently contain a plant, the initial state. (No other pots currently contain plants.) For example, an initial state of #..##.... indicates that pots 0, 3, and 4 currently contain plants.');
    console.log('Your puzzle input also contains some notes you find on a nearby table: someone has been trying to figure out how these plants spread to nearby pots. Based on the notes, for each generation of plants, a given pot has or does not have a plant based on whether that pot (and the two pots on either side of it) had a plant in the last generation. These are written as LLCRR => N, where L are pots to the left, C is the current pot being considered, R are the pots to the right, and N is whether the current pot will have a plant in the next generation. For example:');
    console.log('A note like ..#.. => . means that a pot that contains a plant but with no plants within two pots of it will not have a plant in it during the next generation.');
    console.log('A note like ##.## => . means that an empty pot with two plants on each side of it will remain empty in the next generation.');
    console.log('A note like .##.# => # means that a pot has a plant in a given generation if, in the previous generation, there were plants in that pot, the one immediately to the left, and the one two pots to the right, but not in the ones immediately to the right and two to the left.');
    console.log('It\'s not clear what these plants are for, but you\'re sure it\'s important, so you\'d like to make sure the current configuration of plants is sustainable by determining what will happen after 20 generations.');
    console.log('For example, given the following input:');
    console.log('initial state: #..#.#..##......###...###');
    console.log('...## => #');
    console.log('..#.. => #');
    console.log('.#... => #');
    console.log('.#.#. => #');
    console.log('.#.## => #');
    console.log('.##.. => #');
    console.log('.#### => #');
    console.log('#.#.# => #');
    console.log('#.### => #');
    console.log('##.#. => #');
    console.log('##.## => #');
    console.log('###.. => #');
    console.log('###.# => #');
    console.log('####. => #');
    console.log('For brevity, in this example, only the combinations which do produce a plant are listed. (Your input includes all possible combinations.) Then, the next 20 generations will look like this:');
    console.log('                 1         2         3     ');
    console.log('       0         0         0         0     ');
    console.log(' 0: ...#..#.#..##......###...###...........');
    console.log(' 1: ...#...#....#.....#..#..#..#...........');
    console.log(' 2: ...##..##...##....#..#..#..##..........');
    console.log(' 3: ..#.#...#..#.#....#..#..#...#..........');
    console.log(' 4: ...#.#..#...#.#...#..#..##..##.........');
    console.log(' 5: ....#...##...#.#..#..#...#...#.........');
    console.log(' 6: ....##.#.#....#...#..##..##..##........');
    console.log(' 7: ...#..###.#...##..#...#...#...#........');
    console.log(' 8: ...#....##.#.#.#..##..##..##..##.......');
    console.log(' 9: ...##..#..#####....#...#...#...#.......');
    console.log('10: ..#.#..#...#.##....##..##..##..##......');
    console.log('11: ...#...##...#.#...#.#...#...#...#......');
    console.log('12: ...##.#.#....#.#...#.#..##..##..##.....');
    console.log('13: ..#..###.#....#.#...#....#...#...#.....');
    console.log('14: ..#....##.#....#.#..##...##..##..##....');
    console.log('15: ..##..#..#.#....#....#..#.#...#...#....');
    console.log('16: .#.#..#...#.#...##...#...#.#..##..##...');
    console.log('17: ..#...##...#.#.#.#...##...#....#...#...');
    console.log('18: ..##.#.#....#####.#.#.#...##...##..##..');
    console.log('19: .#..###.#..#.#.#######.#.#.#..#.#...#..');
    console.log('20: .#....##....#####...#######....#.#..##.');
    console.log('The generation is shown along the left, where 0 is the initial state. The pot numbers are shown along the top, where 0 labels the center pot, negative-numbered pots extend to the left, and positive pots extend toward the right. Remember, the initial state begins at pot 0, which is not the leftmost pot used in this example.');
    console.log('After one generation, only seven plants remain. The one in pot 0 matched the rule looking for ..#.., the one in pot 4 matched the rule looking for .#.#., pot 9 matched .##.., and so on.');
    console.log('In this example, after 20 generations, the pots shown as # contain plants, the furthest left of which is pot -2, and the furthest right of which is pot 34. Adding up all the numbers of plant-containing pots after the 20th generation produces 325.');
    console.log('After 20 generations, what is the sum of the numbers of all pots which contain a plant?');
    console.log('-----------------------------------');
    console.log('Your puzzle answer was  ' + calculateProductionOfThePlantContainingPotsAfter20Generations(initialState, rules));
    console.log('-----------------------------------');
}

function calculateProductionOfThePlantContainingPotsAfter20Generations(initialState, rules){
    let numSteps = 20;
    let numInitialPots = initialState.length;
    let finalGeneration = calculateGenerationAfterXSteps(initialState, rules, numSteps);
    let production = calculateProductionValue(finalGeneration, numInitialPots);
    return production;
}

function calculateProductionValue(generation, initialGenerationLength){
    let value = 0;
    let offset = Math.floor((generation.length - initialGenerationLength) / 2);
    for (let i =0; i < generation.length; i++){
        if(generation[i] === '#'){
            value += (i - offset);
        }
    }
    return value;
}

function calculateGenerationAfterXSteps(initialState, rules, numSteps){
    let currentState = initialState;
    for (let i = 0; i < numSteps; i++){
        let nextState = getNextGeneration(currentState, rules);
        currentState = nextState;
    }
    return currentState;
}

function getNextGeneration(initialState, rules){
    let nextState = '';
    let currentState = '....' + initialState + '....';
    
    for (let i = 2; i < currentState.length - 2; i++){
        let pots = currentState.slice(i-2, i+3);
        if(rules.hasOwnProperty(pots)){
            nextState += rules[pots];
        }
        else{
            nextState += '.';
        }
    }
    return nextState;
}


function partTwo(initialState, rules){
    console.log('--- Part Two ---');
    console.log('You realize that 20 generations aren\'t enough. After all, these plants will need to last another 1500 years to even reach your timeline, not to mention your future.');
    console.log('After fifty billion (50000000000) generations, what is the sum of the numbers of all pots which contain a plant?');
    console.log('-----------------------------------');
    console.log('Your puzzle answer was  ' + calculateProductionOfThePlantContainingPotsAfter50BGenerations(initialState, rules));
    console.log('-----------------------------------');
}

function calculateProductionOfThePlantContainingPotsAfter50BGenerations(initialState, rules){
    let numSteps = 50000000000;
    let production = calculateProductionForManyManyGenerations(initialState, rules, numSteps);
    return production;
}

function calculateProductionForManyManyGenerations(initialState, rules, stepsToFuture){
    let diffs = [];
    let currentState = initialState;
    let prevValue = calculateProductionValue(initialState, initialStateLength);
    let numSteps = 1000;
    let initialStateLength = initialState.length;
    for (let i = 0; i < numSteps; i++){
        let nextState = getNextGeneration(currentState, rules);
        currentState = nextState;
        let currentValue = calculateProductionValue(currentState, initialStateLength);
        diffs.push(currentValue - prevValue);
        if (diffs.length > 100){
            diffs.shift();
        }
        prevValue = currentValue;
    }
    
    let diffSum = 0;
    diffs.forEach(d => {
        diffSum += d;
    });

    diffSum = Math.floor(diffSum/diffs.length);
    let production = (stepsToFuture - numSteps) * diffSum + calculateProductionValue(currentState, initialStateLength);
    return production;
}

function day12(){
    console.log("--- Day 12: Subterranean Sustainability ---");
    let {initialState, rules} = readInitialStateAndRules();
    partOne(initialState, rules);
    partTwo(initialState, rules);
    console.log('\n\n');
}

function readInitialStateAndRules(){
    let fileContent = readFileSync('resources/day12_input.txt', 'utf8');
    let initialStateRegex = /initial state: ([#|\.]+)/;
    let rulesRegex = /([#|\.]{5}) => ([#|\.])/;
    let initialState = '';
    let rules = {};
    fileContent.split('\n').forEach(line => {
        if(initialStateRegex.test(line)){
            let result = line.match(initialStateRegex);
            initialState = result[1];
        }
        if(rulesRegex.test(line)){
            let result = line.match(rulesRegex);
            rules[result[1]] = result[2];
        }
    });
    return {'initialState': initialState, 'rules': rules};
}

export { day12, getNextGeneration, calculateGenerationAfterXSteps, calculateProductionValue };