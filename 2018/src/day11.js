//day 07
import {readFileSync} from 'fs';

let Star = class {
    constructor(x, y, vx, vy){
        this.x = x,
        this.y = y;
        this.vx = vx;
        this.vy = vy;
    }

    move(){
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
    }

    moveBack(){
        this.x = this.x - this.vx;
        this.y = this.y - this.vy;
    }

    print(){
        console.log('position => (' + this.x + ', ' + this.y + ') \t speed => (' + this.vx + ', ' + this.vy + ')');
    }
}

function partOne(gridSerialNumber){
    console.log('You watch the Elves and their sleigh fade into the distance as they head toward the North Pole.');
    console.log('Actually, you\'re the one fading. The falling sensation returns.');
    console.log('The low fuel warning light is illuminated on your wrist-mounted device. Tapping it once causes it to project a hologram of the situation: a 300x300 grid of fuel cells and their current power levels, some negative. You\'re not sure what negative power means in the context of time travel, but it can\'t be good.');
    console.log('Each fuel cell has a coordinate ranging from 1 to 300 in both the X (horizontal) and Y (vertical) direction. In X,Y notation, the top-left cell is 1,1, and the top-right cell is 300,1.');
    console.log('The interface lets you select any 3x3 square of fuel cells. To increase your chances of getting to your destination, you decide to choose the 3x3 square with the largest total power.');
    console.log('The power level in a given fuel cell can be found through the following process:');
    console.log('Find the fuel cell\'s rack ID, which is its X coordinate plus 10.');
    console.log('Begin with a power level of the rack ID times the Y coordinate.');
    console.log('Increase the power level by the value of the grid serial number (your puzzle input).');
    console.log('Set the power level to itself multiplied by the rack ID.');
    console.log('Keep only the hundreds digit of the power level (so 12345 becomes 3; numbers with no hundreds digit become 0).');
    console.log('Subtract 5 from the power level.');
    console.log('For example, to find the power level of the fuel cell at 3,5 in a grid with serial number 8:');
    console.log('The rack ID is 3 + 10 = 13.');
    console.log('The power level starts at 13 * 5 = 65.');
    console.log('Adding the serial number produces 65 + 8 = 73.');
    console.log('Multiplying by the rack ID produces 73 * 13 = 949.');
    console.log('The hundreds digit of 949 is 9.');
    console.log('Subtracting 5 produces 9 - 5 = 4.');
    console.log('So, the power level of this fuel cell is 4.');
    console.log('Here are some more example power levels:');
    console.log('Fuel cell at  122,79, grid serial number 57: power level -5.');
    console.log('Fuel cell at 217,196, grid serial number 39: power level  0.');
    console.log('Fuel cell at 101,153, grid serial number 71: power level  4.');
    console.log('Your goal is to find the 3x3 square which has the largest total power. The square must be entirely within the 300x300 grid. Identify this square using the X,Y coordinate of its top-left fuel cell. For example:');
    console.log('For grid serial number 18, the largest total 3x3 square has a top-left corner of 33,45 (with a total power of 29); these fuel cells appear in the middle of this 5x5 region:');
    console.log('-2  -4   4   4   4');
    console.log('-4   4   4   4  -5');
    console.log(' 4   3   3   4  -4');
    console.log(' 1   1   2   4  -3');
    console.log('-1   0   2  -5  -2');
    console.log('For grid serial number 42, the largest 3x3 square\'s top-left is 21,61 (with a total power of 30); they are in the middle of this region:');
    console.log('-3   4   2   2   2');
    console.log('-4   4   3   3   4');
    console.log('-5   3   3   4  -4');
    console.log(' 4   3   3   4  -3');
    console.log(' 3   3   3  -5  -1');
    console.log('What is the X,Y coordinate of the top-left fuel cell of the 3x3 square with the largest total power?');
    console.log('Your puzzle input is 3999.');
    console.log('-----------------------------------');
    console.log('Your puzzle answer was  ' + findLargestTotalPowerFor3SizeSquares(gridSerialNumber));
    console.log('-----------------------------------');
}

function findLargestTotalPowerFor3SizeSquares(gridSerialNumber){
    let grid = fillPowerGrid(gridSerialNumber);
    let sumTable = calculateSumTable(grid);
    let coords = findRegionWithLargestTotalPowerForSquareSize(sumTable, 3);
    return coords.x + ',' + coords.y
}

