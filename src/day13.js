//day 13
import {readFileSync} from 'fs';

let DIRECTIONS = {
    'left': [0, -1],
    'right': [0, 1],
    'up': [-1, 0],
    'down': [1, 0],
};

let INTERSECTION_MOVES = ['left', 'straight', 'right'];

let Cart = class {
    constructor(row, column, direction){
        this.row = row;
        this.column = column;
        this.direction = direction;
        this.lastIntersectionMove = -1;
        this.hasCrashed = false;
    }

    move(){
        this.row += DIRECTIONS[this.direction][0];
        this.column += DIRECTIONS[this.direction][1];
    }

    shouldChangeDirection(currentPath){
        let intersectionMove = (this.lastIntersectionMove + 1) % INTERSECTION_MOVES.length;
        if (currentPath === '\\' || currentPath === '/'){
            return true;
        }
        return false;
    }

    changeDirection(currentPath){
        if (currentPath === '\\' || currentPath === '/'){
            this.turnCorner(currentPath);
        }
    }

    turnCorner(currentPath){
        if(currentPath === '\\'){
            if (this.direction === 'left'){
                this.direction = 'up';
            }
            else {
                if(this.direction === 'up'){
                    this.direction = 'left';
                }
                else {
                    if (this.direction === 'right'){
                        this.direction = 'down';
                    }
                    else {
                        if (this.direction === 'down'){
                            this.direction ='right';
                        }
                    }
                }
            }
        }
        if(currentPath === '/'){
            if (this.direction === 'left'){
                this.direction = 'down';
            }
            else {
                if(this.direction === 'down'){
                    this.direction = 'left';
                }
                else {
                    if (this.direction === 'right'){
                        this.direction = 'up';
                    }
                    else {
                        if (this.direction === 'up'){
                            this.direction ='right';
                        }
                    }
                }
            }
        }
    }

    setNewDirectionAtIntersection(){
        let intersectionMove = (this.lastIntersectionMove + 1) % INTERSECTION_MOVES.length;
        if (INTERSECTION_MOVES[intersectionMove] !== 'straight'){
            if(INTERSECTION_MOVES[intersectionMove] === 'left'){
                this.goLeft();
            }
            if(INTERSECTION_MOVES[intersectionMove] === 'right'){
                this.goRight();
            }
        }
        this.lastIntersectionMove = intersectionMove;
    }

    goLeft(){
        if (this.direction === 'left'){
            this.direction = 'down';
        }
        else {
            if(this.direction === 'down'){
                this.direction = 'right';
            }
            else {
                if (this.direction === 'right'){
                    this.direction = 'up';
                }
                else {
                    if (this.direction === 'up'){
                        this.direction ='left';
                    }
                }
            }
        }
    }

    goRight(){
        if (this.direction === 'left'){
            this.direction = 'up';
        }
        else {
            if(this.direction === 'up'){
                this.direction = 'right';
            }
            else {
                if (this.direction === 'right'){
                    this.direction = 'down';
                }
                else {
                    if (this.direction === 'down'){
                        this.direction ='left';
                    }
                }
            }
        }
    }

    print(){
        console.log('cart at (' + this.row + ', ' + this.column + ') with direction = ' + this.direction);
    }
}

