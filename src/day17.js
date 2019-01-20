//day 15
import {readFileSync} from 'fs';

let GroundSlice = class {
    constructor(rows, columns, xMin, xMax, yMin, yMax){
        this.rows = rows;
        this.columns = columns;
        this.ground = new Array(this.rows);
        this.xMin = xMin;
        this.xMax = xMax;
        this.yMin = yMin;
        this.yMax = yMax;
        for(let i = 0; i < this.rows; i++){
            this.ground[i] = new Array(this.columns);
            this.ground[i].fill('.');
        }
    }

    fillRowWithClay(row, fromColum, toColumn){
        for (let i = fromColum; i <= toColumn; i++){
            this.ground[row][i] = '#';
        }
    }

    fillColumnWithClay(column, fromRow, toRow){
        for (let i = fromRow; i <= toRow; i++){
            this.ground[i][column] = '#';
        }
    }

    flowWater(springWaterPosition){
        springWaterPosition.push('|');
        let waterFlowing = [springWaterPosition];

        while(waterFlowing.length > 0){
            let water = waterFlowing.shift();
            if((water[0] < 0 || water[0] >= this.ground.length) || (water[1] < 0 || water[1] >= this.ground[1].length)){
                break;
            }
            if(water[2] === '|'){
                waterFlowing.push(this.flowDown(water));
            }
            if(water[2] === '~'){
                this.flowHorizontally(water).forEach(w => {
                    waterFlowing.push(w);
                });
            }
        }
    }

    flowDown(water){
        if(this.ground[water[0]][water[1]] === '.'){
            this.ground[water[0]][water[1]] = water[2];
            return [water[0]+1, water[1], '|'];
        }
        if(this.ground[water[0]][water[1]] === '#' || this.ground[water[0]][water[1]] === '~'){
            return [water[0]-1, water[1], '~'];
        }

        return [water[0], water[1], undefined];
    }

    findLeftAndRightWaterBounds(water){
        let leftBound = -1;
        let rightBound = 1;
        while(this.ground[water[0]][water[1]+leftBound] !== '#' && 
            (this.ground[water[0]+1][water[1]+leftBound] === '#' || this.ground[water[0]+1][water[1]+leftBound] === '~')){
            leftBound --;
        }
        while(this.ground[water[0]][water[1]+rightBound] !== '#'  && 
            (this.ground[water[0]+1][water[1]+rightBound] === '#' || this.ground[water[0]+1][water[1]+rightBound] === '~')){
            rightBound ++;
        }

        return [leftBound, rightBound];
    }

    getWaterType(water, leftBound, rightBound){
        let waterType = '~';
        if(this.ground[water[0]][water[1]+rightBound] !== '#'){
            waterType = '|';
        }
        if(this.ground[water[0]][water[1]+leftBound] !== '#'){
            waterType = '|';
        }
        return waterType;
    }

    fillClayZoneWithWater(water, leftBound, rightBound, waterType){
        for(let i = leftBound + 1; i < rightBound; i++){
            this.ground[water[0]][water[1]+i] = waterType;
        }
    }

    flowHorizontally(water){
        let [leftBound, rightBound] = this.findLeftAndRightWaterBounds(water);
        let waterType = this.getWaterType(water, leftBound, rightBound);
        this.fillClayZoneWithWater(water, leftBound, rightBound, waterType);
        let flood = [];

        if(waterType === '|'){
            if(this.ground[water[0]][water[1]+rightBound] !== '#'){
                this.ground[water[0]][water[1]+rightBound] = waterType;
                flood.push([water[0]+1, water[1]+rightBound, '|']);
            }
            if(this.ground[water[0]][water[1]+leftBound] !== '#'){
                this.ground[water[0]][water[1]+leftBound] = waterType;
                flood.push([water[0]+1, water[1]+leftBound, '|']);
            }
        }
        else{
            flood.push([water[0]-1, water[1], '~']);
        }

        return flood;
    }

    countFlooded(){
        let flooded = 0;
        for(let i = this.yMin; i < this.ground.length; i++){
            for (let j = 0; j < this.ground[i].length; j++){
                if(this.ground[i][j] === '~' || this.ground[i][j] === '|'){
                    flooded++;
                }
            }
        }
        return flooded;
    }

    countNotDriedWater(){
        let water = 0;
        for(let i = this.yMin; i < this.ground.length; i++){
            for (let j = 0; j < this.ground[i].length; j++){
                if(this.ground[i][j] === '~'){
                    water++;
                }
            }
        }
        return water;
    }

    print(rows = this.rows){
        for(let i = 0; i < rows; i++){
            console.log(this.ground[i].slice(this.xMin-2).join(''));
        }
    }
}

