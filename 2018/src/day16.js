//day 15
import {readFileSync} from 'fs';

let OPCODE_TYPE = {
    'addr': 1,
    'addi': 2,
    'mulr': 3,
    'muli': 4,
    'banr': 5,
    'bani': 6,
    'borr': 7,
    'bori': 8,
    'setr': 9,
    'seti': 10,
    'gtir': 11,
    'gtri': 12,
    'gtrr': 13,
    'eqir': 14,
    'eqri': 15,
    'eqrr': 16,
}

let Opcode = class {
    constructor(opcodeId, op1, op2, result){
        this.type = undefined;
        this.opcodeId = opcodeId;
        this.firstOperand = op1;
        this.secondOperand = op2;
        this.result = result;
    }

    setOpcodeType(opcodeType){
        this.type = opcodeType;
    }

    testInstruction(registers){
        if(this.type === OPCODE_TYPE.addr){
            return registers[this.firstOperand] + registers[this.secondOperand];
        }
        if(this.type === OPCODE_TYPE.addi){
            return registers[this.firstOperand] + this.secondOperand;
        }
        if(this.type === OPCODE_TYPE.mulr){
            return registers[this.firstOperand] * registers[this.secondOperand];
        }
        if(this.type === OPCODE_TYPE.muli){
            return registers[this.firstOperand] * this.secondOperand;
        }
        if(this.type === OPCODE_TYPE.banr){
            return registers[this.firstOperand] & registers[this.secondOperand];
        }
        if(this.type === OPCODE_TYPE.bani){
            return registers[this.firstOperand] & this.secondOperand;
        }
        if(this.type === OPCODE_TYPE.borr){
            return registers[this.firstOperand] | registers[this.secondOperand];
        }
        if(this.type === OPCODE_TYPE.bori){
            return registers[this.firstOperand] | this.secondOperand;
        }
        if(this.type === OPCODE_TYPE.setr){
            return registers[this.firstOperand];
        }
        if(this.type === OPCODE_TYPE.seti){
            return this.firstOperand;
        }
        if(this.type === OPCODE_TYPE.gtir){
            return  this.firstOperand > registers[this.secondOperand] ? 1 : 0;
        }
        if(this.type === OPCODE_TYPE.gtri){
            return registers[this.firstOperand] > this.secondOperand ? 1 : 0;
        }
        if(this.type === OPCODE_TYPE.gtrr){
            return registers[this.firstOperand] > registers[this.secondOperand] ? 1 : 0;
        }
        if(this.type === OPCODE_TYPE.eqir){
            return this.firstOperand === registers[this.secondOperand] ? 1 : 0;
        }
        if(this.type === OPCODE_TYPE.eqri){
            return registers[this.firstOperand] === this.secondOperand ? 1 : 0;
        }
        if(this.type === OPCODE_TYPE.eqrr){
            return registers[this.firstOperand] === registers[this.secondOperand] ? 1 : 0;
        }
    }

    executeInstruction(registers){
        registers[this.result] = this.testInstruction(registers);
    }

    print(){
        console.log('opcodeId =' + this.opcodeId + ' operand 1 = ' + this.firstOperand + ' operand 2 = ' + this.secondOperand + ' result reg = ' + this.result);
    }
}

let CPUState = class {
    constructor(before, operation, after){
        this.before = before;
        this.operation = operation;
        this.after = after;
    }

    print(){
        console.log('before = ' + this.before.join(', '));
        this.operation.print();
        console.log('after = ' + this.after.join(', '));
    }
}

