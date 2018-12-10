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

function partOne(stars){
    console.log('It\'s no use; your navigation system simply isn\'t capable of providing walking directions in the arctic circle, and certainly not in 1018.');
    console.log('The Elves suggest an alternative. In times like these, North Pole rescue operations will arrange points of light in the sky to guide missing Elves back to base. Unfortunately, the message is easy to miss: the points move slowly enough that it takes hours to align them, but have so much momentum that they only stay aligned for a second. If you blink at the wrong time, it might be hours before another message appears.');
    console.log('You can see these points of light floating in the distance, and record their position in the sky and their velocity, the relative change in position per second (your puzzle input). The coordinates are all given from your perspective; given enough time, those positions and velocities will move the points into a cohesive message!');
    console.log('Rather than wait, you decide to fast-forward the process and calculate what the points will eventually spell.');
    console.log('For example, suppose you note the following points:');
    console.log('position=< 9,  1> velocity=< 0,  2>');
    console.log('position=< 7,  0> velocity=<-1,  0>');
    console.log('position=< 3, -2> velocity=<-1,  1>');
    console.log('position=< 6, 10> velocity=<-2, -1>');
    console.log('position=< 2, -4> velocity=< 2,  2>');
    console.log('position=<-6, 10> velocity=< 2, -2>');
    console.log('position=< 1,  8> velocity=< 1, -1>');
    console.log('position=< 1,  7> velocity=< 1,  0>');
    console.log('position=<-3, 11> velocity=< 1, -2>');
    console.log('position=< 7,  6> velocity=<-1, -1>');
    console.log('position=<-2,  3> velocity=< 1,  0>');
    console.log('position=<-4,  3> velocity=< 2,  0>');
    console.log('position=<10, -3> velocity=<-1,  1>');
    console.log('position=< 5, 11> velocity=< 1, -2>');
    console.log('position=< 4,  7> velocity=< 0, -1>');
    console.log('position=< 8, -2> velocity=< 0,  1>');
    console.log('position=<15,  0> velocity=<-2,  0>');
    console.log('position=< 1,  6> velocity=< 1,  0>');
    console.log('position=< 8,  9> velocity=< 0, -1>');
    console.log('position=< 3,  3> velocity=<-1,  1>');
    console.log('position=< 0,  5> velocity=< 0, -1>');
    console.log('position=<-2,  2> velocity=< 2,  0>');
    console.log('position=< 5, -2> velocity=< 1,  2>');
    console.log('position=< 1,  4> velocity=< 2,  1>');
    console.log('position=<-2,  7> velocity=< 2, -2>');
    console.log('position=< 3,  6> velocity=<-1, -1>');
    console.log('position=< 5,  0> velocity=< 1,  0>');
    console.log('position=<-6,  0> velocity=< 2,  0>');
    console.log('position=< 5,  9> velocity=< 1, -2>');
    console.log('position=<14,  7> velocity=<-2,  0>');
    console.log('position=<-3,  6> velocity=< 2, -1>');
    console.log('Each line represents one point. Positions are given as <X, Y> pairs: X represents how far left (negative) or right (positive) the point appears, while Y represents how far up (negative) or down (positive) the point appears.');
    console.log('At 0 seconds, each point has the position given. Each second, each point\'s velocity is added to its position. So, a point with velocity <1, -2> is moving to the right, but is moving upward twice as quickly. If this point\'s initial position were <3, 9>, after 3 seconds, its position would become <6, 3>.');
    console.log('Over time, the points listed above would move like this:');
    console.log('Initially:');
    console.log('........#.............');
    console.log('................#.....');
    console.log('.........#.#..#.......');
    console.log('......................');
    console.log('#..........#.#.......#');
    console.log('...............#......');
    console.log('....#.................');
    console.log('..#.#....#............');
    console.log('.......#..............');
    console.log('......#...............');
    console.log('...#...#.#...#........');
    console.log('....#..#..#.........#.');
    console.log('.......#..............');
    console.log('...........#..#.......');
    console.log('#...........#.........');
    console.log('...#.......#..........');
    console.log('After 1 second:');
    console.log('......................');
    console.log('......................');
    console.log('..........#....#......');
    console.log('........#.....#.......');
    console.log('..#.........#......#..');
    console.log('......................');
    console.log('......#...............');
    console.log('....##.........#......');
    console.log('......#.#.............');
    console.log('.....##.##..#.........');
    console.log('........#.#...........');
    console.log('........#...#.....#...');
    console.log('..#...........#.......');
    console.log('....#.....#.#.........');
    console.log('......................');
    console.log('......................');
    console.log('After 2 seconds:');
    console.log('......................');
    console.log('......................');
    console.log('......................');
    console.log('..............#.......');
    console.log('....#..#...####..#....');
    console.log('......................');
    console.log('........#....#........');
    console.log('......#.#.............');
    console.log('.......#...#..........');
    console.log('.......#..#..#.#......');
    console.log('....#....#.#..........');
    console.log('.....#...#...##.#.....');
    console.log('........#.............');
    console.log('......................');
    console.log('......................');
    console.log('......................');
    console.log('After 3 seconds:');
    console.log('......................');
    console.log('......................');
    console.log('......................');
    console.log('......................');
    console.log('......#...#..###......');
    console.log('......#...#...#.......');
    console.log('......#...#...#.......');
    console.log('......#####...#.......');
    console.log('......#...#...#.......');
    console.log('......#...#...#.......');
    console.log('......#...#...#.......');
    console.log('......#...#..###......');
    console.log('......................');
    console.log('......................');
    console.log('......................');
    console.log('......................');
    console.log('After 4 seconds:');
    console.log('......................');
    console.log('......................');
    console.log('......................');
    console.log('............#.........');
    console.log('........##...#.#......');
    console.log('......#.....#..#......');
    console.log('.....#..##.##.#.......');
    console.log('.......##.#....#......');
    console.log('...........#....#.....');
    console.log('..............#.......');
    console.log('....#......#...#......');
    console.log('.....#.....##.........');
    console.log('...............#......');
    console.log('...............#......');
    console.log('......................');
    console.log('......................');
    console.log('After 3 seconds, the message appeared briefly: HI. Of course, your message will be much longer and will take many more seconds to appear.');
    console.log('What message will eventually appear in the sky?');
    console.log('-----------------------------------');
    console.log('Your puzzle answer was  ');
    discoverMessageInStars(stars);
    let text = drawText(stars);
    text.forEach(row => {
        console.log(row.join(''));
    });
    console.log('-----------------------------------');
}