function partOne(ground){
    console.log('You arrive in the year 18. If it weren\'t for the coat you got in 1018, you would be very cold: the North Pole base hasn\'t even been constructed.');
    console.log('Rather, it hasn\'t been constructed yet. The Elves are making a little progress, but there\'s not a lot of liquid water in this climate, so they\'re getting very dehydrated. Maybe there\'s more underground?');
    console.log('You scan a two-dimensional vertical slice of the ground nearby and discover that it is mostly sand with veins of clay. The scan only provides data with a granularity of square meters, but it should be good enough to determine how much water is trapped there. In the scan, x represents the distance to the right, and y represents the distance down. There is also a spring of water near the surface at x=500, y=0. The scan identifies which square meters are clay (your puzzle input).');
    console.log('For example, suppose your scan shows the following veins of clay:');
    console.log('x=495, y=2..7');
    console.log('y=7, x=495..501');
    console.log('x=501, y=3..7');
    console.log('x=498, y=2..4');
    console.log('x=506, y=1..2');
    console.log('x=498, y=10..13');
    console.log('x=504, y=10..13');
    console.log('y=13, x=498..504');
    console.log('Rendering clay as #, sand as ., and the water spring as +, and with x increasing to the right and y increasing downward, this becomes:');
    console.log('   44444455555555');
    console.log('   99999900000000');
    console.log('   45678901234567');
    console.log(' 0 ......+.......');
    console.log(' 1 ............#.');
    console.log(' 2 .#..#.......#.');
    console.log(' 3 .#..#..#......');
    console.log(' 4 .#..#..#......');
    console.log(' 5 .#.....#......');
    console.log(' 6 .#.....#......');
    console.log(' 7 .#######......');
    console.log(' 8 ..............');
    console.log(' 9 ..............');
    console.log('10 ....#.....#...');
    console.log('11 ....#.....#...');
    console.log('12 ....#.....#...');
    console.log('13 ....#######...');
    console.log('The spring of water will produce water forever. Water can move through sand, but is blocked by clay. Water always moves down when possible, and spreads to the left and right otherwise, filling space that has clay on both sides and falling out otherwise.');
    console.log('For example, if five squares of water are created, they will flow downward until they reach the clay and settle there. Water that has come to rest is shown here as ~, while sand through which water has passed (but which is now dry again) is shown as |:');
    console.log('......+.......');
    console.log('......|.....#.');
    console.log('.#..#.|.....#.');
    console.log('.#..#.|#......');
    console.log('.#..#.|#......');
    console.log('.#....|#......');
    console.log('.#~~~~~#......');
    console.log('.#######......');
    console.log('..............');
    console.log('..............');
    console.log('....#.....#...');
    console.log('....#.....#...');
    console.log('....#.....#...');
    console.log('....#######...');
    console.log('Two squares of water can\'t occupy the same location. If another five squares of water are created, they will settle on the first five, filling the clay reservoir a little more:');
    console.log('......+.......');
    console.log('......|.....#.');
    console.log('.#..#.|.....#.');
    console.log('.#..#.|#......');
    console.log('.#..#.|#......');
    console.log('.#~~~~~#......');
    console.log('.#~~~~~#......');
    console.log('.#######......');
    console.log('..............');
    console.log('..............');
    console.log('....#.....#...');
    console.log('....#.....#...');
    console.log('....#.....#...');
    console.log('....#######...');
    console.log('Water pressure does not apply in this scenario. If another four squares of water are created, they will stay on the right side of the barrier, and no water will reach the left side:');
    console.log('......+.......');
    console.log('......|.....#.');
    console.log('.#..#.|.....#.');
    console.log('.#..#~~#......');
    console.log('.#..#~~#......');
    console.log('.#~~~~~#......');
    console.log('.#~~~~~#......');
    console.log('.#######......');
    console.log('..............');
    console.log('..............');
    console.log('....#.....#...');
    console.log('....#.....#...');
    console.log('....#.....#...');
    console.log('....#######...');
    console.log('At this point, the top reservoir overflows. While water can reach the tiles above the surface of the water, it cannot settle there, and so the next five squares of water settle like this:');
    console.log('......+.......');
    console.log('......|.....#.');
    console.log('.#..#||||...#.');
    console.log('.#..#~~#|.....');
    console.log('.#..#~~#|.....');
    console.log('.#~~~~~#|.....');
    console.log('.#~~~~~#|.....');
    console.log('.#######|.....');
    console.log('........|.....');
    console.log('........|.....');
    console.log('....#...|.#...');
    console.log('....#...|.#...');
    console.log('....#~~~~~#...');
    console.log('....#######...');
    console.log('Note especially the leftmost |: the new squares of water can reach this tile, but cannot stop there. Instead, eventually, they all fall to the right and settle in the reservoir below.');
    console.log('After 10 more squares of water, the bottom reservoir is also full:');
    console.log('......+.......');
    console.log('......|.....#.');
    console.log('.#..#||||...#.');
    console.log('.#..#~~#|.....');
    console.log('.#..#~~#|.....');
    console.log('.#~~~~~#|.....');
    console.log('.#~~~~~#|.....');
    console.log('.#######|.....');
    console.log('........|.....');
    console.log('........|.....');
    console.log('....#~~~~~#...');
    console.log('....#~~~~~#...');
    console.log('....#~~~~~#...');
    console.log('....#######...');
    console.log('Finally, while there is nowhere left for the water to settle, it can reach a few more tiles before overflowing beyond the bottom of the scanned data:');
    console.log('......+.......    (line not counted: above minimum y value)');
    console.log('......|.....#.');
    console.log('.#..#||||...#.');
    console.log('.#..#~~#|.....');
    console.log('.#..#~~#|.....');
    console.log('.#~~~~~#|.....');
    console.log('.#~~~~~#|.....');
    console.log('.#######|.....');
    console.log('........|.....');
    console.log('...|||||||||..');
    console.log('...|#~~~~~#|..');
    console.log('...|#~~~~~#|..');
    console.log('...|#~~~~~#|..');
    console.log('...|#######|..');
    console.log('...|.......|..    (line not counted: below maximum y value)');
    console.log('...|.......|..    (line not counted: below maximum y value)');
    console.log('...|.......|..    (line not counted: below maximum y value)');
    console.log('How many tiles can be reached by the water? To prevent counting forever, ignore tiles with a y coordinate smaller than the smallest y coordinate in your scan data or larger than the largest one. Any x coordinate is valid. In this example, the lowest y coordinate given is 1, and the highest is 13, causing the water spring (in row 0) and the water falling off the bottom of the render (in rows 14 through infinity) to be ignored.');
    console.log('So, in the example above, counting both water at rest (~) and other sand tiles the water can hypothetically reach (|), the total number of tiles the water can reach is 57.');
    console.log('How many tiles can the water reach within the range of y values in your scan?');
    console.log('-----------------------------------');
    console.log('Your puzzle answer was  ' + ground.countFlooded());
    console.log('-----------------------------------');
}

