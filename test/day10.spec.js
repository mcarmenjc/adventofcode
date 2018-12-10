import {expect}  from 'chai';
import { Star, moveStars, drawText, discoverMessageInStars } from '../src/day10';

describe('Day 10', () => {
    let stars = [];
    beforeEach(() => {
        stars = [];
        stars.push(new Star(9,  1, 0,  2));
        stars.push(new Star(7,  0,-1,  0));
        stars.push(new Star(3, -2,-1,  1));
        stars.push(new Star(6, 10,-2, -1));
        stars.push(new Star(2, -4, 2,  2));
        stars.push(new Star(-6, 10, 2, -2));
        stars.push(new Star(1,  8, 1, -1));
        stars.push(new Star(1,  7, 1,  0));
        stars.push(new Star(-3, 11, 1, -2));
        stars.push(new Star(7,  6,-1, -1));
        stars.push(new Star(-2,  3, 1,  0));
        stars.push(new Star(-4,  3, 2,  0));
        stars.push(new Star(10, -3,-1,  1));
        stars.push(new Star(5, 11, 1, -2));
        stars.push(new Star(4,  7, 0, -1));
        stars.push(new Star(8, -2, 0,  1));
        stars.push(new Star(15,  0,-2,  0));
        stars.push(new Star(1,  6, 1,  0));
        stars.push(new Star(8,  9, 0, -1));
        stars.push(new Star(3,  3,-1,  1));
        stars.push(new Star(0,  5, 0, -1));
        stars.push(new Star(-2,  2, 2,  0));
        stars.push(new Star(5, -2, 1,  2));
        stars.push(new Star(1,  4, 2,  1));
        stars.push(new Star(-2,  7, 2, -2));
        stars.push(new Star(3,  6,-1, -1));
        stars.push(new Star(5,  0, 1,  0));
        stars.push(new Star(-6,  0, 2,  0));
        stars.push(new Star(5,  9, 1, -2));
        stars.push(new Star(14,  7,-2,  0));
        stars.push(new Star(-3,  6, 2, -1));
    });
    describe('Stars', () => {
        it('should move depending on its velocity every second', () => {
            let expectedStars = [];
            stars.forEach(s => {
                expectedStars.push(new Star(s.x + s.vx, s.y + s.vy, s.vx, s.vy));
            });
            moveStars(stars);

            for(let i = 0; i < stars.length; i++){
                expect(stars[i].x).to.equal(expectedStars[i].x);
                expect(stars[i].y).to.equal(expectedStars[i].y);
            }
        });
        it('should be drawn on a grid', () => {
            let starsGrid = drawText(stars);
            let expectedGrid = [];
            expectedGrid.push('........#.............'.split(''));
            expectedGrid.push('................#.....'.split(''));
            expectedGrid.push('.........#.#..#.......'.split(''));
            expectedGrid.push('......................'.split(''));
            expectedGrid.push('#..........#.#.......#'.split(''));
            expectedGrid.push('...............#......'.split(''));
            expectedGrid.push('....#.................'.split(''));
            expectedGrid.push('..#.#....#............'.split(''));
            expectedGrid.push('.......#..............'.split(''));
            expectedGrid.push('......#...............'.split(''));
            expectedGrid.push('...#...#.#...#........'.split(''));
            expectedGrid.push('....#..#..#.........#.'.split(''));
            expectedGrid.push('.......#..............'.split(''));
            expectedGrid.push('...........#..#.......'.split(''));
            expectedGrid.push('#...........#.........'.split(''));
            expectedGrid.push('...#.......#..........'.split(''));

            expect(starsGrid.length).to.equal(expectedGrid.length);

            for(let i = 0; i < starsGrid.length; i++){
                expect(starsGrid[i].length).to.equal(expectedGrid[i].length);
                for (let j = 0; j < starsGrid[i].length; j++){
                    expect(starsGrid[i][j]).to.equal(expectedGrid[i][j]);
                }
            }
        });
        it('should move for 3 seconds until the message \'HI\' is generated', () => {
            discoverMessageInStars(stars);
            let starsGrid = drawText(stars);
            let expectedGrid = [];
            expectedGrid.push('#...#..###'.split(''));
            expectedGrid.push('#...#...#.'.split(''));
            expectedGrid.push('#...#...#.'.split(''));
            expectedGrid.push('#####...#.'.split(''));
            expectedGrid.push('#...#...#.'.split(''));
            expectedGrid.push('#...#...#.'.split(''));
            expectedGrid.push('#...#...#.'.split(''));
            expectedGrid.push('#...#..###'.split(''));

            expect(starsGrid.length).to.equal(expectedGrid.length);
            for(let i = 0; i < starsGrid.length; i++){
                expect(starsGrid[i].length).to.equal(expectedGrid[i].length);
                for (let j = 0; j < starsGrid[i].length; j++){
                    expect(starsGrid[i][j]).to.equal(expectedGrid[i][j]);
                }
            }
        });
        it('should move for 3 seconds until the message is generated', () => {
            let secondsMoving = discoverMessageInStars(stars);
            let expectedSeconds = 3;
            expect(secondsMoving).to.equal(expectedSeconds);
        });
    });
    describe('Part 1', () => {
        it('should add all the metadata values for all nodes', () => {
        });
    });
    describe('Part 2', () => {
        it('should calculate the value of the root node', () => {
        });
    });
});