function partOne(track, carts){
    console.log('A crop of this size requires significant logistics to transport produce, soil, fertilizer, and so on. The Elves are very busy pushing things around in carts on some kind of rudimentary system of tracks they\'ve come up with.');
    console.log('Seeing as how cart-and-track systems don\'t appear in recorded history for another 1000 years, the Elves seem to be making this up as they go along. They haven\'t even figured out how to avoid collisions yet.');
    console.log('You map out the tracks (your puzzle input) and see where you can help.');
    console.log('Tracks consist of straight paths (\| and -), curves (/ and \\), and intersections (+). Curves connect exactly two perpendicular pieces of track; for example, this is a closed loop:');
    console.log('/----\\');
    console.log('\|    \|');
    console.log('\|    \|');
    console.log('\\----/');
    console.log('Intersections occur when two perpendicular paths cross. At an intersection, a cart is capable of turning left, turning right, or continuing straight. Here are two loops connected by two intersections:');
    console.log('/-----\\');
    console.log('\|     \|');
    console.log('\|  /--+--\\');
    console.log('\|  \|  \|  \|');
    console.log('\\--+--/  \|');
    console.log('   \|     \|');
    console.log('   \\-----/');
    console.log('Several carts are also on the tracks. Carts always face either up (\^), down (v), left (<), or right (>). (On your initial map, the track under each cart is a straight path matching the direction the cart is facing.)');
    console.log('Each time a cart has the option to turn (by arriving at any intersection), it turns left the first time, goes straight the second time, turns right the third time, and then repeats those directions starting again with left the fourth time, straight the fifth time, and so on. This process is independent of the particular intersection at which the cart has arrived - that is, the cart has no per-intersection memory.');
    console.log('Carts all move at the same speed; they take turns moving a single step at a time. They do this based on their current location: carts on the top row move first (acting from left to right), then carts on the second row move (again from left to right), then carts on the third row, and so on. Once each cart has moved one step, the process repeats; each of these loops is called a tick.');
    console.log('For example, suppose there are two carts on a straight track:');
    console.log('\|  \|  \|  \|  \|');
    console.log('v  \|  \|  \|  \|');
    console.log('\|  v  v  \|  \|');
    console.log('\|  \|  \|  v  X');
    console.log('\|  \|  \^  \^  \|');
    console.log('\^  \^  \|  \|  \|');
    console.log('\|  \|  \|  \|  \|');
    console.log('First, the top cart moves. It is facing down (v), so it moves down one square. Second, the bottom cart moves. It is facing up (\^), so it moves up one square. Because all carts have moved, the first tick ends. Then, the process repeats, starting with the first cart. The first cart moves down, then the second cart moves up - right into the first cart, colliding with it! (The location of the crash is marked with an X.) This ends the second and last tick.');
    console.log('Here is a longer example:');
    console.log('/->-\\        ');
    console.log('\|   \|  /----\\');
    console.log('\| /-+--+-\\  \|');
    console.log('\| \| \|  \| v  \|');
    console.log('\\-+-/  \\-+--/');
    console.log('  \\------/   ');
    console.log('/-->\\        ');
    console.log('\|   \|  /----\\');
    console.log('\| /-+--+-\\  \|');
    console.log('\| \| \|  \| \|  \|');
    console.log('\\-+-/  \\->--/');
    console.log('  \\------/   ');
    console.log('/---v        ');
    console.log('\|   \|  /----\\');
    console.log('\| /-+--+-\\  \|');
    console.log('\| \| \|  \| \|  \|');
    console.log('\\-+-/  \\-+>-/');
    console.log('  \\------/   ');
    console.log('/---\\        ');
    console.log('\|   v  /----\\');
    console.log('\| /-+--+-\\  \|');
    console.log('\| \| \|  \| \|  \|');
    console.log('\\-+-/  \\-+->/');
    console.log('  \\------/   ');
    console.log('/---\\        ');
    console.log('\|   \|  /----\\');
    console.log('\| /->--+-\\  \|');
    console.log('\| \| \|  \| \|  \|');
    console.log('\\-+-/  \\-+--\^');
    console.log('  \\------/   ');
    console.log('/---\\        ');
    console.log('\|   \|  /----\\');
    console.log('\| /-+>-+-\\  \|');
    console.log('\| \| \|  \| \|  \^');
    console.log('\\-+-/  \\-+--/');
    console.log('  \\------/   ');
    console.log('/---\\        ');
    console.log('\|   \|  /----\\');
    console.log('\| /-+->+-\\  \^');
    console.log('\| \| \|  \| \|  \|');
    console.log('\\-+-/  \\-+--/');
    console.log('  \\------/   ');
    console.log('/---\\        ');
    console.log('\|   \|  /----<');
    console.log('\| /-+-->-\\  \|');
    console.log('\| \| \|  \| \|  \|');
    console.log('\\-+-/  \\-+--/');
    console.log('  \\------/   ');
    console.log('/---\\        ');
    console.log('\|   \|  /---<\\');
    console.log('\| /-+--+>\\  \|');
    console.log('\| \| \|  \| \|  \|');
    console.log('\\-+-/  \\-+--/');
    console.log('  \\------/   ');
    console.log('/---\\        ');
    console.log('\|   \|  /--<-\\');
    console.log('\| /-+--+-v  \|');
    console.log('\| \| \|  \| \|  \|');
    console.log('\\-+-/  \\-+--/');
    console.log('  \\------/   ');
    console.log('/---\\        ');
    console.log('\|   \|  /-<--\\');
    console.log('\| /-+--+-\\  \|');
    console.log('\| \| \|  \| v  \|');
    console.log('\\-+-/  \\-+--/');
    console.log('  \\------/   ');
    console.log('/---\\        ');
    console.log('\|   \|  /<---\\');
    console.log('\| /-+--+-\\  \|');
    console.log('\| \| \|  \| \|  \|');
    console.log('\\-+-/  \\-<--/');
    console.log('  \\------/   ');
    console.log('/---\\        ');
    console.log('\|   \|  v----\\');
    console.log('\| /-+--+-\\  \|');
    console.log('\| \| \|  \| \|  \|');
    console.log('\\-+-/  \\<+--/');
    console.log('  \\------/   ');
    console.log('/---\\        ');
    console.log('\|   \|  /----\\');
    console.log('\| /-+--v-\\  \|');
    console.log('\| \| \|  \| \|  \|');
    console.log('\\-+-/  \^-+--/');
    console.log('  \\------/   ');
    console.log('/---\\        ');
    console.log('\|   \|  /----\\');
    console.log('\| /-+--+-\\  \|');
    console.log('\| \| \|  X \|  \|');
    console.log('\\-+-/  \\-+--/');
    console.log('  \\------/   ');
    console.log('After following their respective paths for a while, the carts eventually crash. To help prevent crashes, you\'d like to know the location of the first crash. Locations are given in X,Y coordinates, where the furthest left column is X=0 and the furthest top row is Y=0:');
    console.log('           111');
    console.log(' 0123456789012');
    console.log('0/---\\        ');
    console.log('1\|   \|  /----\\');
    console.log('2\| /-+--+-\\  \|');
    console.log('3\| \| \|  X \|  \|');
    console.log('4\\-+-/  \\-+--/');
    console.log('5  \\------/   ');
    console.log('In this example, the location of the first crash is 7,3.');
    console.log('-----------------------------------');
    let crash = moveCartsUntilCrash(track, carts);
    console.log('Your puzzle answer was  ' + carts[crash[0]].column + ',' + carts[crash[0]].row);
    console.log('-----------------------------------');
}

