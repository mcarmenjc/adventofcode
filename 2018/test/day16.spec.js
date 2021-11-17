import {expect}  from 'chai';
import { CPUState, Opcode, figureOutHowManyInstructionsCanBeApplied } from '../src/day16';

describe('Day 16', () => {
    it('should return 3 as the number of matching operations to get to state', () => {
        let state = new CPUState([3, 2, 1, 1], new Opcode(9, 2, 1, 2), [3, 2, 2, 1]);
        let matchingOperations = figureOutHowManyInstructionsCanBeApplied(state);
        let expectedMatchingOperations = 3;

        expect(matchingOperations).to.equal(expectedMatchingOperations);
    });
});