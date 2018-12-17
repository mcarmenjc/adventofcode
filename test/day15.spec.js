import {expect}  from 'chai';
import { Player, PLAYER_TYPE, findTarget } from '../src/day15';

describe('Day 15', () => {
    describe('Battle', () => {
        describe('Unit', () => {
            it('should choose the closest enemy to attack', () => {
                let map = [];
                map.push('#######'.split(''));
                map.push('#.....#'.split(''));
                map.push('#...#.#'.split(''));
                map.push('#...#.#'.split(''));
                map.push('#######'.split(''));

                let players = [];
                players.push(new Player(1, 1, 200, PLAYER_TYPE.ELF));
                players.push(new Player(1, 4, 200, PLAYER_TYPE.GOBLIN));
                players.push(new Player(3, 2, 200, PLAYER_TYPE.GOBLIN));
                players.push(new Player(3, 5, 200, PLAYER_TYPE.GOBLIN));
                let target = findTarget(players[0], players, map);
                let expectedTarget = new Player(1, 4, 200, PLAYER_TYPE.GOBLIN);

                expect(target.row).to.equal(expectedTarget.row);
                expect(target.column).to.equal(expectedTarget.column);
                expect(target.hitPower).to.equal(expectedTarget.hitPower);
                expect(target.type).to.equal(expectedTarget.type);
            });
        });
    });
});