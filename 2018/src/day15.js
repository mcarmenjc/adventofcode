//day 15
import {readFileSync} from 'fs';

let PLAYER_TYPE = {
    'GOBLIN': 'G',
    'ELF': 'E'
}

let Player = class {
    constructor(row, col, hitPoints, attackPower, type){
        this.row = row;
        this.column = col;
        this.hitPoints = hitPoints;
        this.attackPower = attackPower;
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
        this.hitPoints -= damage;
    }

    isDead(){
        return this.hitPoints <= 0;
    }

    setNewPostion(newPosition){
        this.row = newPosition[0];
        this.column = newPosition[1];
    }

    print(){
        console.log((this.type === PLAYER_TYPE.GOBLIN ? 'GOBLIN' : 'ELF') + ' => (' + this.column + ', ' + this.row + ') live (' + this.hitPoints + ')');
    }
}

function partOne(map, players){
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
    console.log('Your puzzle answer was  ' + calculateScoreAfterBattle(map, players));
    console.log('-----------------------------------');
}

function calculateScoreAfterBattle(map, characters){
    let numRounds = playBattle(map, characters);
    let elfsPoints = 0;
    let goblinPoints = 0;

    characters.forEach(p => {
        if(!p.isDead()){
            if(p.type === PLAYER_TYPE.ELF){
                elfsPoints += p.hitPoints;
            }
            else{
                goblinPoints += p.hitPoints;
            }
        }
    });

    let winningTeamHitPoints = elfsPoints > 0 ? elfsPoints : goblinPoints;
    let score = numRounds * winningTeamHitPoints;
    return score;
}

function playBattle(map, characters){
    let round = 0;
    let noEnemies = false;
    let finishedInTheMiddle = false;

    while(!noEnemies){
        round ++;
        [noEnemies, finishedInTheMiddle] = playRound(map, characters);
        if(noEnemies){
            return finishedInTheMiddle ? round - 1 : round;
        }
    }

    return round;
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

    let roundOutcome = false;
    let finishedInTheMiddle = false;

    characters.forEach((player, pIndex) => {
        if(!player.isDead()){
            let targetEnemy = findTarget(player, characters);
            if (targetEnemy === -1){
                let [enemyId, distance, nextMove] = movePlayer(player, characters, map);
                player.setNewPostion(nextMove);
                targetEnemy = findTarget(player, characters);
            }
            if(targetEnemy !== -1){
                characters[targetEnemy].attacked(player.attackPower);
            }

            roundOutcome = !roundOutcome ? areAllEnemiesDead(player.type, characters) : roundOutcome;
            if(roundOutcome && !finishedInTheMiddle && pIndex < characters.length-1){
                for(let i = pIndex + 1; i < characters.length; i++){
                    if(!characters[i].isDead() && characters[i].type === player.type){
                        finishedInTheMiddle = true;
                    }
                }
            }
        }
    });

    return [roundOutcome, finishedInTheMiddle];
}

function areAllEnemiesDead(currentType, players){
    let noEnemies = true;

    players.forEach(p => {
        if(p.type !== currentType && !p.isDead()){
            noEnemies = false;
        }
    });
    return noEnemies;
}

function findTarget(player, players){
    let enemyWithLessHitPoints = -1;
    let minHitPoints = 201;
    let moves = [[-1, 0], [0, -1], [0, 1], [1, 0]];
    players.forEach((p, index) => {
        if(!p.isDead() && p.type !== player.type){
            moves.forEach(m => {
                if(player.row + m[0] === p.row && player.column + m[1] === p.column){
                    if(p.hitPoints < minHitPoints){
                        minHitPoints = p.hitPoints;
                        enemyWithLessHitPoints = index;
                    }
                }
            });
        }
    });
    return enemyWithLessHitPoints;
}

