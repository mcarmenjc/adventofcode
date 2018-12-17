//day 15
import {readFileSync} from 'fs';

let PLAYER_TYPE = {
    'GOBLIN': 'G',
    'ELF': 'E'
}

let Player = class {
    constructor(row, col, hitPower, type){
        this.row = row;
        this.column = col;
        this.hitPower = hitPower;
        this.type = type;
    }

    left(){
        this.column --;
    }

    right(){
        this.column ++;
    }

    up(){
        this.row --;
    }

    down(){
        this.row ++;
    }

    attacked(damage){
        hitPower -= damage;
    }

    isDead(){
        return this.hitPower <= 0;
    }

    print(){
        console.log((this.type === PLAYER_TYPE.GOBLIN ? 'GOBLIN' : 'ELF') + ' => (' + this.row + ', ' + this.column + ') live (' + this.hitPower + ')');
    }
}

function partOne(){
    console.log('Having perfected their hot chocolate, the Elves have a new problem: the Goblins that live in these caves will do anything to steal it. Looks like they\'re here for a fight.');
    console.log('You scan the area, generating a map of the walls (#), open cavern (.), and starting position of every Goblin (G) and Elf (E) (your puzzle input).');
    console.log('Combat proceeds in rounds; in each round, each unit that is still alive takes a turn, resolving all of its actions before the next unit\'s turn begins. On each unit\'s turn, it tries to move into range of an enemy (if it isn\'t already) and then attack (if it is in range).');
    console.log('All units are very disciplined and always follow very strict combat rules. Units never move or attack diagonally, as doing so would be dishonorable. When multiple choices are equally valid, ties are broken in reading order: top-to-bottom, then left-to-right. For instance, the order in which units take their turns within a round is the reading order of their starting positions in that round, regardless of the type of unit or whether other units have moved after the round started. For example:');
    console.log('                 would take their');
    console.log('These units:   turns in this order:');
    console.log('  #######           #######');
    console.log('  #.G.E.#           #.1.2.#');
    console.log('  #E.G.E#           #3.4.5#');
    console.log('  #.G.E.#           #.6.7.#');
    console.log('  #######           #######');
    console.log('Each unit begins its turn by identifying all possible targets (enemy units). If no targets remain, combat ends.');
    console.log('Then, the unit identifies all of the open squares (.) that are in range of each target; these are the squares which are adjacent (immediately up, down, left, or right) to any target and which aren\'t already occupied by a wall or another unit. Alternatively, the unit might already be in range of a target. If the unit is not already in range of a target, and there are no open squares which are in range of a target, the unit ends its turn.');
    console.log('If the unit is already in range of a target, it does not move, but continues its turn with an attack. Otherwise, since it is not in range of a target, it moves.');
    console.log('To move, the unit first considers the squares that are in range and determines which of those squares it could reach in the fewest steps. A step is a single movement to any adjacent (immediately up, down, left, or right) open (.) square. Units cannot move into walls or other units. The unit does this while considering the current positions of units and does not do any prediction about where units will be later. If the unit cannot reach (find an open path to) any of the squares that are in range, it ends its turn. If multiple squares are in range and tied for being reachable in the fewest steps, the step which is first in reading order is chosen. For example:');
    console.log('Targets:      In range:     Reachable:    Nearest:      Chosen:');
    console.log('#######       #######       #######       #######       #######');
    console.log('#E..G.#       #E.?G?#       #E.@G.#       #E.!G.#       #E.+G.#');
    console.log('#...#.#  -->  #.?.#?#  -->  #.@.#.#  -->  #.!.#.#  -->  #...#.#');
    console.log('#.G.#G#       #?G?#G#       #@G@#G#       #!G.#G#       #.G.#G#');
    console.log('#######       #######       #######       #######       #######');
    console.log('In the above scenario, the Elf has three targets (the three Goblins):');
    console.log('Each of the Goblins has open, adjacent squares which are in range (marked with a ? on the map).');
    console.log('Of those squares, four are reachable (marked @); the other two (on the right) would require moving through a wall or unit to reach.');
    console.log('Three of these reachable squares are nearest, requiring the fewest steps (only 2) to reach (marked !).');
    console.log('Of those, the square which is first in reading order is chosen (+).');
    console.log('The unit then takes a single step toward the chosen square along the shortest path to that square. If multiple steps would put the unit equally closer to its destination, the unit chooses the step which is first in reading order. (This requires knowing when there is more than one shortest path so that you can consider the first step of each such path.) For example:');
    console.log('In range:     Nearest:      Chosen:       Distance:     Step:');
    console.log('#######       #######       #######       #######       #######');
    console.log('#.E...#       #.E...#       #.E...#       #4E212#       #..E..#');
    console.log('#...?.#  -->  #...!.#  -->  #...+.#  -->  #32101#  -->  #.....#');
    console.log('#..?G?#       #..!G.#       #...G.#       #432G2#       #...G.#');
    console.log('#######       #######       #######       #######       #######');
    console.log('The Elf sees three squares in range of a target (?), two of which are nearest (!), and so the first in reading order is chosen (+). Under "Distance", each open square is marked with its distance from the destination square; the two squares to which the Elf could move on this turn (down and to the right) are both equally good moves and would leave the Elf 2 steps from being in range of the Goblin. Because the step which is first in reading order is chosen, the Elf moves right one square.');
    console.log('Here\'s a larger example of movement:');
    console.log('Initially:');
    console.log('#########');
    console.log('#G..G..G#');
    console.log('#.......#');
    console.log('#.......#');
    console.log('#G..E..G#');
    console.log('#.......#');
    console.log('#.......#');
    console.log('#G..G..G#');
    console.log('#########');
    console.log('After 1 round:');
    console.log('#########');
    console.log('#.G...G.#');
    console.log('#...G...#');
    console.log('#...E..G#');
    console.log('#.G.....#');
    console.log('#.......#');
    console.log('#G..G..G#');
    console.log('#.......#');
    console.log('#########');
    console.log('After 2 rounds:');
    console.log('#########');
    console.log('#..G.G..#');
    console.log('#...G...#');
    console.log('#.G.E.G.#');
    console.log('#.......#');
    console.log('#G..G..G#');
    console.log('#.......#');
    console.log('#.......#');
    console.log('#########');
    console.log('After 3 rounds:');
    console.log('#########');
    console.log('#.......#');
    console.log('#..GGG..#');
    console.log('#..GEG..#');
    console.log('#G..G...#');
    console.log('#......G#');
    console.log('#.......#');
    console.log('#.......#');
    console.log('#########');
    console.log('Once the Goblins and Elf reach the positions above, they all are either in range of a target or cannot find any square in range of a target, and so none of the units can move until a unit dies.');
    console.log('After moving (or if the unit began its turn in range of a target), the unit attacks.');
    console.log('To attack, the unit first determines all of the targets that are in range of it by being immediately adjacent to it. If there are no such targets, the unit ends its turn. Otherwise, the adjacent target with the fewest hit points is selected; in a tie, the adjacent target with the fewest hit points which is first in reading order is selected.');
    console.log('The unit deals damage equal to its attack power to the selected target, reducing its hit points by that amount. If this reduces its hit points to 0 or fewer, the selected target dies: its square becomes . and it takes no further turns.');
    console.log('Each unit, either Goblin or Elf, has 3 attack power and starts with 200 hit points.');
    console.log('For example, suppose the only Elf is about to attack:');
    console.log('       HP:            HP:');
    console.log('G....  9       G....  9  ');
    console.log('..G..  4       ..G..  4  ');
    console.log('..EG.  2  -->  ..E..     ');
    console.log('..G..  2       ..G..  2  ');
    console.log('...G.  1       ...G.  1  ');
    console.log('The "HP" column shows the hit points of the Goblin to the left in the corresponding row. The Elf is in range of three targets: the Goblin above it (with 4 hit points), the Goblin to its right (with 2 hit points), and the Goblin below it (also with 2 hit points). Because three targets are in range, the ones with the lowest hit points are selected: the two Goblins with 2 hit points each (one to the right of the Elf and one below the Elf). Of those, the Goblin first in reading order (the one to the right of the Elf) is selected. The selected Goblin\'s hit points (2) are reduced by the Elf\'s attack power (3), reducing its hit points to -1, killing it.');
    console.log('After attacking, the unit\'s turn ends. Regardless of how the unit\'s turn ends, the next unit in the round takes its turn. If all units have taken turns in this round, the round ends, and a new round begins.');
    console.log('The Elves look quite outnumbered. You need to determine the outcome of the battle: the number of full rounds that were completed (not counting the round in which combat ends) multiplied by the sum of the hit points of all remaining units at the moment combat ends. (Combat only ends when a unit finds no targets during its turn.)');
    console.log('Below is an entire sample combat. Next to each map, each row\'s units\' hit points are listed from left to right.');
    console.log('Initially:');
    console.log('#######   ');
    console.log('#.G...#   G(200)');
    console.log('#...EG#   E(200), G(200)');
    console.log('#.#.#G#   G(200)');
    console.log('#..G#E#   G(200), E(200)');
    console.log('#.....#   ');
    console.log('#######   ');
    console.log('After 1 round:');
    console.log('#######   ');
    console.log('#..G..#   G(200)');
    console.log('#...EG#   E(197), G(197)');
    console.log('#.#G#G#   G(200), G(197)');
    console.log('#...#E#   E(197)');
    console.log('#.....#   ');
    console.log('#######   ');
    console.log('After 2 rounds:');
    console.log('#######   ');
    console.log('#...G.#   G(200)');
    console.log('#..GEG#   G(200), E(188), G(194)');
    console.log('#.#.#G#   G(194)');
    console.log('#...#E#   E(194)');
    console.log('#.....#   ');
    console.log('#######   ');
    console.log('Combat ensues; eventually, the top Elf dies:');
    console.log('After 23 rounds:');
    console.log('#######   ');
    console.log('#...G.#   G(200)');
    console.log('#..G.G#   G(200), G(131)');
    console.log('#.#.#G#   G(131)');
    console.log('#...#E#   E(131)');
    console.log('#.....#   ');
    console.log('#######   ');
    console.log('After 24 rounds:');
    console.log('#######   ');
    console.log('#..G..#   G(200)');
    console.log('#...G.#   G(131)');
    console.log('#.#G#G#   G(200), G(128)');
    console.log('#...#E#   E(128)');
    console.log('#.....#   ');
    console.log('#######   ');
    console.log('After 25 rounds:');
    console.log('#######   ');
    console.log('#.G...#   G(200)');
    console.log('#..G..#   G(131)');
    console.log('#.#.#G#   G(125)');
    console.log('#..G#E#   G(200), E(125)');
    console.log('#.....#   ');
    console.log('#######   ');
    console.log('After 26 rounds:');
    console.log('#######   ');
    console.log('#G....#   G(200)');
    console.log('#.G...#   G(131)');
    console.log('#.#.#G#   G(122)');
    console.log('#...#E#   E(122)');
    console.log('#..G..#   G(200)');
    console.log('#######   ');
    console.log('After 27 rounds:');
    console.log('#######   ');
    console.log('#G....#   G(200)');
    console.log('#.G...#   G(131)');
    console.log('#.#.#G#   G(119)');
    console.log('#...#E#   E(119)');
    console.log('#...G.#   G(200)');
    console.log('#######   ');
    console.log('After 28 rounds:');
    console.log('#######   ');
    console.log('#G....#   G(200)');
    console.log('#.G...#   G(131)');
    console.log('#.#.#G#   G(116)');
    console.log('#...#E#   E(113)');
    console.log('#....G#   G(200)');
    console.log('#######   ');
    console.log('More combat ensues; eventually, the bottom Elf dies:');
    console.log('After 47 rounds:');
    console.log('#######   ');
    console.log('#G....#   G(200)');
    console.log('#.G...#   G(131)');
    console.log('#.#.#G#   G(59)');
    console.log('#...#.#   ');
    console.log('#....G#   G(200)');
    console.log('#######   ');
    console.log('Before the 48th round can finish, the top-left Goblin finds that there are no targets remaining, and so combat ends. So, the number of full rounds that were completed is 47, and the sum of the hit points of all remaining units is 200+131+59+200 = 590. From these, the outcome of the battle is 47 * 590 = 27730.');
    console.log('Here are a few example summarized combats:');
    console.log('#######       #######');
    console.log('#G..#E#       #...#E#   E(200)');
    console.log('#E#E.E#       #E#...#   E(197)');
    console.log('#G.##.#  -->  #.E##.#   E(185)');
    console.log('#...#E#       #E..#E#   E(200), E(200)');
    console.log('#...E.#       #.....#');
    console.log('#######       #######');
    console.log('Combat ends after 37 full rounds');
    console.log('Elves win with 982 total hit points left');
    console.log('Outcome: 37 * 982 = 36334');
    console.log('#######       #######   ');
    console.log('#E..EG#       #.E.E.#   E(164), E(197)');
    console.log('#.#G.E#       #.#E..#   E(200)');
    console.log('#E.##E#  -->  #E.##.#   E(98)');
    console.log('#G..#.#       #.E.#.#   E(200)');
    console.log('#..E#.#       #...#.#   ');
    console.log('#######       #######   ');
    console.log('Combat ends after 46 full rounds');
    console.log('Elves win with 859 total hit points left');
    console.log('Outcome: 46 * 859 = 39514');
    console.log('#######       #######   ');
    console.log('#E.G#.#       #G.G#.#   G(200), G(98)');
    console.log('#.#G..#       #.#G..#   G(200)');
    console.log('#G.#.G#  -->  #..#..#   ');
    console.log('#G..#.#       #...#G#   G(95)');
    console.log('#...E.#       #...G.#   G(200)');
    console.log('#######       #######   ');
    console.log('Combat ends after 35 full rounds');
    console.log('Goblins win with 793 total hit points left');
    console.log('Outcome: 35 * 793 = 27755');
    console.log('#######       #######   ');
    console.log('#.E...#       #.....#   ');
    console.log('#.#..G#       #.#G..#   G(200)');
    console.log('#.###.#  -->  #.###.#   ');
    console.log('#E#G#G#       #.#.#.#   ');
    console.log('#...#G#       #G.G#G#   G(98), G(38), G(200)');
    console.log('#######       #######   ');
    console.log('Combat ends after 54 full rounds');
    console.log('Goblins win with 536 total hit points left');
    console.log('Outcome: 54 * 536 = 28944');
    console.log('#########       #########   ');
    console.log('#G......#       #.G.....#   G(137)');
    console.log('#.E.#...#       #G.G#...#   G(200), G(200)');
    console.log('#..##..G#       #.G##...#   G(200)');
    console.log('#...##..#  -->  #...##..#   ');
    console.log('#...#...#       #.G.#...#   G(200)');
    console.log('#.G...G.#       #.......#   ');
    console.log('#.....G.#       #.......#   ');
    console.log('#########       #########   ');
    console.log('Combat ends after 20 full rounds');
    console.log('Goblins win with 937 total hit points left');
    console.log('Outcome: 20 * 937 = 18740');
    console.log('What is the outcome of the combat described in your puzzle input?');
    console.log('-----------------------------------');
    console.log('Your puzzle answer was  ');
    console.log('-----------------------------------');
}

