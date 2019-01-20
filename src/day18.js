//day 18
import {readFileSync} from 'fs';

let Forest = class {
    constructor(fileName){
        this.acres = [];
        if(fileName !== undefined){
            let fileContent = readFileSync(fileName, 'utf8');
            fileContent.split('\n').forEach(line => {
                this.acres.push(line.split(''));
            });
        }
    }

    changeAcres(){
        let nextAcresState = new Array(this.acres.length);
        let neighbours = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

        for (let i = 0; i < this.acres.length; i ++){
            nextAcresState[i] = new Array(this.acres[i].length);
            for (let j = 0; j < this.acres[i].length; j++){
                nextAcresState[i][j] = this.acres[i][j];

                let numOpenFields = 0;
                let numTrees = 0;
                let numLumberyards = 0;

                neighbours.forEach(n => {
                    if ((i + n[0]) >= 0 && (i + n[0]) < this.acres.length && (j + n[1]) >= 0 && (j + n[1]) < this.acres[i].length){
                        if(this.acres[i+n[0]][j+n[1]] === '.'){
                            numOpenFields ++;
                        }
                        if(this.acres[i+n[0]][j+n[1]] === '|'){
                            numTrees ++;
                        }
                        if(this.acres[i+n[0]][j+n[1]] === '#'){
                            numLumberyards ++;
                        }
                    }
                });

                if(this.acres[i][j] === '.' && numTrees >= 3){
                    nextAcresState[i][j] = '|';
                }

                if(this.acres[i][j] === '|' && numLumberyards >= 3){
                    nextAcresState[i][j] = '#';
                }

                if(this.acres[i][j] === '#'){
                    if (numLumberyards > 0 && numTrees > 0){
                        nextAcresState[i][j] = '#';
                    }
                    else{
                        nextAcresState[i][j] = '.';
                    }
                }
            }
        }

        this.acres = nextAcresState;
    }

    changeAcresForXMinutes(numMinutes){
        for(let i = 0; i < numMinutes; i++){
            this.changeAcres();
        }
    }

    countNumberOfWoodedAcres(){
        let woodedAcres = 0
        this.acres.forEach(row => {
            woodedAcres += row.reduce((wooded, acre) => {
                if(acre === '|'){
                    return wooded + 1;
                }
                return wooded;
            }, 0);
        });

        return woodedAcres;
    }

    countNumberOfLumberyardAcres(){
        let lumberyardAcres = 0
        this.acres.forEach(row => {
            lumberyardAcres += row.reduce((lumberyards, acre) => {
                if(acre === '#'){
                    return lumberyards + 1;
                }
                return lumberyards;
            }, 0);
        });

        return lumberyardAcres;
    }

    calculateResourceValueOfLumberCollection(){
        let woodedAcres = this.countNumberOfWoodedAcres();
        let lumberyards = this.countNumberOfLumberyardAcres();
        return woodedAcres*lumberyards;
    }

    print(){
        for(let i = 0; i < this.acres.length; i++){
            console.log(this.acres[i].join(''));
        }
    }
}

