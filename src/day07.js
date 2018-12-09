//day 07
import {readFileSync} from 'fs';

let Step = class {
    constructor(id){
        this.id = id;
        this.children = [];
        this.parents = [];
        this.executed = false;
    }

    addChild(child) {
        this.children.push(child);
    }

    addParent(parent){
        this.parents.push(parent);
    }

    hasNoParents(){
        return this.parents.length === 0;
    }

    hasNoChildren(){
        return this.children.length === 0;
    }

    execute(){
        this.executed = true;
    }

    hasBeenExecuted(){
        return this.executed;
    }

    canBeExecuted(){
        let canExecute = true;
        this.parents.forEach(p => {
            canExecute = canExecute && p.hasBeenExecuted();
        });
        return canExecute;
    }

    print(){
        console.log('id => ' + this.id);
        console.log('children :');
        this.children.forEach(c => {console.log(c.id);});
        console.log('parents :');
        this.parents.forEach(c => {console.log(c.id);});
    }
}

function partOne(start){
    console.log('You find yourself standing on a snow-covered coastline; apparently, you landed a little off course. The region is too hilly to see the North Pole from here, but you do spot some Elves that seem to be trying to unpack something that washed ashore. It\'s quite cold out, so you decide to risk creating a paradox by asking them for directions.');
    console.log('"Oh, are you the search party?" Somehow, you can understand whatever Elves from the year 1018 speak; you assume it\'s Ancient Nordic Elvish. Could the device on your wrist also be a translator? "Those clothes don\'t look very warm; take this." They hand you a heavy coat.');
    console.log('"We do need to find our way back to the North Pole, but we have higher priorities at the moment. You see, believe it or not, this box contains something that will solve all of Santa\'s transportation problems - at least, that\'s what it looks like from the pictures in the instructions." It doesn\'t seem like they can read whatever language it\'s in, but you can: "Sleigh kit. Some assembly required."');
    console.log('"\'Sleigh\'? What a wonderful name! You must help us assemble this \'sleigh\' at once!" They start excitedly pulling more parts out of the box.');
    console.log('The instructions specify a series of steps and requirements about which steps must be finished before others can begin (your puzzle input). Each step is designated by a single letter. For example, suppose you have the following instructions:');
    console.log('Step C must be finished before step A can begin.');
    console.log('Step C must be finished before step F can begin.');
    console.log('Step A must be finished before step B can begin.');
    console.log('Step A must be finished before step D can begin.');
    console.log('Step B must be finished before step E can begin.');
    console.log('Step D must be finished before step E can begin.');
    console.log('Step F must be finished before step E can begin.');
    console.log('Visually, these requirements look like this:');
    console.log('  -->A--->B--');
    console.log(' /    \\      \\');
    console.log('C      -->D----->E');
    console.log(' \\           /');
    console.log('  ---->F-----');
    console.log('Your first goal is to determine the order in which the steps should be completed. If more than one step is ready, choose the step which is first alphabetically. In this example, the steps would be completed as follows:');
    console.log('Only C is available, and so it is done first.');
    console.log('Next, both A and F are available. A is first alphabetically, so it is done next.');
    console.log('Then, even though F was available earlier, steps B and D are now also available, and B is the first alphabetically of the three.');
    console.log('After that, only D and F are available. E is not available because only some of its prerequisites are complete. Therefore, D is completed next.');
    console.log('F is the only choice, so it is done next.');
    console.log('Finally, E is completed.');
    console.log('So, in this example, the correct order is CABDFE.');
    console.log('In what order should the steps in your instructions be completed?');
    console.log('-----------------------------------');
    console.log('Your puzzle answer was  ' + calculateStepOrder(start));
    console.log('-----------------------------------');
}

function calculateStepOrder(start){
    let stepsToExecute = [];
    let executedSteps = [];

    start.forEach(step => {
        stepsToExecute.push(step);
    });

    while(stepsToExecute.length > 0){
        stepsToExecute.sort(function(a, b) {
            return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
        });
        let currentStep = stepsToExecute.shift();
        currentStep.execute();
        currentStep.children.forEach(c => {
            if(c.canBeExecuted()){
                stepsToExecute.push(c);
            }
        });
        executedSteps.push(currentStep.id);
    }

    return executedSteps.join('');
}


function partTwo(points){
    console.log('--- Part Two ---');
    console.log('On the other hand, if the coordinates are safe, maybe the best you can do is try to find a region near as many coordinates as possible.');
    console.log('For example, suppose you want the sum of the Manhattan distance to all of the coordinates to be less than 32. For each location, add up the distances to all of the given coordinates; if the total of those distances is less than 32, that location is within the desired region. Using the same coordinates as above, the resulting region looks like this:');
    console.log('..........');
    console.log('.A........');
    console.log('..........');
    console.log('...###..C.');
    console.log('..#D###...');
    console.log('..###E#...');
    console.log('.B.###....');
    console.log('..........');
    console.log('..........');
    console.log('........F.');
    console.log('In particular, consider the highlighted location 4,3 located at the top middle of the region. Its calculation is as follows, where abs() is the absolute value function:');
    console.log('Distance to coordinate A: abs(4-1) + abs(3-1) =  5');
    console.log('Distance to coordinate B: abs(4-1) + abs(3-6) =  6');
    console.log('Distance to coordinate C: abs(4-8) + abs(3-3) =  4');
    console.log('Distance to coordinate D: abs(4-3) + abs(3-4) =  2');
    console.log('Distance to coordinate E: abs(4-5) + abs(3-5) =  3');
    console.log('Distance to coordinate F: abs(4-8) + abs(3-9) = 10');
    console.log('Total distance: 5 + 6 + 4 + 2 + 3 + 10 = 30');
    console.log('Because the total distance to all coordinates (30) is less than 32, the location is within the region.');
    console.log('This region, which also includes coordinates D and E, has a total size of 16.');
    console.log('Your actual region will need to be much larger than this example, though, instead including all locations with a total distance of less than 10000.');
    console.log('What is the size of the region containing all locations which have a total distance to all given coordinates of less than 10000?');
    console.log('-----------------------------------');
    console.log("Your puzzle answer was  " + calculateLongestRegionWithInDistance(points, 10000));
    console.log('-----------------------------------');
}

function calculateLongestRegionWithInDistance(points, maxDistance){
    return 0;
}

function day07(){
    console.log("--- Day 7: The Sum of Its Parts ---");
    let start = readInstructions();
    partOne(start);
    //partTwo(points); 
    console.log('\n\n');
}

function readInstructions(){
    let fileContent = readFileSync('resources/day07_input.txt', 'utf8');
    let instructions = {};
    let regex = /Step (\w) must be finished before step (\w) can begin./;
    fileContent.split('\n').forEach(line => {
        if(regex.test(line)){
            let result = line.match(regex);
            let parent = result[1];
            let child = result[2];
            if(!instructions.hasOwnProperty(parent)){
                let node = new Step(parent);
                instructions[parent] = node;
            }
            if(!instructions.hasOwnProperty(child)){
                let node = new Step(child);
                instructions[child] = node;
            }
            instructions[parent].addChild(instructions[child]);
            instructions[child].addParent(instructions[parent]);
        }
    });
    let initialInstructions = [];
    for (let nodeId in instructions){
        if (instructions[nodeId].hasNoParents()){
            initialInstructions.push(instructions[nodeId]);
        }
    }
    return initialInstructions;
}

export { day07, Step, calculateStepOrder };