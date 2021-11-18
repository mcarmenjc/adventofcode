import { day9 as numbers } from './input.js';

function findBreakingXMASRuleNumber(numbers){
    let preamble = new Set();

    for (let i = 0; i < 25; i++){
        preamble.add(numbers[i]);
    }

    for (let i = 25; i < numbers.length; i++){
        if (!isSumOfPreamble(preamble, numbers[i])){
            return numbers[i];
        }

        preamble.delete(numbers[i-25]);
        preamble.add(numbers[i]);
    }

    return undefined;
}

function isSumOfPreamble(preamble, number){
    for (let v of preamble){
        let remaining = number - v;
        if (preamble.has(remaining)) {
            return true;
        }
    }

    return false;
}

function findEncryptionWeakness(numbers, breakingNumber){
    let start = 0;
    let end = 0;
    let sum = numbers[start];

    while (sum !== breakingNumber && start < numbers.length && end < numbers.length){
        if (sum < breakingNumber){
            end ++;
            sum += numbers[end];
        }
        if (sum > breakingNumber){
            sum -= numbers[start];
            start ++;
        }

        if (start === end && numbers[start] === breakingNumber){
            start ++;
            end ++;
            sum = numbers[start];
        }
    }

    let min = numbers[start];
    let max = numbers[start];
    for (let i = start+1; i <= end; i++){
        if (numbers[i] < min){
            min = numbers[i];
        }
        if (numbers[i] > max){
            max = numbers[i];
        }
    }

    return min + max;
}

let breakingRuleNumber = findBreakingXMASRuleNumber(numbers);
let encryptionWeakness = findEncryptionWeakness(numbers, breakingRuleNumber);

console.log(`Answer part 1: ${breakingRuleNumber}`);
console.log(`Answer part 2: ${encryptionWeakness}`);