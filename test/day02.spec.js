import {assert, should, expect}  from 'chai';
import {calculateChecksum, findLabelsForSantaSuit} from '../src/day02'

describe('Day 02', () => {
    describe('Part 1', () => {
        it('example 1', () => {
            let example1 = ['abcdef', 'bababc', 'abbcde', 'abcccd', 'aabcdd', 'abcdee', 'ababab'];
            let checksum = calculateChecksum(example1);
            let expectedChecksum = 12;
            assert.strictEqual(expectedChecksum, checksum, 'calculated checksum does not match');
        });
    });
    describe('Part 2', () => {
        it('example 1', () => {
            let example1 = ['abcde', 'fghij', 'klmno', 'pqrst', 'fguij', 'axcye', 'wvxyz'];
            let commonCharacters = findLabelsForSantaSuit(example1);
            let expectedCommonCharacters = 'fgij';
            assert.strictEqual(commonCharacters, expectedCommonCharacters, 'characters found are not the expected ones');
        });
    });
});