function playRound(map, characters){
    characters.sort((a, b) => {
        if(a.row < b.row){
            return -1;
        }
        if(a.row === b.row){
            return a.column < b.column ? -1 : a.column > b.column ? 1 : 0;
        }
        return 1;
    });

    characters.forEach(player => {
        let nextPosition = findTarget(player, players, map);
    });
}

function findTarget(currentPlayer, players, map){
    let currentPlayerId = currentPlayer.row + ',' + currentPlayer.column;
    let cellsToVisit = [[currentPlayer.row, currentPlayer.column]];
    let distance = {};
    distance[currentPlayerId] = 0;
    let previousCell = {};
    let moves = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    let allPlayers = players.reduce((playersObj, p, pIndex) => {
        if(!p.isDead()){
            let id = p.row + ',' + p.column;
            playersObj[id] = pIndex;
        }
        return playersObj;
    }, {});
    let allEnemies = players.reduce((enemies, p, pIndex) => {
        if(p.type !== currentPlayer.type && !p.isDead()){
            let id = p.row + ',' + p.column;
            enemies[id] = pIndex;
        }
        return enemies;
    }, {});

    let closest = undefined;

    while(cellsToVisit.length > 0 && closest === undefined) {
        let currentPosition = cellsToVisit.shift();
        moves.forEach(move => {
            if(closest === undefined){
                let cell = [currentPosition[0] + move[0], currentPosition[1] + move[1]];
                let cellId = cell[0] + ',' + cell[1];
                let previousId = currentPosition[0] + ',' + currentPosition[1];

                if(allEnemies.hasOwnProperty(cellId)){
                    closest = cell;
                    previousCell[cellId] = currentPosition;
                    distance[cellId] = distance[previousId] + 1;
                }

                if(!allPlayers.hasOwnProperty(cellId) &&
                    !previousCell.hasOwnProperty(cellId) &&
                    map[cell[0]][cell[1]] !== '#'){
                    previousCell[cellId] = currentPosition;
                    distance[cellId] = distance[previousId] + 1;
                    cellsToVisit.push(cell);
                }
            }
        });
    }

    if(closest === undefined){
        return [-1, -1, undefined];
    }

    let cellId = closest[0] + ',' + closest[1];
    let move = previousCell[cellId];
    let prevMoveId = prevMove[0] + ',' + prevMove[1];
    let prevMove = previousCell[prevMoveId];
    while(prevMove[0] !== currentPlayer.row && prevMove[1] !== currentPlayer.column){
        move = 
        prevMoveId = prevMove[0] + ',' + prevMove[1];
        prevMove = previousCell[prevMoveId];
        
    }

    return [allEnemies[cellId], distance[cellId], prevMove];
}

