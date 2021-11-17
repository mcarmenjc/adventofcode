import {expect}  from 'chai';
import { playMarbles, calculateWinningScore } from '../src/day09';

describe('Day 09', () => {
    describe('Play marbles', () => {
        it('should calculate the correct score for 9 elves and playing 25 marbles', () => {
            let elves = 9;
            let marbleValue = 25;
            let scores = playMarbles(elves, marbleValue);
            let expectedScores = [0, 0, 0, 0, 32, 0, 0, 0, 0];

            for(let i = 0; i < elves; i++){
                expect(scores[i]).to.equal(expectedScores[i]);
            }
        });
        it('should return 32 as the max score for 9 elves and 25 marbles', () => {
            let elves = 9;
            let marbleValue = 25;
            let maxScore = calculateWinningScore(elves, marbleValue);
            let expectedMaxScore = 32;
            expect(maxScore).to.equal(expectedMaxScore);
        });
        it('should return 8317 as the max score for 10 elves and 1618 marbles', () => {
            let elves = 10;
            let marbleValue = 1618;
            let maxScore = calculateWinningScore(elves, marbleValue);
            let expectedMaxScore = 8317;
            expect(maxScore).to.equal(expectedMaxScore);
        });
        it('should return 146373 as the max score for 13 elves and 7999 marbles', () => {
            let elves = 13;
            let marbleValue = 7999;
            let maxScore = calculateWinningScore(elves, marbleValue);
            let expectedMaxScore = 146373;
            expect(maxScore).to.equal(expectedMaxScore);
        });
        it('should return 2764 as the max score for 17 elves and 1104 marbles', () => {
            let elves = 17;
            let marbleValue = 1104;
            let maxScore = calculateWinningScore(elves, marbleValue);
            let expectedMaxScore = 2764;
            expect(maxScore).to.equal(expectedMaxScore);
        });
        it('should return 54718 as the max score for 21 elves and 6111 marbles', () => {
            let elves = 21;
            let marbleValue = 6111;
            let maxScore = calculateWinningScore(elves, marbleValue);
            let expectedMaxScore = 54718;
            expect(maxScore).to.equal(expectedMaxScore);
        });
        it('should return 37305 as the max score for 30 elves and 5807 marbles', () => {
            let elves = 30;
            let marbleValue = 5807;
            let maxScore = calculateWinningScore(elves, marbleValue);
            let expectedMaxScore = 37305;
            expect(maxScore).to.equal(expectedMaxScore);
        });
    });
});