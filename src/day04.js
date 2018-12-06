//day 04
import {readFileSync} from 'fs';

let Event = class{
    constructor(date, event){
        this.date = date;
        this.event = event;
    }
}

function partOne(labelsList){
    console.log('You stop falling through time, catch your breath, and check the screen on the device. "Destination reached. Current Year: 1518. Current Location: North Pole Utility Closet 83N10." You made it! Now, to find those anomalies.');
    console.log('Outside the utility closet, you hear footsteps and a voice. "...I\'m not sure either. But now that so many people have chimneys, maybe he could sneak in that way?" Another voice responds, "Actually, we\'ve been working on a new kind of suit that would let him fit through tight spaces like that. But, I heard that a few days ago, they lost the prototype fabric, the design plans, everything! Nobody on the team can even seem to remember important details of the project!"');
    console.log('"Wouldn\'t they have had enough fabric to fill several boxes in the warehouse? They\'d be stored together, so the box IDs should be similar. Too bad it would take forever to search the warehouse for two similar box IDs..." They walk too far away to hear any more.');
    console.log('Late at night, you sneak to the warehouse - who knows what kinds of paradoxes you could cause if you were discovered - and use your fancy wrist device to quickly scan every box and produce a list of the likely candidates (your puzzle input).');
    console.log('To make sure you didn\'t miss any, you scan the likely candidate boxes again, counting the number that have an ID containing exactly two of any letter and then separately counting those with exactly three of any letter. You can multiply those two counts together to get a rudimentary checksum and compare it to what your device predicts.');
    console.log('For example, if you see the following box IDs:');
    console.log('abcdef contains no letters that appear exactly two or three times.');
    console.log('bababc contains two a and three b, so it counts for both.');
    console.log('abbcde contains two b, but no letter appears exactly three times.');
    console.log('abcccd contains three c, but no letter appears exactly two times.');
    console.log('aabcdd contains two a and two d, but it only counts once.');
    console.log('abcdee contains two e.');
    console.log('ababab contains three a and three b, but it only counts once.');
    console.log('Of these box IDs, four of them contain a letter which appears exactly twice, and three of them contain a letter which appears exactly three times. Multiplying these together produces a checksum of 4 * 3 = 12.');
    console.log('What is the checksum for your list of box IDs?');
    console.log('-----------------------------------');
    console.log('Your puzzle answer was  ' + calculateChecksum(labelsList));
    console.log('-----------------------------------');
}

function calculateChecksum(listOfBoxLabels){
    let numTwoTimes = 0;
    let numThreeTimes = 0;

    listOfBoxLabels.forEach(boxLabel => {
        let lettersCount = countOfDifferentLetters(boxLabel);
        let containsTwoTimes = false;
        let containsThreeTimes = false;
        for(let letter in lettersCount){
            if(lettersCount[letter] === 2){
                containsTwoTimes = true;
            }
            if(lettersCount[letter] === 3){
                containsThreeTimes = true;
            }
        }
        numTwoTimes += containsTwoTimes ? 1 : 0;
        numThreeTimes += containsThreeTimes ? 1 : 0;
    });

    return numTwoTimes * numThreeTimes;
}

function countOfDifferentLetters(boxLabel){
    let lettersCount = {};

    boxLabel.split('').forEach(letter => {
        if(!lettersCount.hasOwnProperty(letter)){
            lettersCount[letter] = 0;
        }
        lettersCount[letter]++;
    });

    return lettersCount;
}

function partTwo(labelsList){
    console.log('--- Part Two ---');
    console.log('Confident that your list of box IDs is complete, you\'re ready to find the boxes full of prototype fabric.');
    console.log('The boxes will have IDs which differ by exactly one character at the same position in both strings. For example, given the following box IDs:');
    console.log('abcde');
    console.log('fghij');
    console.log('klmno');
    console.log('pqrst');
    console.log('fguij');
    console.log('axcye');
    console.log('wvxyz');
    console.log('The IDs abcde and axcye are close, but they differ by two characters (the second and fourth). However, the IDs fghij and fguij differ by exactly one character, the third (h and u). Those must be the correct boxes.');
    console.log('What letters are common between the two correct box IDs? (In the example above, this is found by removing the differing character from either ID, producing fgij.)');
    console.log('-----------------------------------');
    console.log("Your puzzle answer was  " + findLabelsForSantaSuit(labelsList));
    console.log('-----------------------------------');
}

function findLabelsForSantaSuit(listOfBoxLabels){
    let numLabels = listOfBoxLabels.length;
    for (let i = 0; i < numLabels - 1; i++){
        for (let j = i + 1; j < numLabels; j++){
            let distance = calculateHammingDistance(listOfBoxLabels[i], listOfBoxLabels[j]);
            if (distance === 1){
                return getCommonLetters(listOfBoxLabels[i], listOfBoxLabels[j]);
            }
        }
    }
}

function getCommonLetters(word1, word2){
    let common = '';
    let wordLength = word1.length;
    
    for(let i = 0; i < wordLength; i++){
        if(word1[i] === word2[i]){
            common += word1[i];
        }
    }

    return common;
}

function calculateHammingDistance(word1, word2){
    let distance = 0;
    let wordLength = word1.length;
    
    for(let i = 0; i < wordLength; i++){
        if(word1[i] !== word2[i]){
            distance++;
        }
    }

    return distance;
}

function day04(){
    console.log("--- Day 4: Repose Record ---");
    readLog();
    //partOne(labelsList);
    //partTwo(labelsList);
    console.log('\n\n');
}

function readLog(){
    let fileContent = readFileSync('resources/day04_example_input.txt', 'utf8');
    let events = [];
    let eventRegex = /\[(\d{4}\-\d{2}\-\d{2} \d{2}:\d{2})\] (.*)/;
    fileContent.split('\n').forEach(line => {
        if (eventRegex.test(line)){
            let regexResult = line.match(eventRegex);
            let date = new Date(regexResult[1]);
            let event = new Event(date, regexResult[2]);
            events.push(event);
        }
    });
    events.sort(function(a, b) {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
    });
    events.forEach(e => {
        console.log(e.date + ' -- ' + e.event);
    });
    return events;
}

export { day04, Event };