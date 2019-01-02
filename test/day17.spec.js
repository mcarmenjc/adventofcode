import {expect}  from 'chai';
import { GroundSlice } from '../src/day17';

describe('Day 17', () => {
    describe('Water', () => {
        let groundSlice;
        before(() => {
            groundSlice = new GroundSlice(14, 508, 495, 506, 13);
            groundSlice.fillColumnWithClay(495, 2, 7);
            groundSlice.fillColumnWithClay(501, 3, 7);
            groundSlice.fillColumnWithClay(498, 2, 4);
            groundSlice.fillColumnWithClay(506, 1, 2);
            groundSlice.fillColumnWithClay(498, 10, 13);
            groundSlice.fillColumnWithClay(504, 10, 13);
            groundSlice.fillRowWithClay(7, 495, 501);
            groundSlice.fillRowWithClay(13, 498, 504);
        });
        it('should flow and fill the clay sockets', () => {
            let waterSpring = [0, 500];
            groundSlice.flowWater(waterSpring);
            let flooded = groundSlice.countFlooded();
            let expectedFlooded = 57;
            expect(flooded).to.equal(expectedFlooded);
        });
    });
});