function moveCartsUntilCrash(track, carts){
    while(true){
        sortCarts(carts);
        for (let i = 0; i < carts.length; i++){
            moveCart(track, carts[i]);
            let crash = findCrash(carts, i);
            if(crash !== -1){
                return [i, crash];
            }
        }
    }
}

function sortCarts(carts){
    carts.sort((a, b) => {
        if(a.row < b.row){
            return -1;
        }
        if(a.row === b.row){
            return a.column < b.column ? -1 : a.column > b.column ? 1 : 0;
        }
        return 1;
    });
}

function moveCart(track, cart){
    cart.move();
    if(track[cart.row][cart.column] === '+'){
        cart.setNewDirectionAtIntersection();
    }
    if(cart.shouldChangeDirection(track[cart.row][cart.column])){
        cart.changeDirection(track[cart.row][cart.column]);
    }
}

function findCrash(carts, currentCart){
    for (let i = 0; i < carts.length; i++){
        if(i !== currentCart && carts[currentCart].column === carts[i].column && carts[currentCart].row === carts[i].row){
                return i;
        }
    }
    return -1;
}


function partTwo(track, carts){
    console.log('--- Part Two ---');
    console.log('There isn\'t much you can do to prevent crashes in this ridiculous system. However, by predicting the crashes, the Elves know where to be in advance and instantly remove the two crashing carts the moment any crash occurs.');
    console.log('They can proceed like this for a while, but eventually, they\'re going to run out of carts. It could be useful to figure out where the last cart that hasn\'t crashed will end up.');
    console.log('For example:');
    console.log('/>-<\\  ');
    console.log('\|   \|  ');
    console.log('\| /<+-\\');
    console.log('\| \| \| v');
    console.log('\\>+</ \|');
    console.log('  \|   \^');
    console.log('  \\<->/');
    console.log('/---\\  ');
    console.log('\|   \|  ');
    console.log('\| v-+-\\');
    console.log('\| \| \| \|');
    console.log('\\-+-/ \|');
    console.log('  \|   \|');
    console.log('  \^---\^');
    console.log('/---\\  ');
    console.log('\|   \|  ');
    console.log('\| /-+-\\');
    console.log('\| v \| \|');
    console.log('\\-+-/ \|');
    console.log('  \^   \^');
    console.log('  \\---/');
    console.log('/---\\  ');
    console.log('\|   \|  ');
    console.log('\| /-+-\\');
    console.log('\| \| \| \|');
    console.log('\\-+-/ \^');
    console.log('  \|   \|');
    console.log('  \\---/');
    console.log('After four very expensive crashes, a tick ends with only one cart remaining; its final location is 6,4.');
    console.log('What is the location of the last cart at the end of the first tick where it is the only cart left?');
    console.log('-----------------------------------');
    let remainingCart = moveUntilOneCartIsLeft(track, carts)
    console.log('Your puzzle answer was  ' + remainingCart.column + ',' + remainingCart.row);
    console.log('-----------------------------------');
}

