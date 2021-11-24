import { day11 as seatPlan } from './input.js';

class SeatingArea {
    #seats = [];

    constructor(seatPlanStr){
        this.#seats = [];
        let seatRows = seatPlanStr.split('\n');

        for (let row of seatRows){
            this.#seats.push([]);
            let rowNo = this.#seats.length-1;

            for (let seat of row){
                this.#seats[rowNo].push(seat);
            }
        }
    }

    simulatePeopleSitting(){
        let currentState = [...this.#seats];
        let nextState = [...this.#seats];

        do {
            currentState = nextState;
            nextState = this.#seatPeople(currentState);
        } while (!this.#arePeopleStillMoving(currentState, nextState));

        return currentState;
    }

    simulateRelaxedWayOfPeopleSitting(){
        let currentState = [...this.#seats];
        let nextState = [...this.#seats];

        do {
            currentState = nextState;
            nextState = this.#seatRelaxedPeople(currentState);
        } while (!this.#arePeopleStillMoving(currentState, nextState));

        return currentState;
    }

    #arePeopleStillMoving(currentState, nextState){
        for (let i = 0; i < currentState.length; i++){
            for (let j = 0; j < currentState[i].length; j++){
                if (currentState[i][j] !== nextState[i][j]){
                    return false;
                }
            }
        }

        return true;
    }

    #seatPeople(currentState){
        let nextState = [];
        for (let i = 0; i < currentState.length; i++){
            nextState.push([]);
            for (let j = 0; j < currentState[i].length; j++){
                if(currentState[i][j] === '.'){
                    nextState[i].push('.');
                }
                else{
                    let numOccupiedAdjSeats = this.#getNumberOfOccupiedSeats(currentState, i, j);
                    nextState[i][j] = currentState[i][j];
                    if (currentState[i][j] === 'L' && numOccupiedAdjSeats === 0){
                        nextState[i][j] = '#';
                    }
                    if (currentState[i][j] === '#' && numOccupiedAdjSeats >= 4){
                        nextState[i][j] = 'L';
                    }
                }
            }
        }

        return nextState;
    }

    #getNumberOfOccupiedSeats(state, row, col){
        let adjacentPositions = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
        let numOccupied = 0;

        for (var pos of adjacentPositions){
            let newRow = row + pos[0];
            let newCol = col + pos[1]
            if (newRow >= 0 && newRow < state.length && newCol >= 0 && newCol < state[row].length){
                if (state[newRow][newCol] === '#'){
                    numOccupied ++;
                }
            }
        }

        return numOccupied;
    }

    #seatRelaxedPeople(currentState){
        let nextState = [];
        for (let i = 0; i < currentState.length; i++){
            nextState.push([]);
            for (let j = 0; j < currentState[i].length; j++){
                if(currentState[i][j] === '.'){
                    nextState[i].push('.');
                }
                else{
                    let numOccupiedAdjSeats = this.#getNumberOfSeenOccupiedSeats(currentState, i, j);
                    nextState[i][j] = currentState[i][j];
                    if (currentState[i][j] === 'L' && numOccupiedAdjSeats === 0){
                        nextState[i][j] = '#';
                    }
                    if (currentState[i][j] === '#' && numOccupiedAdjSeats >= 5){
                        nextState[i][j] = 'L';
                    }
                }
            }
        }

        return nextState;
    }

    #getNumberOfSeenOccupiedSeats(state, row, col){
        let adjacentPositions = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
        let numOccupied = 0;

        for (var pos of adjacentPositions){
            let newRow = row + pos[0];
            let newCol = col + pos[1]

            while (newRow >= 0 && newRow < state.length && newCol >= 0 && newCol < state[row].length && state[newRow][newCol] === '.'){
                newRow = newRow + pos[0];
                newCol = newCol + pos[1]
            }

            if (newRow >= 0 && newRow < state.length && newCol >= 0 && newCol < state[row].length){
                if (state[newRow][newCol] === '#'){
                    numOccupied ++;
                }
            }
        }

        return numOccupied;
    }
}

let seatArea = new SeatingArea(seatPlan);
let finalSeatPlan = seatArea.simulatePeopleSitting();
let relaxedFinalSeatPlan = seatArea.simulateRelaxedWayOfPeopleSitting();

let numOccupiedSeats = 0;
let numRelaxedOccupiedSeats = 0;
for (let i = 0; i < finalSeatPlan.length; i++){
    for (let j = 0; j < finalSeatPlan[i].length; j++){
        if (finalSeatPlan[i][j] === '#'){
            numOccupiedSeats ++;
        }
        if (relaxedFinalSeatPlan[i][j] === '#'){
            numRelaxedOccupiedSeats ++;
        }
    }
}

console.log(`Answer part 1: ${numOccupiedSeats}`);
console.log(`Answer part 2: ${numRelaxedOccupiedSeats}`);