function partTwo(scores){
    console.log('--- Part Two ---');
    console.log('As it turns out, you got the Elves\' plan backwards. They actually want to know how many recipes appear on the scoreboard to the left of the first recipes whose scores are the digits from your puzzle input.');
    console.log('51589 first appears after 9 recipes.');
    console.log('01245 first appears after 5 recipes.');
    console.log('92510 first appears after 18 recipes.');
    console.log('59414 first appears after 2018 recipes.');
    console.log('How many recipes appear on the scoreboard to the left of the score sequence in your puzzle input?');
    console.log('Your puzzle input is still 540391.');
    console.log('-----------------------------------');
    console.log('Your puzzle answer was  ');
    console.log('-----------------------------------');
}

function day15(){
    console.log('--- Day 15: Beverage Bandits ---');
    let [map, characters] = readBattleSetup();
    partOne(map, characters);
    //partTwo();
    console.log('\n\n');
}

function readBattleSetup(){
    let fileContent = readFileSync('resources/day15_input.txt', 'utf8');
    let map = [];
    let characters = [];
    let lines = fileContent.split('\n');
    for (let i = 0; i < lines.length; i++){
        let row = lines[i].split('');
        for(let j = 0; j < row.length; j++){
            if(row[j] === PLAYER_TYPE.GOBLIN || row[j] === PLAYER_TYPE.ELF){
                row[j] = '.';
                characters.push(new Player(i, j, 200, row[j] === PLAYER_TYPE.GOBLIN ? PLAYER_TYPE.GOBLIN : PLAYER_TYPE.ELF));
            }
        }
        map.push(row);
    }

    return [map, characters];
}

export { day15, Player, PLAYER_TYPE, findTarget };