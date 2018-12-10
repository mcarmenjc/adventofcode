//day 07

let NodeList = class {
    constructor(value){
        this.value = value;
        this.next = undefined;
        this.previous = undefined;
    }

    setNext(node){
        this.next = node;
        node.previous = this;
    }

    setPrevious(node){
        this.previous = node;
        node.next = this;
    }

    print(){
        let it = this;
        let values = [];
        do{
            values.push(it.value);
            it = it.next;
        } while(it !== this);
        console.log(values.join(' -> '));
    }
}

function partOne(numPlayers, lastMarbleValue){
    console.log('You talk to the Elves while you wait for your navigation system to initialize. To pass the time, they introduce you to their favorite marble game.');
    console.log('The Elves play this game by taking turns arranging the marbles in a circle according to very particular rules. The marbles are numbered starting with 0 and increasing by 1 until every marble has a number.');
    console.log('First, the marble numbered 0 is placed in the circle. At this point, while it contains only a single marble, it is still a circle: the marble is both clockwise from itself and counter-clockwise from itself. This marble is designated the current marble.');
    console.log('Then, each Elf takes a turn placing the lowest-numbered remaining marble into the circle between the marbles that are 1 and 2 marbles clockwise of the current marble. (When the circle is large enough, this means that there is one marble between the marble that was just placed and the current marble.) The marble that was just placed then becomes the current marble.');
    console.log('However, if the marble that is about to be placed has a number which is a multiple of 23, something entirely different happens. First, the current player keeps the marble they would have placed, adding it to their score. In addition, the marble 7 marbles counter-clockwise from the current marble is removed from the circle and also added to the current player\'s score. The marble located immediately clockwise of the marble that was removed becomes the new current marble.');
    console.log('For example, suppose there are 9 players. After the marble with value 0 is placed in the middle, each player (shown in square brackets) takes a turn. The result of each of those turns would produce circles of marbles like this, where clockwise is to the right and the resulting current marble is in parentheses:');
    console.log('[-] (0)');
    console.log('[1]  0 (1)');
    console.log('[2]  0 (2) 1 ');
    console.log('[3]  0  2  1 (3)');
    console.log('[4]  0 (4) 2  1  3 ');
    console.log('[5]  0  4  2 (5) 1  3 ');
    console.log('[6]  0  4  2  5  1 (6) 3 ');
    console.log('[7]  0  4  2  5  1  6  3 (7)');
    console.log('[8]  0 (8) 4  2  5  1  6  3  7 ');
    console.log('[9]  0  8  4 (9) 2  5  1  6  3  7 ');
    console.log('[1]  0  8  4  9  2(10) 5  1  6  3  7 ');
    console.log('[2]  0  8  4  9  2 10  5(11) 1  6  3  7 ');
    console.log('[3]  0  8  4  9  2 10  5 11  1(12) 6  3  7 ');
    console.log('[4]  0  8  4  9  2 10  5 11  1 12  6(13) 3  7 ');
    console.log('[5]  0  8  4  9  2 10  5 11  1 12  6 13  3(14) 7 ');
    console.log('[6]  0  8  4  9  2 10  5 11  1 12  6 13  3 14  7(15)');
    console.log('[7]  0(16) 8  4  9  2 10  5 11  1 12  6 13  3 14  7 15 ');
    console.log('[8]  0 16  8(17) 4  9  2 10  5 11  1 12  6 13  3 14  7 15 ');
    console.log('[9]  0 16  8 17  4(18) 9  2 10  5 11  1 12  6 13  3 14  7 15 ');
    console.log('[1]  0 16  8 17  4 18  9(19) 2 10  5 11  1 12  6 13  3 14  7 15 ');
    console.log('[2]  0 16  8 17  4 18  9 19  2(20)10  5 11  1 12  6 13  3 14  7 15 ');
    console.log('[3]  0 16  8 17  4 18  9 19  2 20 10(21) 5 11  1 12  6 13  3 14  7 15 ');
    console.log('[4]  0 16  8 17  4 18  9 19  2 20 10 21  5(22)11  1 12  6 13  3 14  7 15 ');
    console.log('[5]  0 16  8 17  4 18(19) 2 20 10 21  5 22 11  1 12  6 13  3 14  7 15 ');
    console.log('[6]  0 16  8 17  4 18 19  2(24)20 10 21  5 22 11  1 12  6 13  3 14  7 15 ');
    console.log('[7]  0 16  8 17  4 18 19  2 24 20(25)10 21  5 22 11  1 12  6 13  3 14  7 15');
    console.log('The goal is to be the player with the highest score after the last marble is used up. Assuming the example above ends after the marble numbered 25, the winning score is 23+9=32 (because player 5 kept marble 23 and removed marble 9, while no other player got any points in this very short example game).');
    console.log('Here are a few more examples:');
    console.log('10 players; last marble is worth 1618 points: high score is 8317');
    console.log('13 players; last marble is worth 7999 points: high score is 146373');
    console.log('17 players; last marble is worth 1104 points: high score is 2764');
    console.log('21 players; last marble is worth 6111 points: high score is 54718');
    console.log('30 players; last marble is worth 5807 points: high score is 37305');
    console.log('What is the winning Elf\'s score?');
    console.log('-----------------------------------');
    console.log('Your puzzle answer was  ' + calculateWinningScore(numPlayers, lastMarbleValue));
    console.log('-----------------------------------');
}

function calculateWinningScore(numPlayers, lastMarbleValue){
    let scores = playMarbles(numPlayers, lastMarbleValue);
    let maxScore = 0;
    scores.forEach(s => {
        if (s > maxScore){
            maxScore = s;
        }
    });
    return maxScore;
}

function playMarbles(numPlayers, lastMarble){
    let currentPosition = new NodeList(currentMarble);
    currentPosition.setNext(currentPosition);
    let startPosition = currentPosition;
    let currentMarble = 1;
    let scores = new Array(numPlayers);
    scores.fill(0);
    let currentPlayer = 0;
    
    while(currentMarble <= lastMarble){
        currentPosition = currentPosition.next;

        if (currentMarble % 23 === 0){
            scores[currentPlayer] += currentMarble;
            let ninePositionsBackMarble = currentPosition;
            for (let i = 0; i < 8; i++){
                ninePositionsBackMarble = ninePositionsBackMarble.previous;
            }
            scores[currentPlayer] += ninePositionsBackMarble.value;
            currentPosition = ninePositionsBackMarble.next;
            currentPosition.setPrevious(ninePositionsBackMarble.previous);
        }
        else{
            let newMarbleNode = new NodeList(currentMarble);
            newMarbleNode.setNext(currentPosition.next);
            newMarbleNode.setPrevious(currentPosition);
            currentPosition = newMarbleNode;
        }

        currentPlayer = (currentPlayer + 1) % numPlayers;
        currentMarble++;
    }

    return scores;
}


function partTwo(numPlayers, lastMarbleValue){
    console.log('--- Part Two ---');
    console.log('Amused by the speed of your answer, the Elves are curious:');
    console.log('What would the new winning Elf\'s score be if the number of the last marble were 100 times larger?');
    console.log('-----------------------------------');
    console.log("Your puzzle answer was  " + calculateWinningScore(numPlayers, lastMarbleValue*100));
    console.log('-----------------------------------');
}

function day09(){
    console.log("--- Day 9: Marble Mania ---");
    let players = 413;
    let marble = 71082;
    partOne(players, marble);
    partTwo(players, marble); 
    console.log('\n\n');
}

export { day09, calculateWinningScore, playMarbles };