function partOne(states){
    console.log('As you see the Elves defend their hot chocolate successfully, you go back to falling through time. This is going to become a problem.');
    console.log('If you\'re ever going to return to your own time, you need to understand how this device on your wrist works. You have a little while before you reach your next destination, and with a bit of trial and error, you manage to pull up a programming manual on the device\'s tiny screen.');
    console.log('According to the manual, the device has four registers (numbered 0 through 3) that can be manipulated by instructions containing one of 16 opcodes. The registers start with the value 0.');
    console.log('Every instruction consists of four values: an opcode, two inputs (named A and B), and an output (named C), in that order. The opcode specifies the behavior of the instruction and how the inputs are interpreted. The output, C, is always treated as a register.');
    console.log('In the opcode descriptions below, if something says "value A", it means to take the number given as A literally. (This is also called an "immediate" value.) If something says "register A", it means to use the number given as A to read from (or write to) the register with that number. So, if the opcode addi adds register A and value B, storing the result in register C, and the instruction addi 0 7 3 is encountered, it would add 7 to the value contained by register 0 and store the sum in register 3, never modifying registers 0, 1, or 2 in the process.');
    console.log('Many opcodes are similar except for how they interpret their arguments. The opcodes fall into seven general categories:');
    console.log('Addition:');
    console.log('addr (add register) stores into register C the result of adding register A and register B.');
    console.log('addi (add immediate) stores into register C the result of adding register A and value B.');
    console.log('Multiplication:');
    console.log('mulr (multiply register) stores into register C the result of multiplying register A and register B.');
    console.log('muli (multiply immediate) stores into register C the result of multiplying register A and value B.');
    console.log('Bitwise AND:');
    console.log('banr (bitwise AND register) stores into register C the result of the bitwise AND of register A and register B.');
    console.log('bani (bitwise AND immediate) stores into register C the result of the bitwise AND of register A and value B.');
    console.log('Bitwise OR:');
    console.log('borr (bitwise OR register) stores into register C the result of the bitwise OR of register A and register B.');
    console.log('bori (bitwise OR immediate) stores into register C the result of the bitwise OR of register A and value B.');
    console.log('Assignment:');
    console.log('setr (set register) copies the contents of register A into register C. (Input B is ignored.)');
    console.log('seti (set immediate) stores value A into register C. (Input B is ignored.)');
    console.log('Greater-than testing:');
    console.log('gtir (greater-than immediate/register) sets register C to 1 if value A is greater than register B. Otherwise, register C is set to 0.');
    console.log('gtri (greater-than register/immediate) sets register C to 1 if register A is greater than value B. Otherwise, register C is set to 0.');
    console.log('gtrr (greater-than register/register) sets register C to 1 if register A is greater than register B. Otherwise, register C is set to 0.');
    console.log('Equality testing:');
    console.log('eqir (equal immediate/register) sets register C to 1 if value A is equal to register B. Otherwise, register C is set to 0.');
    console.log('eqri (equal register/immediate) sets register C to 1 if register A is equal to value B. Otherwise, register C is set to 0.');
    console.log('eqrr (equal register/register) sets register C to 1 if register A is equal to register B. Otherwise, register C is set to 0.');
    console.log('Unfortunately, while the manual gives the name of each opcode, it doesn\'t seem to indicate the number. However, you can monitor the CPU to see the contents of the registers before and after instructions are executed to try to work them out. Each opcode has a number from 0 through 15, but the manual doesn\'t say which is which. For example, suppose you capture the following sample:');
    console.log('Before: [3, 2, 1, 1]');
    console.log('9 2 1 2');
    console.log('After:  [3, 2, 2, 1]');
    console.log('This sample shows the effect of the instruction 9 2 1 2 on the registers. Before the instruction is executed, register 0 has value 3, register 1 has value 2, and registers 2 and 3 have value 1. After the instruction is executed, register 2\'s value becomes 2.');
    console.log('The instruction itself, 9 2 1 2, means that opcode 9 was executed with A=2, B=1, and C=2. Opcode 9 could be any of the 16 opcodes listed above, but only three of them behave in a way that would cause the result shown in the sample:');
    console.log('Opcode 9 could be mulr: register 2 (which has a value of 1) times register 1 (which has a value of 2) produces 2, which matches the value stored in the output register, register 2.');
    console.log('Opcode 9 could be addi: register 2 (which has a value of 1) plus value 1 produces 2, which matches the value stored in the output register, register 2.');
    console.log('Opcode 9 could be seti: value 2 matches the value stored in the output register, register 2; the number given for B is irrelevant.');
    console.log('None of the other opcodes produce the result captured in the sample. Because of this, the sample above behaves like three opcodes.');
    console.log('You collect many of these samples (the first section of your puzzle input). The manual also includes a small test program (the second section of your puzzle input) - you can ignore it for now.');
    console.log('Ignoring the opcode numbers, how many samples in your puzzle input behave like three or more opcodes?');
    console.log('-----------------------------------');
    console.log('Your puzzle answer was  ' + countStatesThatCanBeObtainedApplying3OrMoreOperations(states));
    console.log('-----------------------------------');
}

function countStatesThatCanBeObtainedApplying3OrMoreOperations(states){
    let count = 0;
    states.forEach(state => {
        let matchingOp = figureOutHowManyInstructionsCanBeApplied(state);
        if(matchingOp >= 3){
            count ++;
        }
    });

    return count;
}

function figureOutHowManyInstructionsCanBeApplied(state){
    let operations = findMatchingOperations(state);
    return operations.length;
}