function movePlayer(currentPlayer, players, map){
    let currentPlayerId = currentPlayer.row + ',' + currentPlayer.column;
    let cellsToVisit = [[currentPlayer.row, currentPlayer.column]];
    let distance = {};
    distance[currentPlayerId] = 0;
    let previousCell = {};
    let moves = [[-1, 0], [0, -1], [0, 1], [1, 0]];
    let allPlayers = players.reduce((playersObj, p, pIndex) => {
        if(!p.isDead()){
            let id = p.row + ',' + p.column;
            playersObj[id] = pIndex;
        }
        return playersObj;
    }, {});
    let allEnemies = players.reduce((enemies, p, pIndex) => {
        if(p.type !== currentPlayer.type && !p.isDead()){
            moves.forEach(m => {
                let surroundingPos = [p.row + m[0], p.column + m[1]];
                let surroundingId = surroundingPos[0] + ',' + surroundingPos[1];
                if(map[surroundingPos[0]][surroundingPos[1]] !== '#' && !allPlayers.hasOwnProperty(surroundingId)){
                    enemies[surroundingId] = pIndex;
                }
            });
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
                else {
                    if(!allPlayers.hasOwnProperty(cellId) &&
                        !previousCell.hasOwnProperty(cellId) &&
                        map[cell[0]][cell[1]] !== '#'){
                        previousCell[cellId] = currentPosition;
                        distance[cellId] = distance[previousId] + 1;
                        cellsToVisit.push(cell);
                    }
                }
            }
        });
    }

    if(closest === undefined){
        return [-1, -1, [currentPlayer.row, currentPlayer.column]];
    }

    let cellId = closest[0] + ',' + closest[1];
    let move = closest;
    let prevMove = previousCell[cellId];
    while(prevMove[0] !== currentPlayer.row || prevMove[1] !== currentPlayer.column){
        move = prevMove;
        cellId = prevMove[0] + ',' + prevMove[1];
        prevMove = previousCell[cellId];
    }
    cellId = closest[0] + ',' + closest[1];
    return [allEnemies[cellId], distance[cellId], move];
}

