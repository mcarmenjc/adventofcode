import { day12 as instructions } from './input.js';

class Ferry {
    #navigationInstructions = [];

    constructor(instructions){
        this.#navigationInstructions = [];
        for (let instruction of instructions){
            this.#navigationInstructions.push({
                'action': instruction[0],
                'value': Number.parseInt(instruction.substr(1))
            });
        }
    }

    navigate(){
        let position = [0, 0];
        let direction = 'E';
        let directions = {
            'E': [0, 1],
            'W': [0, -1],
            'N': [1, 0],
            'S': [-1, 0]
        };

        for (let instruction of this.#navigationInstructions){
            if (instruction.action === 'F'){
                position[0] += (directions[direction][0] * instruction.value);
                position[1] += (directions[direction][1] * instruction.value);
            }
            else {
                
                if (instruction.action === 'L' || instruction.action === 'R'){
                    direction = this.#rotate(instruction.action, instruction.value, direction);
                }
                else{
                    position[0] += (directions[instruction.action][0] * instruction.value);
                    position[1] += (directions[instruction.action][1] * instruction.value);
                }
            }
        }

        let manhattanDistance = Math.abs(position[0]) + Math.abs(position[1]);
        return manhattanDistance;
    }

    navigateWithWayPoint(){
        let waypoint = [1, 10];
        let position = [0, 0];
        let directions = {
            'E': [0, 1],
            'W': [0, -1],
            'N': [1, 0],
            'S': [-1, 0]
        };

        for (let instruction of this.#navigationInstructions){

            if (instruction.action === 'F'){
                position[0] += (waypoint[0] * instruction.value);
                position[1] += (waypoint[1] * instruction.value);
            }
            else {
                
                if (instruction.action === 'L' || instruction.action === 'R'){
                    let wayPointDirections = [
                        waypoint[0] < 0 ? 'S' : 'N', 
                        waypoint[1] < 0 ? 'W' : 'E'
                    ];
                    wayPointDirections = [
                        this.#rotate(instruction.action, instruction.value, wayPointDirections[0]), 
                        this.#rotate(instruction.action, instruction.value, wayPointDirections[1])
                    ];
                    waypoint[0] = Math.abs(waypoint[0]) * directions[wayPointDirections[0]][0] + Math.abs(waypoint[0]) * directions[wayPointDirections[0]][1];
                    waypoint[1] = Math.abs(waypoint[1]) * directions[wayPointDirections[1]][0] + Math.abs(waypoint[1]) * directions[wayPointDirections[1]][1];

                    if (wayPointDirections[0] === 'E' || wayPointDirections[0] === 'W'){
                        let aux = waypoint[0];
                        waypoint[0] = waypoint[1];
                        waypoint[1] = aux;
                    }
                }
                else{
                    waypoint[0] += (directions[instruction.action][0] * instruction.value);
                    waypoint[1] += (directions[instruction.action][1] * instruction.value);
                }
            }
        }

        let manhattanDistance = Math.abs(position[0]) + Math.abs(position[1]);
        return manhattanDistance;
    }

    #rotate(rotationDirection, degree, direction){
        let numChanges = degree/90;
        numChanges = rotationDirection === 'R' ? numChanges*(-1) : numChanges;
        let rotation = ['N', 'W', 'S', 'E'];
        let directionPos = rotation.indexOf(direction);
        let newDirectionPos = (((directionPos + numChanges) % rotation.length) + rotation.length) % rotation.length;
        return rotation[newDirectionPos];
    }
}

//['F10', 'N3', 'F7', 'R90', 'F11']
let ferry = new Ferry(instructions);
let distance = ferry.navigate();
let distanceUsingWaypoint = ferry.navigateWithWayPoint();

console.log(`Answer part 1: ${distance}`);
console.log(`Answer part 2: ${distanceUsingWaypoint}`);