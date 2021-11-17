//day 05
import {readFileSync} from 'fs';

let Point = class {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    distance(p) {
        return Math.abs(this.x - p.x) + Math.abs(this.y-p.y);
    }

    print(){
        console.log('(' + this.x + ', ' + this.y + ')');
    }
}

function partOne(points){
    console.log('The device on your wrist beeps several times, and once again you feel like you\'re falling.');
    console.log('"Situation critical," the device announces. "Destination indeterminate. Chronal interference detected. Please specify new target coordinates."');
    console.log('The device then produces a list of coordinates (your puzzle input). Are they places it thinks are safe or dangerous? It recommends you check manual page 729. The Elves did not give you a manual.');
    console.log('If they\'re dangerous, maybe you can minimize the danger by finding the coordinate that gives the largest distance from the other points.');
    console.log('Using only the Manhattan distance, determine the area around each coordinate by counting the number of integer X,Y locations that are closest to that coordinate (and aren\'t tied in distance to any other coordinate).');
    console.log('Your goal is to find the size of the largest area that isn\'t infinite. For example, consider the following list of coordinates:');
    console.log('1, 1');
    console.log('1, 6');
    console.log('8, 3');
    console.log('3, 4');
    console.log('5, 5');
    console.log('8, 9');
    console.log('If we name these coordinates A through F, we can draw them on a grid, putting 0,0 at the top left:');
    console.log('..........');
    console.log('.A........');
    console.log('..........');
    console.log('........C.');
    console.log('...D......');
    console.log('.....E....');
    console.log('.B........');
    console.log('..........');
    console.log('..........');
    console.log('........F.');
    console.log('This view is partial - the actual grid extends infinitely in all directions. Using the Manhattan distance, each location\'s closest coordinate can be determined, shown here in lowercase:');
    console.log('aaaaa.cccc');
    console.log('aAaaa.cccc');
    console.log('aaaddecccc');
    console.log('aadddeccCc');
    console.log('..dDdeeccc');
    console.log('bb.deEeecc');
    console.log('bBb.eeee..');
    console.log('bbb.eeefff');
    console.log('bbb.eeffff');
    console.log('bbb.ffffFf');
    console.log('Locations shown as . are equally far from two or more coordinates, and so they don\'t count as being closest to any.');
    console.log('In this example, the areas of coordinates A, B, C, and F are infinite - while not shown here, their areas extend forever outside the visible grid. However, the areas of coordinates D and E are finite: D is closest to 9 locations, and E is closest to 17 (both including the coordinate\'s location itself). Therefore, in this example, the size of the largest area is 17.');
    console.log('What is the size of the largest area that isn\'t infinite?');
    console.log('-----------------------------------');
    console.log('Your puzzle answer was  ' + calculateSizeOfLongestArea(points));
    console.log('-----------------------------------');
}

function calculateSizeOfLongestArea(points){
    let grid = createGridWithClosestPoints(points);
    removeInfiniteAreasFromGrid(grid);
    let area = calculateMaxArea(grid, points.length);
    return area;
}

function createGridWithClosestPoints(points){
    let xMin = getMinX(points);
    let xMax = getMaxX(points);
    let yMin = getMinY(points);
    let yMax = getMaxY(points);
    
    let grid = new Array(yMax - yMin + 1);
    for (let i = 0; i < grid.length; i++){
        grid[i] = new Array(xMax - xMin + 1);
        for (let j = 0; j < grid[i].length; j++){
            grid[i][j] = -1;
        }
    }

    for (let i = 0; i < grid.length; i++){
        let y = i + yMin;
        for (let j = 0; j < grid[i].length; j++){
            let x = j + xMin;
            let pointInGrid = new Point(x, y);
            grid[i][j] = getClosestPoint(pointInGrid, points);
        }
    }

    return grid;    
}

