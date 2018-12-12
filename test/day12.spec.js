import {expect}  from 'chai';
import { getNextGeneration, calculateGenerationAfterXSteps, calculateProductionValue } from '../src/day12';

describe('Day 12', () => {
    let initialState;
    let rules;
    beforeEach(() => {
        initialState = '#..#.#..##......###...###';
        rules = {
            '...##': '#',
            '..#..': '#',
            '.#...': '#',
            '.#.#.': '#',
            '.#.##': '#',
            '.##..': '#',
            '.####': '#',
            '#.#.#': '#',
            '#.###': '#',
            '##.#.': '#',
            '##.##': '#',
            '###..': '#',
            '###.#': '#',
            '####.': '#'
        };
    });
    describe('Generation of pots', () => {
        it('should be calculated from the previous generation applying the rules written by the elves', () => {
            let nextState = getNextGeneration(initialState, rules);
            let expectedNextState = '..#...#....#.....#..#..#..#..';
            expect(nextState).to.equal(expectedNextState);
        });
        it('should be changed after 20 steps', () => {
            let numSteps = 20;
            let finalState = calculateGenerationAfterXSteps(initialState, rules, numSteps);
            let expectedFinalState = '......................................#....##....#####...#######....#.#..##..............................';
            expect(finalState).to.equal(expectedFinalState);
        });
        it('should return 325 as the sum of the number of plant-containing pots after 20 generations', () => {
            let numSteps = 20;
            let initialStateLength = initialState.length;
            let finalState = calculateGenerationAfterXSteps(initialState, rules, numSteps);
            let production = calculateProductionValue(finalState, initialStateLength);
            let expectedProduction = 325;
            expect(production).to.equal(expectedProduction);
        });
    });
});