function discoverMessageInStars(stars){
    let seconds = 0;
    let prevHeight = calculateHeight(stars);
    let prevWidth = calculateWidth(stars);
    let height = prevHeight;
    let width = prevWidth;

    do{
        prevHeight = height;
        prevWidth = width;
        seconds ++;
        moveStars(stars);
        height = calculateHeight(stars);
        width = calculateWidth(stars);
    }while(prevHeight > height || prevWidth > width);

    moveBack(stars);
    seconds --;

    return seconds;
}

function drawText(stars){
    let height = calculateHeight(stars);
    let width = calculateWidth(stars);
    let xmin = findMinX(stars);
    let ymin = findMinY(stars);
    let grid = new Array(height);
    for(let i = 0; i < height; i++){
        grid[i] = new Array(width);
        grid[i].fill('.');
    }
    stars.forEach(s => {
        let row = s.y - ymin;
        let column = s.x - xmin;
        grid[row][column] = '#'
    });

    return grid;
}

function moveStars(stars){
    stars.forEach(star => {
        star.move();
    });
}

function moveBack(stars){
    stars.forEach(star => {
        star.moveBack();
    });
}

function calculateHeight(stars){
    let ymax = 0;
    let ymin = Number.MAX_SAFE_INTEGER;
    stars.forEach(s => {
        if(s.y > ymax){
            ymax = s.y;
        }
        if(s.y < ymin){
            ymin = s.y;
        }
    });

    return ymax - ymin + 1;
}

function calculateWidth(stars){
    let xmax = 0;
    let xmin = Number.MAX_SAFE_INTEGER;
    stars.forEach(s => {
        if(s.x > xmax){
            xmax = s.x;
        }
        if(s.x < xmin){
            xmin = s.x;
        }
    });

    return xmax - xmin + 1;
}

function findMinX(stars){
    let xmin = Number.MAX_SAFE_INTEGER;
    stars.forEach(s => {
        if(s.x < xmin){
            xmin = s.x;
        }
    });

    return xmin;
}

function findMinY(stars){
    let ymin = Number.MAX_SAFE_INTEGER;
    stars.forEach(s => {
        if(s.y < ymin){
            ymin = s.y;
        }
    });

    return ymin;
}

function partTwo(stars){
    console.log('--- Part Two ---');
    console.log('Good thing you didn\'t have to wait, because that would have taken a long time - much longer than the 3 seconds in the example above.');
    console.log('Impressed by your sub-hour communication capabilities, the Elves are curious: exactly how many seconds would they have needed to wait for that message to appear?');
    console.log('-----------------------------------');
    console.log("Your puzzle answer was  " + discoverMessageInStars(stars));
    console.log('-----------------------------------');
}

function calculateTimeSpentToCompleteAllSteps(start, numWorkers, taskTime){ 
    return 0;
}

function day10(){
    console.log("--- Day 10: The Stars Align ---");
    let stars = readPoints();
    partOne(stars);
    stars = readPoints();
    partTwo(stars);
    console.log('\n\n');
}

function readPoints(){
    let fileContent = readFileSync('resources/day10_input.txt', 'utf8');
    let regex = /position=<\s*(-?\d+),\s*(-?\d+)> velocity=<\s*(-?\d+),\s*(-?\d+)>/;
    let stars = [];
    fileContent.split('\n').forEach(line => {
        if(regex.test(line)){
            let result = line.match(regex);
            stars.push(new Star(parseInt(result[1]), parseInt(result[2]), parseInt(result[3]), parseInt(result[4])));
        }
    });
    return stars;
}

export { day10, Star, discoverMessageInStars, moveStars, drawText };