function removeInfiniteAreasFromGrid(grid){
    let borderPoints = [];
    for (let i = 0; i < grid.length; i++){
        borderPoints.push(grid[i][0]);
        borderPoints.push(grid[i][grid[i].length-1]);
    }
    for (let i = 0; i < grid[0].length; i++){
        borderPoints.push(grid[0][i]);
        borderPoints.push(grid[grid.length-1][i]);
    }
    let infinitePoints = new Set(borderPoints);

    for(let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid[i].length; j++){
            if (infinitePoints.has(grid[i][j])){
                grid[i][j] = -1;
            }
        }
    }
}

function getClosestPoint(pointInGrid, points){
    let minDistance = Number.MAX_SAFE_INTEGER;
    let closestPoint = -1;
    for (let i = 0; i < points.length; i++){
        let distance = points[i].distance(pointInGrid);
        if (distance <= minDistance){
            if(distance === minDistance){
                closestPoint = -1;
            }
            else {
                minDistance = distance;
                closestPoint = i;
            }
        }
    }

    return closestPoint;
}

function calculateMaxArea(grid, numPoints){
    let maxArea = 0;

    for(let i = 0; i < numPoints; i++){
        let area = 0;
        for (let j = 0; j < grid.length; j++){
            for (let k = 0; k < grid[j].length; k++){
                if (grid[j][k] === i){
                    area++;
                }
            }
        }

        if (maxArea < area){
            maxArea = area;
        }
    }

    return maxArea;
}

function getMinY(points){
    return points.reduce((min, b) => Math.min(min, b.y), points[0].y);
}

function getMaxY(points){
    return points.reduce((max, b) => Math.max(max, b.y), points[0].y);
}

function getMinX(points){
    return points.reduce((min, b) => Math.min(min, b.x), points[0].x);
}

function getMaxX(points){
    return points.reduce((max, b) => Math.max(max, b.x), points[0].x);
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
    let grid = calculateGridWithDistancesToPoints(points, maxDistance);
    let areaWhithDistance = getAreaWithInDistance(grid);
    return areaWhithDistance;
}

function getAreaWithInDistance(grid){
    let area = 0;
    for (let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid[i].length; j++){
            if (grid[i][j] > 0){
                area ++;
            }
        }
    }

    return area;
}

function calculateGridWithDistancesToPoints(points, maxDistance){
    let xMin = getMinX(points);
    let xMax = getMaxX(points);
    let yMin = getMinY(points);
    let yMax = getMaxY(points);
    
    let grid = new Array(yMax - yMin + 1);
    for (let i = 0; i < grid.length; i++){
        grid[i] = new Array(xMax - xMin + 1);
        for (let j = 0; j < grid[i].length; j++){
            grid[i][j] = 0;
        }
    }

    for (let i = 0; i < grid.length; i++){
        let y = i + yMin;
        for (let j = 0; j < grid[i].length; j++){
            let x = j + xMin;
            let distance = calculateDistancesToPoint(new Point(x, y), points);
            if (distance < maxDistance){
                grid[i][j] = distance;
            }
        }
    }

    return grid; 
}

function calculateDistancesToPoint(pointInGrid, points){
    let distance = 0;
    points.forEach(p => {
        distance += p.distance(pointInGrid);
    });
    return distance;
}

function day06(){
    console.log("--- Day 6: Chronal Coordinates ---");
    let points = readPoints();
    partOne(points);
    partTwo(points); 
    console.log('\n\n');
}

function readPoints(){
    let fileContent = readFileSync('resources/day06_input.txt', 'utf8');
    let points = [];
    let pointRegex = /(\d+), (\d+)/;
    fileContent.split('\n').forEach(line => {
        let pointParts = line.match(pointRegex);
        points.push(new Point(pointParts[1], pointParts[2]));
    });
    return points;
}

export { day06, Point, calculateSizeOfLongestArea, calculateLongestRegionWithInDistance, calculateGridWithDistancesToPoints, createGridWithClosestPoints, removeInfiniteAreasFromGrid, getClosestPoint };