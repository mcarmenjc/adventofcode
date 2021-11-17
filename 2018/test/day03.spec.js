import {assert, should, expect}  from 'chai';
import {getSquareInchesOfIntersectingClaims, Claim, getNonOverlapingClaim} from '../src/day03'

describe('Day 03', () => {
    describe('Part 1', () => {
        it('example => [Claim(#1 @ 1,3: 4x4), Claim(#2 @ 3,1: 4x4), Claim(#3 @ 5,5: 2x2)], output => 4', () => {
            let example = [new Claim(1, 1, 3, 4, 4), new Claim(2, 3, 1, 4, 4), new Claim(3, 5, 5, 2, 2)];
            let sharedSquareInches = getSquareInchesOfIntersectingClaims(example);
            let expectedSquareInches = 4;
            expect(sharedSquareInches).to.equal(expectedSquareInches);
        });
    });
    describe('Part 2', () => {
        it('example => [Claim(#1 @ 1,3: 4x4), Claim(#2 @ 3,1: 4x4), Claim(#3 @ 5,5: 2x2)], output => Claim #3', () => {
            let example = [new Claim(1, 1, 3, 4, 4), new Claim(2, 3, 1, 4, 4), new Claim(3, 5, 5, 2, 2)];
            let isolatedClaim = getNonOverlapingClaim(example);
            let expectedClaim = 3;
            expect(isolatedClaim).to.equal(expectedClaim);
        });
    });
});