function partTwo(ground){
    console.log('--- Part Two ---');
    console.log('After a very long time, the water spring will run dry. How much water will be retained?');
    console.log('In the example above, water that won\'t eventually drain out is shown as ~, a total of 29 tiles.');
    console.log('How many water tiles are left after the water spring stops producing water and all remaining water not at rest has drained?');
    console.log('-----------------------------------');
    console.log('Your puzzle answer was  ' + ground.countNotDriedWater());
    console.log('-----------------------------------');
}

function day17(){
    console.log('--- Day 17: Reservoir Research ---');
    let ground = readClayZones();
    ground.flowWater([0, 500]);
    partOne(ground);
    partTwo(ground);
    console.log('\n\n');
}

function readClayZones(){
    let fileContent = readFileSync('resources/day17_input.txt', 'utf8');
    let xYRegex = /x=(\d+), y=(\d+)..(\d+)/;
    let yXRegex = /y=(\d+), x=(\d+)..(\d+)/;
    let minX = undefined;
    let maxX = undefined;
    let maxY = undefined;
    let minY = undefined;
    fileContent.split('\n').forEach(line => {
        let xMin, xMax, yMin, yMax;
        if(xYRegex.test(line)){
            let result = line.match(xYRegex);
            xMin = parseInt(result[1]);
            yMin = parseInt(result[2]);
            yMax = parseInt(result[3]);
        }
        if(yXRegex.test(line)){
            let result = line.match(yXRegex);
            xMin = parseInt(result[2]);
            xMax = parseInt(result[3]);
            yMax = parseInt(result[1]);
            yMin = parseInt(result[1]);
        }

        if(minX === undefined || minX > xMin){
            minX = xMin;
        }

        if(maxX === undefined || maxX < xMax){
            maxX = xMax;
        }

        if(maxY === undefined || maxY < yMax){
            maxY = yMax;
        }

        if(minY === undefined || minY > yMin){
            minY = yMin;
        }
    });

    let groundWidth = maxX + 2;
    let groundHeight = maxY + 1;
    let ground = new GroundSlice(groundHeight, groundWidth, minX, maxX, minY, maxY);

    fileContent.split('\n').forEach(line => {
        if(xYRegex.test(line)){
            let result = line.match(xYRegex);
            ground.fillColumnWithClay(parseInt(result[1]), parseInt(result[2]), parseInt(result[3]));
        }
        if(yXRegex.test(line)){
            let result = line.match(yXRegex);
            ground.fillRowWithClay(parseInt(result[1]), parseInt(result[2]), parseInt(result[3]));
        }
    });

    return ground;
}

export { day17, GroundSlice };