function findMatchingOperations(state){
    let operations = [];
    for(let opcodeType in OPCODE_TYPE){
        state.operation.setOpcodeType(OPCODE_TYPE[opcodeType]);
        let result = state.operation.testInstruction(state.before);
        if(result === state.after[state.operation.result]){
            operations.push(opcodeType);
        }
    }
    return operations;
}

function partTwo(states, program){
    console.log('--- Part Two ---');
    console.log('Using the samples you collected, work out the number of each opcode and execute the test program (the second section of your puzzle input).');
    console.log('What value is contained in register 0 after executing the test program?');
    console.log('-----------------------------------');
    console.log('Your puzzle answer was  ' + runTestProgram(states, program));
    console.log('-----------------------------------');
}

function runTestProgram(states, program){
    let idsToOperations = matchIdsWithOperations(states);
    let registers = [0, 0, 0, 0];
    program.forEach(operation => {
        let type = OPCODE_TYPE[idsToOperations[operation.opcodeId]];
        operation.setOpcodeType(type);
        operation.executeInstruction(registers);
    });
    return registers[0];
}

function matchIdsWithOperations(states){
    let idToOperations = new Array(16);
    idToOperations.fill(undefined);
    let idToPosibleOp = {};
    states.forEach(state => {
        let operations = findMatchingOperations(state);
        let id = state.operation.opcodeId;
        if(!idToPosibleOp.hasOwnProperty(id)){
            idToPosibleOp[id] = [];
        }
        operations.forEach(op => {
            if(idToPosibleOp[id].indexOf(op) === -1){
                idToPosibleOp[id].push(op);
            }
        });
    });

    let allOperationsMatched = false;
    while(!allOperationsMatched){
        let opMatched = [];
        for(let id in idToPosibleOp){
            if(idToPosibleOp[id].length === 1){
                idToOperations[id] = idToPosibleOp[id][0];
                opMatched.push(idToOperations[id]);
                delete idToPosibleOp[id];
            }
        }
        for(let id in idToPosibleOp){
            opMatched.forEach(op => {
                let index = idToPosibleOp[id].indexOf(op);
                if(index > -1){
                    idToPosibleOp[id].splice(index, 1);
                }
            });
        }
        allOperationsMatched = idToOperations.reduce((allMatched, op) => {
            if(op === undefined){
                return false;
            }
            return allMatched;
        }, true);
    }

    return idToOperations;
}

function day16(){
    console.log('--- Day 16: Chronal Classification ---');
    let capturedOperations = readCPUOperations();
    partOne(capturedOperations);
    let testProgram = readTestProgram();
    partTwo(capturedOperations, testProgram);
    console.log('\n\n');
}

function readCPUOperations(){
    let fileContent = readFileSync('resources/day16_input.txt', 'utf8');
    let capturedOperations = [];
    let before = undefined;
    let operation = undefined;
    let after = undefined;
    let beforeRegex = /Before:\s+\[(\d+), (\d+), (\d+), (\d+)\]/;
    let afterRegex = /After:\s+\[(\d+), (\d+), (\d+), (\d+)\]/;
    let operationRegex = /(\d+) (\d+) (\d+) (\d+)/;
    fileContent.split('\n').forEach(line => {
        if(beforeRegex.test(line)){
            let result = line.match(beforeRegex);
            before = [parseInt(result[1]), parseInt(result[2]), parseInt(result[3]), parseInt(result[4])];
        }
        if(afterRegex.test(line)){
            let result = line.match(afterRegex);
            after = [parseInt(result[1]), parseInt(result[2]), parseInt(result[3]), parseInt(result[4])];
            capturedOperations.push(new CPUState(before, operation, after));
        }
        if(operationRegex.test(line)){
            let result = line.match(operationRegex);
            operation = new Opcode(parseInt(result[1]), parseInt(result[2]), parseInt(result[3]), parseInt(result[4]));
        }
    });

    return capturedOperations;
}

function readTestProgram(){
    let fileContent = readFileSync('resources/day16_part2_input.txt', 'utf8');
    let testProgram = [];
    let operationRegex = /(\d+) (\d+) (\d+) (\d+)/;
    fileContent.split('\n').forEach(line => {
        if(operationRegex.test(line)){
            let result = line.match(operationRegex);
            testProgram.push(new Opcode(parseInt(result[1]), parseInt(result[2]), parseInt(result[3]), parseInt(result[4])));
        }
    });

    return testProgram;
}

export { day16, Opcode, OPCODE_TYPE, CPUState, figureOutHowManyInstructionsCanBeApplied };