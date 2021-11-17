import {expect}  from 'chai';
import { Point, calculateSizeOfLongestArea, calculateLongestRegionWithInDistance, getClosestPoint, createGridWithClosestPoints, removeInfiniteAreasFromGrid, calculateGridWithDistancesToPoints } from '../src/day06';

describe('Day 06', () => {
    let points = [];
    before(() => {
        points.push(new Point(1, 1));
        points.push(new Point(1, 6));
        points.push(new Point(8, 3));
        points.push(new Point(3, 4));
        points.push(new Point(5, 5));
        points.push(new Point(8, 9));
    });

    describe('Part 1', () => {
        it('should calculate point at 0 as the closest point to (1, 2)', () => {
            let point = new Point(1, 2);
            let closestPoint = getClosestPoint(point, points);
            let expectedClosestPoint = 0;

            expect(closestPoint).to.equal(expectedClosestPoint);
        });
        it('should calculate no closest point to (1, 5)', () => {
            let point = new Point(5, 1);
            let closestPoint = getClosestPoint(point, points);
            let expectedClosestPoint = -1;

            expect(closestPoint).to.equal(expectedClosestPoint);
        });
        it('should create the correct grid with the closest points', () => {
            let expectedGrid = [];
            expectedGrid.push([0, 0, 0, 0, -1, 2, 2, 2]);
            expectedGrid.push([0, 0, 3, 3, 4, 2, 2, 2]);
            expectedGrid.push([0, 3, 3, 3, 4, 2, 2, 2]);
            expectedGrid.push([-1, 3, 3, 3, 4, 4, 2, 2]);
            expectedGrid.push([1, -1, 3, 4, 4, 4, 4, 2]);
            expectedGrid.push([1, 1, -1, 4, 4, 4, 4, -1]);
            expectedGrid.push([1, 1, -1, 4, 4, 4, 5, 5]);
            expectedGrid.push([1, 1, -1, 4, 4, 5, 5, 5]);
            expectedGrid.push([1, 1, -1, 5, 5, 5, 5, 5]);
            let grid = createGridWithClosestPoints(points);

            expect(grid.length).to.equal(expectedGrid.length);

            for(let i = 0; i < grid.length; i++){
                expect(grid[i].length).to.equal(expectedGrid[i].length);
                for (let j = 0; j < grid[i].length; j++){
                    expect(grid[i][j]).to.equal(expectedGrid[i][j]);
                }
            }
        });
        it('should remove the infinite areas from the grid', () => {
            let expectedGrid = [];
            expectedGrid.push([-1, -1, -1, -1, -1, -1, -1, -1]);
            expectedGrid.push([-1, -1, 3, 3, 4, -1, -1, -1]);
            expectedGrid.push([-1, 3, 3, 3, 4, -1, -1, -1]);
            expectedGrid.push([-1, 3, 3, 3, 4, 4, -1, -1]);
            expectedGrid.push([-1, -1, 3, 4, 4, 4, 4, -1]);
            expectedGrid.push([-1, -1, -1, 4, 4, 4, 4, -1]);
            expectedGrid.push([-1, -1, -1, 4, 4, 4, -1, -1]);
            expectedGrid.push([-1, -1, -1, 4, 4, -1, -1, -1]);
            expectedGrid.push([-1, -1, -1, -1, -1, -1, -1, -1]);
            let grid = createGridWithClosestPoints(points);
            removeInfiniteAreasFromGrid(grid);

            expect(grid.length).to.equal(expectedGrid.length);

            for(let i = 0; i < grid.length; i++){
                expect(grid[i].length).to.equal(expectedGrid[i].length);
                for (let j = 0; j < grid[i].length; j++){
                    expect(grid[i][j]).to.equal(expectedGrid[i][j]);
                }
            }
        });
        it('should get the largest non infinite area = 17', () => {
            let longestArea = calculateSizeOfLongestArea(points);
            let expectedArea = 17;

            expect(longestArea).to.equal(expectedArea);
        });
    });
    describe('Part 2', () => {
        it('should create the correct grid within distance (32)', () => {
            let expectedGrid = [];
            expectedGrid.push([0, 0, 0, 0, 0, 0, 0, 0]);
            expectedGrid.push([0, 0, 0, 0, 0, 0, 0, 0]);
            expectedGrid.push([0, 0, 30, 30, 30, 0, 0, 0]);
            expectedGrid.push([0, 30, 28, 28, 28, 30, 0, 0]);
            expectedGrid.push([0, 30, 28, 28, 28, 30, 0, 0]);
            expectedGrid.push([0, 0, 30, 30, 30, 0, 0, 0]);
            expectedGrid.push([0, 0, 0, 0, 0, 0, 0, 0]);
            expectedGrid.push([0, 0, 0, 0, 0, 0, 0, 0]);
            expectedGrid.push([0, 0, 0, 0, 0, 0, 0, 0]);
            let grid = calculateGridWithDistancesToPoints(points, 32);

            expect(grid.length).to.equal(expectedGrid.length);

            for(let i = 0; i < grid.length; i++){
                expect(grid[i].length).to.equal(expectedGrid[i].length);
                for (let j = 0; j < grid[i].length; j++){
                    expect(grid[i][j]).to.equal(expectedGrid[i][j]);
                }
            }
        });
        it('should get the area within a max distance of 32', () => {
            let area = calculateLongestRegionWithInDistance(points, 32);
            let expectedArea = 16;

            expect(area).to.equal(expectedArea);
        });
    });
});