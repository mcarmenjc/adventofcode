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

let Worker = class {
    constructor(){
        this.step = undefined;
        this.workingTime = 0;
    }

    work(){
        this.workingTime --;
    }

    setTask(step){
        this.step = step;
    }

    calculateWorkingTime(taskBaseTime){
        this.workingTime = taskBaseTime + (this.step.id.charCodeAt(0) - 'A'.charCodeAt(0) + 1);
    }

    isWorking(){
        return this.step !== undefined;
    }

    hasFinished(){
        return this.workingTime === 0;
    }

    finishTask(){
        this.step.execute();
        this.step = undefined;
        this.workingTime = 0;
    }

    print(){
        console.log('Worker is working on task ' + this.step.id + ' for ' + this.workingTime + 's');
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


function partTwo(start){
    let workers = 5;
    let taskTime = 60;
    console.log('--- Part Two ---');
    console.log('As you\'re about to begin construction, four of the Elves offer to help. "The sun will set soon; it\'ll go faster if we work together." Now, you need to account for multiple people working on steps simultaneously. If multiple steps are available, workers should still begin them in alphabetical order.');
    console.log('Each step takes 60 seconds plus an amount corresponding to its letter: A=1, B=2, C=3, and so on. So, step A takes 60+1=61 seconds, while step Z takes 60+26=86 seconds. No time is required between steps.');
    console.log('To simplify things for the example, however, suppose you only have help from one Elf (a total of two workers) and that each step takes 60 fewer seconds (so that step A takes 1 second and step Z takes 26 seconds). Then, using the same instructions as above, this is how each second would be spent:');
    console.log('Second   Worker 1   Worker 2   Done');
    console.log('   0        C          .        ');
    console.log('   1        C          .        ');
    console.log('   2        C          .        ');
    console.log('   3        A          F       C');
    console.log('   4        B          F       CA');
    console.log('   5        B          F       CA');
    console.log('   6        D          F       CAB');
    console.log('   7        D          F       CAB');
    console.log('   8        D          F       CAB');
    console.log('   9        D          .       CABF');
    console.log('  10        E          .       CABFD');
    console.log('  11        E          .       CABFD');
    console.log('  12        E          .       CABFD');
    console.log('  13        E          .       CABFD');
    console.log('  14        E          .       CABFD');
    console.log('  15        .          .       CABFDE');
    console.log('Each row represents one second of time. The Second column identifies how many seconds have passed as of the beginning of that second. Each worker column shows the step that worker is currently doing (or . if they are idle). The Done column shows completed steps.');
    console.log('Note that the order of the steps has changed; this is because steps now take time to finish and multiple workers can begin multiple steps simultaneously.');
    console.log('In this example, it would take 15 seconds for two workers to complete these steps.');
    console.log('With 5 workers and the 60+ second step durations described above, how long will it take to complete all of the steps?');
    console.log('-----------------------------------');
    console.log("Your puzzle answer was  " + calculateTimeSpentToCompleteAllSteps(start, workers, taskTime));
    console.log('-----------------------------------');
}

function calculateTimeSpentToCompleteAllSteps(start, numWorkers, taskTime){ 
    let workers = new Array(numWorkers);
    for(let i = 0; i < numWorkers; i++){
        workers[i] = new Worker();
    }
    let time = 0;
    let stepsToExecute = [];

    start.forEach(step => {
        stepsToExecute.push(step);
    });

    let inProgress = false;

    while(stepsToExecute.length > 0 || inProgress){
        time ++;
        stepsToExecute.sort(function(a, b) {
            return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
        });

        workers.forEach(w => {
            if(!w.isWorking() && stepsToExecute.length > 0){
                let step = stepsToExecute.shift();
                w.setTask(step);
                w.calculateWorkingTime(taskTime);
            }
        });

        inProgress = false;
        workers.forEach(w => {
            if(w.isWorking()){
                w.work();
                if(w.hasFinished()){
                    let step = w.step;
                    w.finishTask();
                    step.children.forEach(c => {
                        if (c.canBeExecuted()){
                            stepsToExecute.push(c);
                        }
                    });
                }
            }
            if(w.isWorking()){
                inProgress = true;
            }
        });
    }
    return time;
}

function day07(){
    console.log("--- Day 7: The Sum of Its Parts ---");
    let start = readInstructions();
    partOne(start);
    let start2 = readInstructions();
    partTwo(start2); 
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

export { day07, Step, calculateStepOrder, calculateTimeSpentToCompleteAllSteps, Worker };