function partOne(){
    console.log('On the outskirts of the North Pole base construction project, many Elves are collecting lumber.');
    console.log('The lumber collection area is 50 acres by 50 acres; each acre can be either open ground (.), trees (|), or a lumberyard (#). You take a scan of the area (your puzzle input).');
    console.log('Strange magic is at work here: each minute, the landscape looks entirely different. In exactly one minute, an open acre can fill with trees, a wooded acre can be converted to a lumberyard, or a lumberyard can be cleared to open ground (the lumber having been sent to other projects).');
    console.log('The change to each acre is based entirely on the contents of that acre as well as the number of open, wooded, or lumberyard acres adjacent to it at the start of each minute. Here, "adjacent" means any of the eight acres surrounding that acre. (Acres on the edges of the lumber collection area might have fewer than eight adjacent acres; the missing acres aren\'t counted.)');
    console.log('In particular:');
    console.log('An open acre will become filled with trees if three or more adjacent acres contained trees. Otherwise, nothing happens.');
    console.log('An acre filled with trees will become a lumberyard if three or more adjacent acres were lumberyards. Otherwise, nothing happens.');
    console.log('An acre containing a lumberyard will remain a lumberyard if it was adjacent to at least one other lumberyard and at least one acre containing trees. Otherwise, it becomes open.');
    console.log('These changes happen across all acres simultaneously, each of them using the state of all acres at the beginning of the minute and changing to their new form by the end of that same minute. Changes that happen during the minute don\'t affect each other.');
    console.log('For example, suppose the lumber collection area is instead only 10 by 10 acres with this initial configuration:');
    console.log('Initial state:');
    console.log('.#.#...|#.');
    console.log('.....#|##|');
    console.log('.|..|...#.');
    console.log('..|#.....#');
    console.log('#.#|||#|#|');
    console.log('...#.||...');
    console.log('.|....|...');
    console.log('||...#|.#|');
    console.log('|.||||..|.');
    console.log('...#.|..|.');
    console.log('After 1 minute:');
    console.log('.......##.');
    console.log('......|###');
    console.log('.|..|...#.');
    console.log('..|#||...#');
    console.log('..##||.|#|');
    console.log('...#||||..');
    console.log('||...|||..');
    console.log('|||||.||.|');
    console.log('||||||||||');
    console.log('....||..|.');
    console.log('After 2 minutes:');
    console.log('.......#..');
    console.log('......|#..');
    console.log('.|.|||....');
    console.log('..##|||..#');
    console.log('..###|||#|');
    console.log('...#|||||.');
    console.log('|||||||||.');
    console.log('||||||||||');
    console.log('||||||||||');
    console.log('.|||||||||');
    console.log('After 3 minutes:');
    console.log('.......#..');
    console.log('....|||#..');
    console.log('.|.||||...');
    console.log('..###|||.#');
    console.log('...##|||#|');
    console.log('.||##|||||');
    console.log('||||||||||');
    console.log('||||||||||');
    console.log('||||||||||');
    console.log('||||||||||');
    console.log('After 4 minutes:');
    console.log('.....|.#..');
    console.log('...||||#..');
    console.log('.|.#||||..');
    console.log('..###||||#');
    console.log('...###||#|');
    console.log('|||##|||||');
    console.log('||||||||||');
    console.log('||||||||||');
    console.log('||||||||||');
    console.log('||||||||||');
    console.log('After 5 minutes:');
    console.log('....|||#..');
    console.log('...||||#..');
    console.log('.|.##||||.');
    console.log('..####|||#');
    console.log('.|.###||#|');
    console.log('|||###||||');
    console.log('||||||||||');
    console.log('||||||||||');
    console.log('||||||||||');
    console.log('||||||||||');
    console.log('After 6 minutes:');
    console.log('...||||#..');
    console.log('...||||#..');
    console.log('.|.###|||.');
    console.log('..#.##|||#');
    console.log('|||#.##|#|');
    console.log('|||###||||');
    console.log('||||#|||||');
    console.log('||||||||||');
    console.log('||||||||||');
    console.log('||||||||||');
    console.log('After 7 minutes:');
    console.log('...||||#..');
    console.log('..||#|##..');
    console.log('.|.####||.');
    console.log('||#..##||#');
    console.log('||##.##|#|');
    console.log('|||####|||');
    console.log('|||###||||');
    console.log('||||||||||');
    console.log('||||||||||');
    console.log('||||||||||');
    console.log('After 8 minutes:');
    console.log('..||||##..');
    console.log('..|#####..');
    console.log('|||#####|.');
    console.log('||#...##|#');
    console.log('||##..###|');
    console.log('||##.###||');
    console.log('|||####|||');
    console.log('||||#|||||');
    console.log('||||||||||');
    console.log('||||||||||');
    console.log('After 9 minutes:');
    console.log('..||###...');
    console.log('.||#####..');
    console.log('||##...##.');
    console.log('||#....###');
    console.log('|##....##|');
    console.log('||##..###|');
    console.log('||######||');
    console.log('|||###||||');
    console.log('||||||||||');
    console.log('||||||||||');
    console.log('After 10 minutes:');
    console.log('.||##.....');
    console.log('||###.....');
    console.log('||##......');
    console.log('|##.....##');
    console.log('|##.....##');
    console.log('|##....##|');
    console.log('||##.####|');
    console.log('||#####|||');
    console.log('||||#|||||');
    console.log('||||||||||');
    console.log('After 10 minutes, there are 37 wooded acres and 31 lumberyards. Multiplying the number of wooded acres by the number of lumberyards gives the total resource value after ten minutes: 37 * 31 = 1147.');
    console.log('What will the total resource value of the lumber collection area be after 10 minutes?');
    console.log('-----------------------------------');
    let forest = new Forest('resources/day18_input.txt');
    forest.changeAcresForXMinutes(10);
    console.log('Your puzzle answer was  ' + forest.calculateResourceValueOfLumberCollection());
    console.log('-----------------------------------');
}

function partTwo(){
    console.log('--- Part Two ---');
    console.log('This important natural resource will need to last for at least thousands of years. Are the Elves collecting this lumber sustainably?');
    console.log('What will the total resource value of the lumber collection area be after 1000000000 minutes?');
    console.log('-----------------------------------');
    let forest = new Forest('resources/day18_input.txt');
    forest.changeAcresForXMinutes(1000000000);
    console.log('Your puzzle answer was  ' + forest.calculateResourceValueOfLumberCollection());
    console.log('-----------------------------------');
}

function day18(){
    console.log('--- Day 18: Settlers of The North Pole ---');
    partOne();
    partTwo();
    console.log('\n\n');
}

export { day18, Forest };