function fillPowerGrid(gridSerialNumber){
    let size = 300;
    let grid = new Array(size);
    for(let i = 0; i < size; i ++){
        grid[i] = new Array(size);
        for (let j = 0; j < size; j++){
            grid[i][j]= calculatePowerForCell(i+1, j+1, gridSerialNumber);
        }
    }
    return grid;
}

function calculatePowerForCell(x, y, gridSerialNumber){
    let rackId = x + 10;
    let startingPowerLevel = (rackId * y + gridSerialNumber) * rackId;
    let powerDecimal = Math.floor(startingPowerLevel / 100) % 10;
    let powerLevel = powerDecimal - 5;
    return powerLevel;
}

function findRegionWithLargestTotalPowerForSquareSize(sumTable, squareSize){
    let maxPower = 0;
    let x = 0;
    let y = 0;

    for (let i = 0; i < sumTable.length; i++){
        for (let j = 0; j < sumTable[i].length ; j++){
            let power = 0;
            if (i + squareSize - 1 < sumTable.length && j + squareSize - 1 < sumTable[i].length){
                power += sumTable[i+squareSize-1][j+squareSize-1];
                if (i - 1 >= 0){
                    power -= sumTable[i-1][j+squareSize-1];
                }
                if(j - 1 >= 0){
                    power -= sumTable[i+squareSize-1][j-1];
                }
                if(i - 1 >= 0 && j - 1 >= 0){
                    power += sumTable[i-1][j-1];
                }
            }

            if(power > maxPower){
                maxPower = power;
                x = i + 1;
                y = j + 1;
            }
        }
    }

    return {
        'x': x, 
        'y': y,
        'power' : maxPower};
}

function calculateSumTable(grid){
    let sumTable = new Array(grid.length);
    for(let i = 0; i < grid.length; i++){
        sumTable[i] = new Array(grid[i].length);
        for(let j = 0; j < grid[i].length; j++){
            sumTable[i][j] = grid[i][j];
            if(i-1 >= 0){
                sumTable[i][j] += sumTable[i-1][j];
            }
            if(j-1 >= 0){
                sumTable[i][j] += sumTable[i][j-1];
            }
            if(i-1 >= 0 && j-1 >= 0){
                sumTable[i][j] -= sumTable[i-1][j-1];
            }
        }
    }
    return sumTable;
}

function partTwo(gridSerialNumber){
    console.log('--- Part Two ---');
    console.log('You discover a dial on the side of the device; it seems to let you select a square of any size, not just 3x3. Sizes from 1x1 to 300x300 are supported.');
    console.log('Realizing this, you now must find the square of any size with the largest total power. Identify this square by including its size as a third parameter after the top-left coordinate: a 9x9 square with a top-left corner of 3,5 is identified as 3,5,9.');
    console.log('For example:');
    console.log('For grid serial number 18, the largest total square (with a total power of 113) is 16x16 and has a top-left corner of 90,269, so its identifier is 90,269,16.');
    console.log('For grid serial number 42, the largest total square (with a total power of 119) is 12x12 and has a top-left corner of 232,251, so its identifier is 232,251,12.');
    console.log('What is the X,Y,size identifier of the square with the largest total power?');
    console.log('-----------------------------------');
    console.log("Your puzzle answer was  " + findRegionWithLargestTotalPower(gridSerialNumber));
    console.log('-----------------------------------');
}

function findRegionWithLargestTotalPower(gridSerialNumber){
    let grid = fillPowerGrid(gridSerialNumber);
    let sumTable = calculateSumTable(grid);
    let x;
    let y;
    let size = 0;
    let maxPower = 0;

    for (let k = 1; k <= grid.length; k++){
        let region = findRegionWithLargestTotalPowerForSquareSize(sumTable, k)

        if(region.power > maxPower){
            maxPower = region.power;
            x = region.x;
            y = region.y;
            size = k;
        }
    
    }

    return x + ',' + y + ',' + size;
}

function day11(){
    console.log("--- Day 11: Chronal Charge ---");
    let gridSerialNumber = 3999;
    partOne(gridSerialNumber);
    partTwo(gridSerialNumber);
    console.log('\n\n');
}

export { day11, fillPowerGrid, findRegionWithLargestTotalPowerForSquareSize, calculatePowerForCell, findRegionWithLargestTotalPower, calculateSumTable };