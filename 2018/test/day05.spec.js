import {expect}  from 'chai';
import { removeReactingUnits, createShortestPolymer } from '../src/day05';

describe('Day 05', () => {

    describe('Part 1', () => {
        it('should remove reacting units for polymer (dabAcCaCBAcCcaDA => dabCBAcaDA)', () => {
            let polymner ='dabAcCaCBAcCcaDA';
            let stablePolymer = removeReactingUnits(polymner);
            let expectedStablePolymer = 'dabCBAcaDA';

            expect(stablePolymer).to.equal(expectedStablePolymer);
        });
        it('should remove all units if all of them are reacting (aA => \'\')', () => {
            let polymner ='aA';
            let stablePolymer = removeReactingUnits(polymner);
            let expectedStablePolymer = '';

            expect(stablePolymer).to.equal(expectedStablePolymer);
        });
        it('should remove all units if all of them are reacting recursively (abBA => \'\')', () => {
            let polymner ='abBA';
            let stablePolymer = removeReactingUnits(polymner);
            let expectedStablePolymer = '';

            expect(stablePolymer).to.equal(expectedStablePolymer);
        });
        it('should not remove any unit if they do not react (abAB)', () => {
            let polymner ='abAB';
            let stablePolymer = removeReactingUnits(polymner);
            let expectedStablePolymer = 'abAB';

            expect(stablePolymer).to.equal(expectedStablePolymer);
        });
    });
    describe('Part 2', () => {
        it('should get the shortes polymer for dabAcCaCBAcCcaDA by removing all C/c', () => {
            let polymner ='dabAcCaCBAcCcaDA';
            let lengthShortestPolymer = createShortestPolymer(polymner);
            let expectedShortestPolymer = 4;

            expect(lengthShortestPolymer).to.equal(expectedShortestPolymer);
        });
    });
});