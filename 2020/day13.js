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

let {departTime, busNo} = processInput(input);
let {earliestBus, wait} = getEarliestBus(departTime, busNo);

console.log(`Answer part 1: ${(earliestBus*wait)}`);
//console.log(`Answer part 2: ${distanceUsingWaypoint}`);