import {expect}  from 'chai';
import { calculatePowerForCell, fillPowerGrid, findRegionWithLargestTotalPowerForSquareSize, findRegionWithLargestTotalPower } from '../src/day11';

describe('Day 11', () => {
    describe('Power Grid', () => {
        it('should contain 4 for cell (3, 5) and grid serial number 8', () => {
            let expectedPower = 4;
            let gridSerialNumber = 8;
            let x = 3;
            let y = 5;
            let powerLevel = calculatePowerForCell(x, y, gridSerialNumber);
            expect(powerLevel).to.equal(expectedPower);
        });
        it('should contain -5 for cell (122, 79) and grid serial number 57', () => {
            let expectedPower = -5;
            let gridSerialNumber = 57;
            let x = 122;
            let y = 79;
            let powerLevel = calculatePowerForCell(x, y, gridSerialNumber);
            expect(powerLevel).to.equal(expectedPower);
        });
        it('should contain 0 for cell (217, 196) and grid serial number 39', () => {
            let expectedPower = 0;
            let gridSerialNumber = 39;
            let x = 217;
            let y = 196;
            let powerLevel = calculatePowerForCell(x, y, gridSerialNumber);
            expect(powerLevel).to.equal(expectedPower);
        });
        it('should contain 4 for cell (101, 153) and grid serial number 71', () => {
            let expectedPower = 4;
            let gridSerialNumber = 71;
            let x = 101;
            let y = 153;
            let powerLevel = calculatePowerForCell(x, y, gridSerialNumber);
            expect(powerLevel).to.equal(expectedPower);
        });
        it('should contain 4 for cell (33, 45) and grid serial number 18', () => {
            let expectedPower = 4;
            let gridSerialNumber = 18;
            let x = 33;
            let y = 45;
            let powerLevel = calculatePowerForCell(x, y, gridSerialNumber);
            expect(powerLevel).to.equal(expectedPower);
        });
    });
    describe('Part 1', () => {
        it('should find max power at square starting at 33,45 with serial number 18', () => {
            let gridSerialNumber = 18;
            let grid = fillPowerGrid(gridSerialNumber)
            let coords = findRegionWithLargestTotalPowerForSquareSize(grid, 3);
            let expectedCoords = {'x': 33, 'y': 45};

            expect(coords.x).to.equal(expectedCoords.x);
            expect(coords.y).to.equal(expectedCoords.y);
        });

        it('should find max power at square starting at 21,61 with serial number 42', () => {
            let gridSerialNumber = 42;
            let grid = fillPowerGrid(gridSerialNumber)
            let coords = findRegionWithLargestTotalPowerForSquareSize(grid, 3);
            let expectedCoords = {'x': 21, 'y': 61};

            expect(coords.x).to.equal(expectedCoords.x);
            expect(coords.y).to.equal(expectedCoords.y);
        });
    });
    describe('Part 2', () => {
        it('should find max power at square starting at 90,269 with square size 16 and serial number 18', () => {
            let gridSerialNumber = 18;
            let coords = findRegionWithLargestTotalPower(gridSerialNumber);
            let expectedCoords = '90,269,16';

            expect(coords).to.equal(expectedCoords);
        });

        it('should find max power at square starting at 232,251 with square size 12 and serial number 42', () => {
            let gridSerialNumber = 42;
            let coords = findRegionWithLargestTotalPower(gridSerialNumber);
            let expectedCoords = '232,251,12';

            expect(coords).to.equal(expectedCoords);
        });
    });
});