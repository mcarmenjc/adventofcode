import { day8 as programInstructions } from './input.js';

class Program {
  #instructions;
  #accumulator;
  #pointer;

  constructor(instructions) {
    this.#accumulator = 0;
    this.#pointer = 0;
    this.#parseInstructions(instructions);
  }

  #parseInstructions(instructions){
    this.#instructions = [];
    for (let instruction of instructions){
        let instParts = instruction.split(' ');
        let argument = Number.parseInt(instParts[1].substr(1));
        if (instParts[1][0] === '-'){
            argument = (-1) * argument;
        }
        this.#instructions.push({
            'operation': instParts[0],
            'argument': argument,
            'count': 0
        });
    }
  }

  runUtilLoop(){
      this.#pointer = 0;
      this.#accumulator = 0;
      while(this.#instructions[this.#pointer].count < 1 && this.#pointer < this.#instructions.length){
        this.#executeOperation(this.#instructions[this.#pointer]);
      }
      return this.#accumulator;
  }

  fixProgram(){
    let programStack = [];
    this.#resetCounters();
    this.#pointer = 0;
    this.#accumulator = 0;
    let changedInstruction = -1;

    while(this.#pointer < this.#instructions.length){
        if (this.#instructions[this.#pointer].count === 1){
            if (changedInstruction !== -1) {
                while (programStack[programStack.length - 1].pointer !== changedInstruction){
                    this.#instructions[programStack[programStack.length - 1].pointer].count = 0;
                    programStack.pop();
                }

                this.#changeOperation(this.#instructions[changedInstruction]);
                this.#instructions[changedInstruction].count = 0;
                programStack.pop();
            }

            while (programStack.length > 0 && this.#instructions[programStack[programStack.length - 1].pointer].operation === 'acc'){
                this.#instructions[programStack[programStack.length - 1].pointer].count = 0;
                programStack.pop();
            }

            changedInstruction = programStack[programStack.length - 1].pointer;
            this.#changeOperation(this.#instructions[changedInstruction]);
            this.#instructions[changedInstruction].count = 0;
            this.#accumulator = programStack[programStack.length - 1].accumulator;
            this.#pointer = programStack[programStack.length - 1].pointer;
        }
        else {
            programStack.push({
                'pointer': this.#pointer,
                'accumulator': this.#accumulator
            });
        }
        
        this.#executeOperation(this.#instructions[this.#pointer]);
    }

    return this.#accumulator;
  }

  #changeOperation(instruction){
    if (instruction.operation === 'jmp'){
        instruction.operation = 'nop';
    }
    else{
        instruction.operation = 'jmp';
    }
  }

  #resetCounters(){
    for(let instruction of this.#instructions){
        instruction.count = 0;
    }
  }

  #executeOperation(instruction){
    if (instruction.operation === 'acc'){
        this.#accumulator += instruction.argument;
        this.#pointer ++;
    }

    if(instruction.operation === 'nop'){
        this.#pointer ++;
    }

    if(instruction.operation === 'jmp'){
        this.#pointer += instruction.argument;
    }

    instruction.count ++;
  }
}

let program = new Program(programInstructions);
let accumulatorBeforeLoop = program.runUtilLoop();
let accumulatorFixedProgram = program.fixProgram();

console.log(`Answer part 1: ${accumulatorBeforeLoop}`);
console.log(`Answer part 2: ${accumulatorFixedProgram}`);