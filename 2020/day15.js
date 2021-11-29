function playElvesGame(startingNumbers, turn){
    let numbers = {};
    let lastNumber = startingNumbers[startingNumbers.length-1];
    let nextTurn = startingNumbers.length;

    for (let i = 0; i < startingNumbers.length; i++){
        numbers[startingNumbers[i]] = [i];
    }

    while (nextTurn < turn){
        let numTurns = numbers[lastNumber].length;
        let nextNumber = 0;

        if (numTurns > 1){
            nextNumber = numbers[lastNumber][numTurns-1] - numbers[lastNumber][numTurns-2];
        }

        if (numbers[nextNumber] === undefined){
            numbers[nextNumber] = [];
        }

        numbers[nextNumber].push(nextTurn);
        lastNumber = nextNumber;
        nextTurn++;
    }

    return lastNumber;
}

let input = [13, 0, 10, 12, 1, 5, 8];

let lastSpokenNumber2020 = playElvesGame(input, 2020);
let lastSpokenNumber30000000 = playElvesGame(input, 30000000);

console.log(`Answer part 1: ${lastSpokenNumber2020}`);
console.log(`Answer part 2: ${lastSpokenNumber30000000}`);