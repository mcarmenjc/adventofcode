import { day14 as input } from './input.js';

class Instruction {
    type;
    value;

    constructor(type, value){
        this.type = type;
        this.value = value;
    }
}

class MemoryAssignment extends Instruction {
    slot;

    constructor(value, slot) {
        super('mem', value);
        this.slot = slot;
    }
}

class Mask extends Instruction {
    maskSet1;
    maskSet0;
    maskX = [];

    constructor(value) {
        super('mask', value);
        this.maskSet0 = BigInt(`0b${value.replace(/X/g, '1')}`);
        this.maskSet1 = BigInt(`0b${value.replace(/X/g, '0')}`);

        let maskPattern = value.replace(/[10]/, 'A');
        this.#generateXMasks(maskPattern, '', 0);
    }

    #generateXMasks(pattern, mask, pos){
        if (pos === pattern.length){
            this.maskX.push(mask);
        }
        else{
            if (pattern[pos] === 'X'){
                this.#generateXMasks(pattern, `${mask}0`, pos+1);
                this.#generateXMasks(pattern, `${mask}1`, pos+1);
            }
            else {
                this.#generateXMasks(pattern, `${mask}X`, pos+1);
            }
        }
    }

    apply(value){
        return (BigInt(value) | this.maskSet1) & this.maskSet0;
    }

    applyWithFloatingBits(value){
        let auxResult = BigInt(value) | this.maskSet1;
        let result = [];

        for (let mask of this.maskX){
            let tempMaskSet0 = BigInt(`0b${mask.replace(/X/g, '1')}`);
            let tempMaskSet1 = BigInt(`0b${mask.replace(/X/g, '0')}`);
            let floatResult = (BigInt(auxResult) | tempMaskSet1) & tempMaskSet0;
            result.push(floatResult);
        }
        return result;
    }
}

class InitializationProgram {
    #program = [];

    constructor(input){
        this.#program = [];
        let lines = input.split('\n');

        for (let line of lines){
            let parts = line.replace(/ /g,'').split('=');
            
            if (parts[0].includes('mask')){
                this.#program.push(new Mask(parts[1]));
            }
            else{
                let memorySlot = parts[0].substring(parts[0].indexOf('[')+1, parts[0].length - 1);
                this.#program.push(new MemoryAssignment(parts[1], BigInt(memorySlot)));
            }
        }
    }

    run(){
        let memory = {};
        let mask = undefined;

        for (let instruction of this.#program){
            if (instruction.type === 'mask'){
                mask = instruction;
            }
            else {
                memory[instruction.slot] = mask.apply(instruction.value);
            }
        }

        let sum = BigInt(0);
        for (let slot in memory){
            sum += BigInt(memory[slot]);
        }

        return sum;
    }

    runWithFloatingBits(){
        let memory = {};
        let mask = undefined;

        for (let instruction of this.#program){
            if (instruction.type === 'mask'){
                mask = instruction;
            }
            else {
                let slots = mask.applyWithFloatingBits(instruction.slot);
                for(let slot of slots){
                    memory[slot] = instruction.value;
                }
            }
        }

        let sum = BigInt(0);
        for (let slot in memory){
            sum += BigInt(memory[slot]);
        }

        return sum;
    }
}

let init = new InitializationProgram(input);
let memorySum = init.run();
let memorySumWithFloatingBits = init.runWithFloatingBits();

console.log(`Answer part 1: ${memorySum}`);
console.log(`Answer part 2: ${memorySumWithFloatingBits}`);