function moveUntilOneCartIsLeft(track, carts){
    while(carts.length > 1){
        sortCarts(carts);
        for (let i = 0; i < carts.length; i++){
            if(!carts[i].hasCrashed){
                moveCart(track, carts[i]);
                let crash = findCrash(carts, i);
                if(crash !== -1){
                    carts[i].hasCrashed = true;
                    carts[crash].hasCrashed = true;
                }
            }
        }
        carts = carts.filter(c => c.hasCrashed === false);
    }
    return carts[0];
}

/*
for example, output should be
83,49 for part1

73,36 for part2
 */

function day13(){
    console.log("--- Day 13: Mine Cart Madness ---");
    let {track, carts} = readTracksAndCarts();
    let initialCarts = carts.slice();
    partOne(track, carts);
    partTwo(track, initialCarts); 
    console.log('\n\n');
}

function readTracksAndCarts(){
    let fileContent = readFileSync('resources/day13_other_input.txt', 'utf8');
    let carts = [];
    let tracks = [];
    fileContent.split('\n').forEach(line => {
        tracks.push(line.split(''));
    });

    for (let i = 0; i < tracks.length; i++){
        for (let j = 0; j < tracks[i].length; j++){
            if (tracks[i][j] === '>'){
                carts.push(new Cart(i, j, 'left'));
                tracks[i][j] = '-';
            }
            if (tracks[i][j] === '<'){
                carts.push(new Cart(i, j, 'right'));
                tracks[i][j] = '-';
            }
            if (tracks[i][j] === '^'){
                carts.push(new Cart(i, j, 'up'));
                tracks[i][j] = '|';
            }
            if (tracks[i][j] === 'v'){
                carts.push(new Cart(i, j, 'down'));
                tracks[i][j] = '|';
            }
        }
    }
    return {'track': tracks, 'carts': carts};
}

export { day13, Cart, moveCart, moveCartsUntilCrash, moveUntilOneCartIsLeft };