import {assert, should, expect}  from 'chai';
import {calculateFrequency, getRepeatedFrequency} from '../src/day01'

describe('Day 01', () => {
    describe('Part 1', () => {
        it('example 1', () => {
            let example1 = [1, -2, 3, 1];
            let frequency = calculateFrequency(example1);
            let expectedFrequency = 3;
            assert.strictEqual(expectedFrequency, frequency, 'calculated frequency does not match');
        });

        it('example 2', () => {
            let example2 = [1, 1, 1];
            let frequency = calculateFrequency(example2);
            let expectedFrequency = 3;
            assert.strictEqual(expectedFrequency, frequency, 'calculated frequency does not match');
        });

        it('example 3', () => {
            let example3 = [1, 1, -2];
            let frequency = calculateFrequency(example3);
            let expectedFrequency = 0;
            assert.strictEqual(expectedFrequency, frequency, 'calculated frequency does not match');
        });

        it('example 4', () => {
            let example4 = [-1, -2, -3];
            let frequency = calculateFrequency(example4);
            let expectedFrequency = -6;
            assert.strictEqual(expectedFrequency, frequency, 'calculated frequency does not match');
        });
    });
    describe('Part 2', () => {
        it('example 1', () => {
            let example1 = [1, -2, 3, 1];
            let frequency = getRepeatedFrequency(example1);
            let expectedFrequency = 2;
            assert.strictEqual(expectedFrequency, frequency, 'calculated frequency does not match');
        });

        it('example 2', () => {
            let example2 = [1, -1];
            let frequency = getRepeatedFrequency(example2);
            let expectedFrequency = 0;
            assert.strictEqual(expectedFrequency, frequency, 'calculated frequency does not match');
        });

        it('example 3', () => {
            let example3 = [3, 3, 4, -2, -4];
            let frequency = getRepeatedFrequency(example3);
            let expectedFrequency = 10;
            assert.strictEqual(expectedFrequency, frequency, 'calculated frequency does not match');
        });

        it('example 4', () => {
            let example4 = [-6, 3, 8, 5, -6];
    let example5 = [7, 7, -2, -7, -4];
            let frequency = getRepeatedFrequency(example4);
            let expectedFrequency = 5;
            assert.strictEqual(expectedFrequency, frequency, 'calculated frequency does not match');
        });

        it('example 5', () => {
            let example5 = [7, 7, -2, -7, -4];
            let frequency = getRepeatedFrequency(example5);
            let expectedFrequency = 14;
            assert.strictEqual(expectedFrequency, frequency, 'calculated frequency does not match');
        });
    });
});