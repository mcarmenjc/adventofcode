import {expect}  from 'chai';
import { GroundSlice } from '../src/day17';

describe('Day 17', () => {
    describe('Water', () => {
        let groundSlice;
        beforeEach(() => {
            groundSlice = new GroundSlice(14, 508, 495, 506, 1, 13);
            groundSlice.fillColumnWithClay(495, 2, 7);
            groundSlice.fillColumnWithClay(501, 3, 7);
            groundSlice.fillColumnWithClay(498, 2, 4);
            groundSlice.fillColumnWithClay(506, 1, 2);
            groundSlice.fillColumnWithClay(498, 10, 13);
            groundSlice.fillColumnWithClay(504, 10, 13);
            groundSlice.fillRowWithClay(7, 495, 501);
            groundSlice.fillRowWithClay(13, 498, 504);
        });
        it('should flow down when current cell is ground', () => {
            let water = [0, 500, '|'];
            let next = groundSlice.flowDown(water);
            let expectedNext = [water[0]+1, water[1], water[2]];
            for(let i = 0; i < next.length; i++){
                expect(next[i]).to.equal(expectedNext[i]);
            }
        });
        it('should change to horizontal when a clay bucket is reached', () => {
            let water = [7, 500, '|'];
            let next = groundSlice.flowDown(water);
            let expectedNext = [water[0]-1, water[1], '~'];
            for(let i = 0; i < next.length; i++){
                expect(next[i]).to.equal(expectedNext[i]);
            }
        });
        it('should change to horizontal when water is reached', () => {
            for(let i = 494; i <= 502; i++){
                groundSlice.ground[1][i] = '|';
            }
            let water = [1, 500, '|'];
            let next = groundSlice.flowDown(water);
            let expectedNext = [water[0], water[1], undefined];
            for(let i = 0; i < next.length; i++){
                expect(next[i]).to.equal(expectedNext[i]);
            }
        });
        it('should just continue flowing when flooded bucket reached', () => {
            for(let i = 496; i <= 500; i++){
                groundSlice.ground[6][i] = '~';
            }
            let water = [6, 500, '|'];
            let next = groundSlice.flowDown(water);
            let expectedNext = [water[0]-1, water[1], '~'];
            for(let i = 0; i < next.length; i++){
                expect(next[i]).to.equal(expectedNext[i]);
            }
        });
        it('should flow and fill the clay sockets', () => {
            let waterSpring = [0, 500];
            groundSlice.flowWater(waterSpring);
            let flooded = groundSlice.countFlooded();
            let expectedFlooded = 57;
            expect(flooded).to.equal(expectedFlooded);
        });
        it('should stay in clays and dry from everywhere else', () => {
            let waterSpring = [0, 500];
            groundSlice.flowWater(waterSpring);
            let water = groundSlice.countNotDriedWater();
            let expectedWater = 29;
            expect(water).to.equal(expectedWater);
        });
    });
});