function partTwo(map, players){
    console.log('--- Part Two ---');
    console.log('According to your calculations, the Elves are going to lose badly. Surely, you won\'t mess up the timeline too much if you give them just a little advanced technology, right?');
    console.log('You need to make sure the Elves not only win, but also suffer no losses: even the death of a single Elf is unacceptable.');
    console.log('However, you can\'t go too far: larger changes will be more likely to permanently alter spacetime.');
    console.log('So, you need to find the outcome of the battle in which the Elves have the lowest integer attack power (at least 4) that allows them to win without a single death. The Goblins always have an attack power of 3.');
    console.log('In the first summarized example above, the lowest attack power the Elves need to win without losses is 15:');
    console.log('#######       #######');
    console.log('#.G...#       #..E..#   E(158)');
    console.log('#...EG#       #...E.#   E(14)');
    console.log('#.#.#G#  -->  #.#.#.#');
    console.log('#..G#E#       #...#.#');
    console.log('#.....#       #.....#');
    console.log('#######       #######');
    console.log('Combat ends after 29 full rounds');
    console.log('Elves win with 172 total hit points left');
    console.log('Outcome: 29 * 172 = 4988');
    console.log('In the second example above, the Elves need only 4 attack power:');
    console.log('#######       #######');
    console.log('#E..EG#       #.E.E.#   E(200), E(23)');
    console.log('#.#G.E#       #.#E..#   E(200)');
    console.log('#E.##E#  -->  #E.##E#   E(125), E(200)');
    console.log('#G..#.#       #.E.#.#   E(200)');
    console.log('#..E#.#       #...#.#');
    console.log('#######       #######');
    console.log('Combat ends after 33 full rounds');
    console.log('Elves win with 948 total hit points left');
    console.log('Outcome: 33 * 948 = 31284');
    console.log('In the third example above, the Elves need 15 attack power:');
    console.log('#######       #######');
    console.log('#E.G#.#       #.E.#.#   E(8)');
    console.log('#.#G..#       #.#E..#   E(86)');
    console.log('#G.#.G#  -->  #..#..#');
    console.log('#G..#.#       #...#.#');
    console.log('#...E.#       #.....#');
    console.log('#######       #######');
    console.log('Combat ends after 37 full rounds');
    console.log('Elves win with 94 total hit points left');
    console.log('Outcome: 37 * 94 = 3478');
    console.log('In the fourth example above, the Elves need 12 attack power:');
    console.log('#######       #######');
    console.log('#.E...#       #...E.#   E(14)');
    console.log('#.#..G#       #.#..E#   E(152)');
    console.log('#.###.#  -->  #.###.#');
    console.log('#E#G#G#       #.#.#.#');
    console.log('#...#G#       #...#.#');
    console.log('#######       #######');
    console.log('Combat ends after 39 full rounds');
    console.log('Elves win with 166 total hit points left');
    console.log('Outcome: 39 * 166 = 6474');
    console.log('In the last example above, the lone Elf needs 34 attack power:');
    console.log('#########       #########   ');
    console.log('#G......#       #.......#   ');
    console.log('#.E.#...#       #.E.#...#   E(38)');
    console.log('#..##..G#       #..##...#   ');
    console.log('#...##..#  -->  #...##..#   ');
    console.log('#...#...#       #...#...#   ');
    console.log('#.G...G.#       #.......#   ');
    console.log('#.....G.#       #.......#   ');
    console.log('#########       #########   ');
    console.log('Combat ends after 30 full rounds');
    console.log('Elves win with 38 total hit points left');
    console.log('Outcome: 30 * 38 = 1140');
    console.log('After increasing the Elves\' attack power until it is just barely enough for them to win without any Elves dying, what is the outcome of the combat described in your puzzle input?');
    console.log('-----------------------------------');
    console.log('Your puzzle answer was  ' + findAttackPowerSoElvesDoNotDie(map, players));
    console.log('-----------------------------------');
}

function findAttackPowerSoElvesDoNotDie(map, characters){
    let attackPower = 4;
    let elvesAlive = 0;
    let battleScore = undefined;
    let numElves = characters.reduce((elves, player) => {
        if(player.type === PLAYER_TYPE.ELF){
            return elves + 1;
        }
        return elves;
    }, 0);

    while(elvesAlive !== numElves){
        let battlePlayers = [];
        characters.forEach(c => {
            if(c.type === PLAYER_TYPE.GOBLIN){
                battlePlayers.push(new Player(c.row, c.column, c.hitPoints, c.attackPower, c.type));
            }
            else{
                battlePlayers.push(new Player(c.row, c.column, c.hitPoints, attackPower, c.type));
            }
        });

        battleScore = calculateScoreAfterBattle(map, battlePlayers);
        elvesAlive = battlePlayers.reduce((elves, player) => {
            if(player.type === PLAYER_TYPE.ELF && !player.isDead()){
                return elves + 1;
            }
            return elves;
        }, 0);
        attackPower ++;
    }

    return battleScore;
}

function day15(){
    console.log('--- Day 15: Beverage Bandits ---');
    let [map, characters] = readBattleSetup();
    partOne(map, characters);
    partTwo(map, characters);
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
            if(row[j] === PLAYER_TYPE.GOBLIN){
                row[j] = '.';
                characters.push(new Player(i, j, 200, 3, PLAYER_TYPE.GOBLIN));
            }
            if(row[j] === PLAYER_TYPE.ELF){
                row[j] = '.';
                characters.push(new Player(i, j, 200, 3, PLAYER_TYPE.ELF));
            }
        }
        map.push(row);
    }

    return [map, characters];
}

export { day15, Player, PLAYER_TYPE, movePlayer, playRound, playBattle, calculateScoreAfterBattle, findAttackPowerSoElvesDoNotDie };