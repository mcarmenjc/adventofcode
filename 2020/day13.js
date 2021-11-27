import { day13 as input } from './input.js';

function processInput(input){
    let lines = input.split('\n');
    let departingTime = Number.parseInt(lines[0]);
    let buses = [];
    let busNumbers = lines[1].split(',');
    for(let busNo of busNumbers){
        if (busNo !== 'x'){
            buses.push(Number.parseInt(busNo));
        }
    }

    return {
        'departTime': departingTime,
        'busNo': buses
    };
}

function getEarliestBus(departTime, buses){
    let wait = Number.MAX_SAFE_INTEGER;
    let earliestBus = -1;

    for (let busNo of buses){
        
        if (departTime%busNo === 0){
            return {
                'earliestBus': busNo,
                'wait': 0
            };
        }

        let waitTimeForBus = ((Math.floor(departTime/busNo) + 1) * busNo) - departTime;
        if (wait > waitTimeForBus){
            wait = waitTimeForBus;
            earliestBus = busNo;
        }
    }

    return {
        'earliestBus': earliestBus,
        'wait': wait
    };
}

function getAllBusSchedules(input){
    let buses = (input.split('\n')[1]).split(',');
    let busSchedules = [];
    for (let i = 0; i < buses.length; i++){
        if(buses[i] !== 'x'){
            busSchedules.push({
                'busNo': Number.parseInt(buses[i]),
                'delay': i
            });
        }
    }
    return busSchedules;
}

function findEarliestTimeForSynchronizedBusArrivals(busSchedules) {
    busSchedules.sort((a, b) => b.busNo - a.busNo);
    
    let timeInc = busSchedules[0].busNo;
    let startTime = busSchedules[0].busNo - busSchedules[0].delay;

    for (let i = 1; i < busSchedules.length; i++){
        let remainder = (((busSchedules[i].busNo - busSchedules[i].delay) % busSchedules[i].busNo) + busSchedules[i].busNo) % busSchedules[i].busNo;
        
        while (startTime%busSchedules[i].busNo !== remainder){
            startTime += timeInc;
        }
        timeInc *= busSchedules[i].busNo;
    }

    return startTime;
}

let {departTime, busNo} = processInput(input);
let {earliestBus, wait} = getEarliestBus(departTime, busNo);

let testSch = `939
7,13,x,x,59,x,31,19`;
let busSchedules = getAllBusSchedules(input);
let startTime = findEarliestTimeForSynchronizedBusArrivals(busSchedules);

console.log(`Answer part 1: ${(earliestBus*wait)}`);
console.log(`Answer part 2: ${startTime}`);