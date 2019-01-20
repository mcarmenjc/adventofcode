import {expect}  from 'chai';
import { Forest } from '../src/day18';

describe('Day 18', () => {
    describe('Acres', () => {
        let forest;
        beforeEach(() => {
            forest = new Forest();
            forest.acres.push('.#.#...|#.'.split(''));
            forest.acres.push('.....#|##|'.split(''));
            forest.acres.push('.|..|...#.'.split(''));
            forest.acres.push('..|#.....#'.split(''));
            forest.acres.push('#.#|||#|#|'.split(''));
            forest.acres.push('...#.||...'.split(''));
            forest.acres.push('.|....|...'.split(''));
            forest.acres.push('||...#|.#|'.split(''));
            forest.acres.push('|.||||..|.'.split(''));
            forest.acres.push('...#.|..|.'.split(''));
        });
        it('should change from open field to trees if they have 3 or more tree neighbours', () => {
            expect(forest.acres[3][4]).to.equal('.');
            forest.changeAcres();
            expect(forest.acres[3][4]).to.equal('|');
        });
        it('should change from trees to lumberyard if they have 3 or more lumberyard neighbours', () => {
            expect(forest.acres[1][9]).to.equal('|');
            forest.changeAcres();
            expect(forest.acres[1][9]).to.equal('#');
        });
        it('should change from lumberyard to openfield if they have no lumberyard neighbours', () => {
            expect(forest.acres[0][1]).to.equal('#');
            forest.changeAcres();
            expect(forest.acres[0][1]).to.equal('.');
        });
        it('should change all acres according to rules by minute', () => {
            forest.changeAcres();
            let expectedForest = [];
            expectedForest.push('.......##.'.split(''));
            expectedForest.push('......|###'.split(''));
            expectedForest.push('.|..|...#.'.split(''));
            expectedForest.push('..|#||...#'.split(''));
            expectedForest.push('..##||.|#|'.split(''));
            expectedForest.push('...#||||..'.split(''));
            expectedForest.push('||...|||..'.split(''));
            expectedForest.push('|||||.||.|'.split(''));
            expectedForest.push('||||||||||'.split(''));
            expectedForest.push('....||..|.'.split(''));

            for (let i = 0; i < expectedForest.length; i++){
                for (let j = 0; j < expectedForest[i].length; j++){
                    expect(forest.acres[i][j]).to.equal(expectedForest[i][j]);
                }
            }
        });
        it("should correctly change acres after 10 minutes", () => {
            forest.changeAcresForXMinutes(10);
            let expectedForest = [];
            expectedForest.push('.||##.....'.split(''));
            expectedForest.push('||###.....'.split(''));
            expectedForest.push('||##......'.split(''));
            expectedForest.push('|##.....##'.split(''));
            expectedForest.push('|##.....##'.split(''));
            expectedForest.push('|##....##|'.split(''));
            expectedForest.push('||##.####|'.split(''));
            expectedForest.push('||#####|||'.split(''));
            expectedForest.push('||||#|||||'.split(''));
            expectedForest.push('||||||||||'.split(''));

            for (let i = 0; i < expectedForest.length; i++){
                for (let j = 0; j < expectedForest[i].length; j++){
                    expect(forest.acres[i][j]).to.equal(expectedForest[i][j]);
                }
            }
        });
        it("should contain 37 wooded acres after 10 minutes", () => {
            forest.changeAcresForXMinutes(10);
            let woodedAcres = forest.countNumberOfWoodedAcres();
            let expectedWoodedAcres = 37;
            expect(woodedAcres).to.equal(expectedWoodedAcres);
        });
        it("should contain 31 lumberyards acres after 10 minutes", () => {
            forest.changeAcresForXMinutes(10);
            let lumberyardAcres = forest.countNumberOfLumberyardAcres();
            let expectedLumberyardAcres = 31;
            expect(lumberyardAcres).to.equal(expectedLumberyardAcres);
        });
        it('should score 37(wooded acres) x 31(lumberyard acres) = 1147 at the end of 10 minutes', () => {
            forest.changeAcresForXMinutes(10);
            let forestScore = forest.calculateResourceValueOfLumberCollection();
            let expectedForestScore = 1147;
            expect(forestScore).to.equal(expectedForestScore);
        });
    });
});