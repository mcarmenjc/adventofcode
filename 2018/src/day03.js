//day 3
import {readFileSync} from 'fs';

let Claim = class {
    constructor(id, x, y, width, height){
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

function partOne(puzzle){
    console.log('The Elves managed to locate the chimney-squeeze prototype fabric for Santa\'s suit (thanks to someone who helpfully wrote its box IDs on the wall of the warehouse in the middle of the night). Unfortunately, anomalies are still affecting them - nobody can even agree on how to cut the fabric.');
    console.log('The whole piece of fabric they\'re working on is a very large square - at least 1000 inches on each side.');
    console.log('Each Elf has made a claim about which area of fabric would be ideal for Santa\'s suit. All claims have an ID and consist of a single rectangle with edges parallel to the edges of the fabric. Each claim\'s rectangle is defined as follows:');
    console.log('The number of inches between the left edge of the fabric and the left edge of the rectangle.');
    console.log('The number of inches between the top edge of the fabric and the top edge of the rectangle.');
    console.log('The width of the rectangle in inches.');
    console.log('The height of the rectangle in inches.');
    console.log('A claim like #123 @ 3,2: 5x4 means that claim ID 123 specifies a rectangle 3 inches from the left edge, 2 inches from the top edge, 5 inches wide, and 4 inches tall. Visually, it claims the square inches of fabric represented by # (and ignores the square inches of fabric represented by .) in the diagram below:');
    console.log('...........');
    console.log('...........');
    console.log('...#####...');
    console.log('...#####...');
    console.log('...#####...');
    console.log('...#####...');
    console.log('...........');
    console.log('...........');
    console.log('...........');
    console.log('The problem is that many of the claims overlap, causing two or more claims to cover part of the same areas. For example, consider the following claims:');
    console.log('#1 @ 1,3: 4x4');
    console.log('#2 @ 3,1: 4x4');
    console.log('#3 @ 5,5: 2x2');
    console.log('Visually, these claim the following areas:');
    console.log('........');
    console.log('...2222.');
    console.log('...2222.');
    console.log('.11XX22.');
    console.log('.11XX22.');
    console.log('.111133.');
    console.log('.111133.');
    console.log('........');
    console.log('The four square inches marked with X are claimed by both 1 and 2. (Claim 3, while adjacent to the others, does not overlap either of them.)');
    console.log('If the Elves all proceed with their own plans, none of them will have enough fabric. How many square inches of fabric are within two or more claims?');
    console.log('-----------------------------------');
    console.log('Your puzzle answer was ' + getSquareInchesOfIntersectingClaims(puzzle));
    console.log('-----------------------------------');
}

function overlapClaimsInFabric(claimsList){
    let numClaims = claimsList.length;
    let fabric = new Array(1000);
    for (let i = 0; i < 1000; i++){
        fabric[i] = new Array(1000);
        for (let j = 0; j < 1000; j++){
            fabric[i][j] = 0;
        }
    }

    for (let i = 0; i < numClaims; i++){
        for (let j = claimsList[i].x; j < claimsList[i].x + claimsList[i].width; j++){
            for (let k = claimsList[i].y; k < claimsList[i].y + claimsList[i].height; k++){
                fabric[j][k] ++;
            }
        }
    }

    return fabric;
}

function getSquareInchesOfIntersectingClaims(claimsList){
    let fabric = overlapClaimsInFabric(claimsList);
    let sharedSquareInches = 0;

    for (let i = 0; i < 1000; i++){
        for (let j = 0; j < 1000; j++){
            if (fabric[i][j] > 1){
                sharedSquareInches ++;
            }
        }
    }

    return sharedSquareInches;
}


function partTwo(puzzle){
    console.log('--- Part Two ---');
    console.log('Amidst the chaos, you notice that exactly one claim doesn\'t overlap by even a single square inch of fabric with any other claim. If you can somehow draw attention to it, maybe the Elves will be able to make Santa\'s suit after all!');
    console.log('For example, in the claims above, only claim 3 is intact after all claims are made.');
    console.log('What is the ID of the only claim that doesn\'t overlap?');
    console.log('-----------------------------------');
    console.log('Your puzzle answer was ' + getNonOverlapingClaim(puzzle));
    console.log('-----------------------------------');
}

function getNonOverlapingClaim(claimsList){
    let fabric = overlapClaimsInFabric(claimsList);
    let numClaims = claimsList.length;
    
    for (let i = 0; i < numClaims; i++){
        let overlaps = false;
        for (let j = claimsList[i].x; j < claimsList[i].x + claimsList[i].width; j++){
            for (let k = claimsList[i].y; k < claimsList[i].y + claimsList[i].height; k++){
                if (fabric[j][k] > 1){
                    overlaps = true;
                }
            }
        }
        if (!overlaps){
            return claimsList[i].id;
        }
    }
}

function day03(){
    console.log('--- Day 3: No Matter How You Slice It ---');
    let puzzle = readPuzzle();
    partOne(puzzle);
    partTwo(puzzle);
    console.log('\n\n');
}

function readPuzzle(){
    let fileContent = readFileSync('resources/day03_input.txt', 'utf8');
    let claimsList = [];
    fileContent.split('\n').forEach(line => {
        let info = line.split(' ');
        let id = info[0].slice(1);
        let coords = info[2].slice(0, info[2].length-1).split(',');
        let size = info[3].split('x');
        let claim = new Claim(id, parseInt(coords[0]), parseInt(coords[1]), parseInt(size[0]), parseInt(size[1]));
        claimsList.push(claim);
    });
    return claimsList;
}

export { day03, getSquareInchesOfIntersectingClaims, Claim, getNonOverlapingClaim };