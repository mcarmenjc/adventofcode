import {expect}  from 'chai';
import { Player, PLAYER_TYPE, movePlayer, playRound, playBattle, calculateScoreAfterBattle } from '../src/day15';

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
                players.push(new Player(1, 1, 200, 3, PLAYER_TYPE.ELF));
                players.push(new Player(1, 4, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(3, 2, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(3, 5, 200, 3, PLAYER_TYPE.GOBLIN));
                let [enemyId, distance, nextMove] = movePlayer(players[0], players, map);
                let expectedTarget = 1;

                expect(enemyId).to.equal(expectedTarget);
            });

            it('should move toward the chosen target', () => {
                let map = [];
                map.push('#######'.split(''));
                map.push('#.....#'.split(''));
                map.push('#...#.#'.split(''));
                map.push('#...#.#'.split(''));
                map.push('#######'.split(''));

                let players = [];
                players.push(new Player(1, 1, 200, 3, PLAYER_TYPE.ELF));
                players.push(new Player(1, 4, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(3, 2, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(3, 5, 200, 3, PLAYER_TYPE.GOBLIN));
                let [enemyId, distance, nextMove] = movePlayer(players[0], players, map);
                let expectedNextMove = [1, 2];

                expect(nextMove[0]).to.equal(expectedNextMove[0]);
                expect(nextMove[1]).to.equal(expectedNextMove[1]);
            });

            it('should choose the enemy with the closest distance', () => {
                let map = [];
                map.push('#######'.split(''));
                map.push('#.....#'.split(''));
                map.push('#...#.#'.split(''));
                map.push('#...#.#'.split(''));
                map.push('#######'.split(''));

                let players = [];
                players.push(new Player(1, 1, 200, 3, PLAYER_TYPE.ELF));
                players.push(new Player(1, 4, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(3, 2, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(3, 5, 200, 3, PLAYER_TYPE.GOBLIN));
                let [enemyId, distance, nextMove] = movePlayer(players[0], players, map);
                let expectedDistance = 2;

                expect(distance).to.equal(expectedDistance);
            });
        });
        describe('All units', () => {
            let map;
            let players;
            before(() => {
                map = [];
                map.push('#########'.split(''));
                map.push('#.......#'.split(''));
                map.push('#.......#'.split(''));
                map.push('#.......#'.split(''));
                map.push('#.......#'.split(''));
                map.push('#.......#'.split(''));
                map.push('#.......#'.split(''));
                map.push('#.......#'.split(''));
                map.push('#########'.split(''));
            });

            beforeEach(() => {
                players = [];
                players.push(new Player(1, 1, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(1, 4, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(1, 7, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(4, 1, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(4, 7, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(7, 1, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(7, 4, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(7, 7, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(4, 4, 200, 3, PLAYER_TYPE.ELF));
            });

            it('should move towards enemies after one round', () => {
                playRound(map, players);
                let explectedPlayersPositions = [
                    [1, 2],
                    [2, 4],
                    [1, 6],
                    [4, 2],
                    [3, 4],
                    [3, 7],
                    [6, 1],
                    [6, 4],
                    [6, 7]
                ];
                for(let i = 0; i < players.length; i++){
                    expect(players[i].row).to.equal(explectedPlayersPositions[i][0]);
                    expect(players[i].column).to.equal(explectedPlayersPositions[i][1]);
                }
            });

            it('should move towards enemies after three round', () => {
                for(let i = 0; i < 3; i++){
                    playRound(map, players);
                }

                let explectedPlayersPositions = [
                    [2, 3],
                    [2, 5],
                    [2, 4],
                    [3, 3],
                    [3, 4],
                    [3, 5],
                    [4, 1],
                    [4, 4],
                    [5, 7]
                ];
                for(let i = 0; i < players.length; i++){
                    expect(players[i].row).to.equal(explectedPlayersPositions[i][0]);
                    expect(players[i].column).to.equal(explectedPlayersPositions[i][1]);
                }
            });
        });

        describe('Attack', () => {
            let map;
            let players;
            before(() => {
                map = [];
                map.push('#######'.split(''));
                map.push('#.....#'.split(''));
                map.push('#.....#'.split(''));
                map.push('#.#.#.#'.split(''));
                map.push('#...#.#'.split(''));
                map.push('#.....#'.split(''));
                map.push('#######'.split(''));
            });

            beforeEach(() => {
                players = [];
                players.push(new Player(1, 2, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(2, 4, 200, 3, PLAYER_TYPE.ELF));
                players.push(new Player(2, 5, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(3, 5, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(4, 3, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(4, 5, 200, 3, PLAYER_TYPE.ELF));
            });
            it('should be done if an enemy is in range', () => {
                let elfInBattle1 = players[1];
                let elfInBattle2 = players[5];
                let goblinInBattle1 = players[2];
                let goblinInBattle2 = players[3];
                playRound(map, players);
                let expectedHitPoints = 197;
                expect(elfInBattle1.hitPoints).to.equal(expectedHitPoints);
                expect(elfInBattle2.hitPoints).to.equal(expectedHitPoints);
                expect(goblinInBattle1.hitPoints).to.equal(expectedHitPoints);
                expect(goblinInBattle2.hitPoints).to.equal(expectedHitPoints);
            });
            it('should be done after moving if an enemy is in range', () => {
                let elfInBattle1 = players[1];
                let elfInBattle2 = players[5];
                let goblinInBattle1 = players[2];
                let goblinInBattle2 = players[3];
                playRound(map, players);
                playRound(map, players);
                let expectedHitPoints1 = 188;
                let expectedHitPoints2 = 194;
                expect(elfInBattle1.hitPoints).to.equal(expectedHitPoints1);
                expect(elfInBattle2.hitPoints).to.equal(expectedHitPoints2);
                expect(goblinInBattle1.hitPoints).to.equal(expectedHitPoints2);
                expect(goblinInBattle2.hitPoints).to.equal(expectedHitPoints2);
            });
            it('should be done until unit is dead', () => {
                let elf = players[1];
                expect(elf.isDead()).to.be.false;
                for(let i = 0; i < 23; i++){
                    playRound(map, players);
                }
                expect(elf.isDead()).to.be.true;
            });
        });
        it('should be finished when all unit from one side are dead', () => {
            let map = [];
            let players = [];
            
            map.push('#######'.split(''));
            map.push('#.....#'.split(''));
            map.push('#.....#'.split(''));
            map.push('#.#.#.#'.split(''));
            map.push('#...#.#'.split(''));
            map.push('#.....#'.split(''));
            map.push('#######'.split(''));
        
            players.push(new Player(1, 2, 200, 3, PLAYER_TYPE.GOBLIN));
            players.push(new Player(2, 4, 200, 3, PLAYER_TYPE.ELF));
            players.push(new Player(2, 5, 200, 3, PLAYER_TYPE.GOBLIN));
            players.push(new Player(3, 5, 200, 3, PLAYER_TYPE.GOBLIN));
            players.push(new Player(4, 3, 200, 3, PLAYER_TYPE.GOBLIN));
            players.push(new Player(4, 5, 200, 3, PLAYER_TYPE.ELF));

            let rounds = playBattle(map, players);

            players.forEach(p => {
                if(p.type === PLAYER_TYPE.ELF){
                    expect(p.isDead()).to.be.true;
                }
            });
        });

        it('should be finished after 47 rounds for the specific setup', () => {
            let map = [];
            let players = [];
            
            map.push('#######'.split(''));
            map.push('#.....#'.split(''));
            map.push('#.....#'.split(''));
            map.push('#.#.#.#'.split(''));
            map.push('#...#.#'.split(''));
            map.push('#.....#'.split(''));
            map.push('#######'.split(''));
        
            players.push(new Player(1, 2, 200, 3, PLAYER_TYPE.GOBLIN));
            players.push(new Player(2, 4, 200, 3, PLAYER_TYPE.ELF));
            players.push(new Player(2, 5, 200, 3, PLAYER_TYPE.GOBLIN));
            players.push(new Player(3, 5, 200, 3, PLAYER_TYPE.GOBLIN));
            players.push(new Player(4, 3, 200, 3, PLAYER_TYPE.GOBLIN));
            players.push(new Player(4, 5, 200, 3, PLAYER_TYPE.ELF));

            let rounds = playBattle(map, players);
            let expectedRounds = 47;
            expect(rounds).to.equal(expectedRounds);
        });

        it('should be finished after 37 rounds for the specific setup', () => {
            let map = [];
            let players = [];
            
            map.push('#######'.split(''));
            map.push('#...#.#'.split(''));
            map.push('#.#...#'.split(''));
            map.push('#..##.#'.split(''));
            map.push('#...#.#'.split(''));
            map.push('#.....#'.split(''));
            map.push('#######'.split(''));
        
            players.push(new Player(1, 1, 200, 3, PLAYER_TYPE.GOBLIN));
            players.push(new Player(1, 5, 200, 3, PLAYER_TYPE.ELF));
            players.push(new Player(2, 1, 200, 3, PLAYER_TYPE.ELF));
            players.push(new Player(2, 3, 200, 3, PLAYER_TYPE.ELF));
            players.push(new Player(2, 5, 200, 3, PLAYER_TYPE.ELF));
            players.push(new Player(3, 1, 200, 3, PLAYER_TYPE.GOBLIN));
            players.push(new Player(4, 5, 200, 3, PLAYER_TYPE.ELF));
            players.push(new Player(5, 4, 200, 3, PLAYER_TYPE.ELF));

            let rounds = playBattle(map, players);
            let expectedRounds = 37;
            expect(rounds).to.equal(expectedRounds);
        });

        it('should be finished after 46 rounds for the specific setup', () => {
            let map = [];
            let players = [];
            
            map.push('#######'.split(''));
            map.push('#.....#'.split(''));
            map.push('#.#...#'.split(''));
            map.push('#..##.#'.split(''));
            map.push('#...#.#'.split(''));
            map.push('#...#.#'.split(''));
            map.push('#######'.split(''));
        
            players.push(new Player(1, 1, 200, 3, PLAYER_TYPE.ELF));
            players.push(new Player(1, 4, 200, 3, PLAYER_TYPE.ELF));
            players.push(new Player(1, 5, 200, 3, PLAYER_TYPE.GOBLIN));
            players.push(new Player(2, 3, 200, 3, PLAYER_TYPE.GOBLIN));
            players.push(new Player(2, 5, 200, 3, PLAYER_TYPE.ELF));
            players.push(new Player(3, 1, 200, 3, PLAYER_TYPE.ELF));
            players.push(new Player(3, 5, 200, 3, PLAYER_TYPE.ELF));
            players.push(new Player(4, 1, 200, 3, PLAYER_TYPE.GOBLIN));
            players.push(new Player(5, 3, 200, 3, PLAYER_TYPE.ELF));

            let rounds = playBattle(map, players);
            let expectedRounds = 46;
            expect(rounds).to.equal(expectedRounds);
        });

        it('should be finished after 35 rounds for the specific setup', () => {
            let map = [];
            let players = [];
            
            map.push('#######'.split(''));
            map.push('#...#.#'.split(''));
            map.push('#.#...#'.split(''));
            map.push('#..#..#'.split(''));
            map.push('#...#.#'.split(''));
            map.push('#.....#'.split(''));
            map.push('#######'.split(''));
        
            players.push(new Player(1, 1, 200, 3, PLAYER_TYPE.ELF));
            players.push(new Player(1, 3, 200, 3, PLAYER_TYPE.GOBLIN));
            players.push(new Player(2, 3, 200, 3, PLAYER_TYPE.GOBLIN));
            players.push(new Player(3, 1, 200, 3, PLAYER_TYPE.GOBLIN));
            players.push(new Player(3, 5, 200, 3, PLAYER_TYPE.GOBLIN));
            players.push(new Player(4, 1, 200, 3, PLAYER_TYPE.GOBLIN));
            players.push(new Player(5, 4, 200, 3, PLAYER_TYPE.ELF));

            let rounds = playBattle(map, players);
            let expectedRounds = 35;
            expect(rounds).to.equal(expectedRounds);
        });

        it('should be finished after 54 rounds for the specific setup', () => {
            let map = [];
            let players = [];
            
            map.push('#######'.split(''));
            map.push('#.....#'.split(''));
            map.push('#.#...#'.split(''));
            map.push('#.###.#'.split(''));
            map.push('#.#.#.#'.split(''));
            map.push('#...#.#'.split(''));
            map.push('#######'.split(''));
        
            players.push(new Player(1, 2, 200, 3, PLAYER_TYPE.ELF));
            players.push(new Player(2, 5, 200, 3, PLAYER_TYPE.GOBLIN));
            players.push(new Player(4, 1, 200, 3, PLAYER_TYPE.ELF));
            players.push(new Player(4, 3, 200, 3, PLAYER_TYPE.GOBLIN));
            players.push(new Player(4, 5, 200, 3, PLAYER_TYPE.GOBLIN));
            players.push(new Player(5, 5, 200, 3, PLAYER_TYPE.GOBLIN));

            let rounds = playBattle(map, players);
            let expectedRounds = 54;
            expect(rounds).to.equal(expectedRounds);
        });

        it('should be finished after 20 rounds for the specific setup', () => {
            let map = [];
            let players = [];
            
            map.push('#########'.split(''));
            map.push('#.......#'.split(''));
            map.push('#...#...#'.split(''));
            map.push('#..##...#'.split(''));
            map.push('#...##..# '.split(''));
            map.push('#...#...#'.split(''));
            map.push('#.......#'.split(''));
            map.push('#.......#'.split(''));
            map.push('#########'.split(''));
        
            players.push(new Player(1, 1, 200, 3, PLAYER_TYPE.GOBLIN));
            players.push(new Player(2, 2, 200, 3, PLAYER_TYPE.ELF));
            players.push(new Player(3, 7, 200, 3, PLAYER_TYPE.GOBLIN));
            players.push(new Player(6, 2, 200, 3, PLAYER_TYPE.GOBLIN));
            players.push(new Player(6, 6, 200, 3, PLAYER_TYPE.GOBLIN));
            players.push(new Player(7, 6, 200, 3, PLAYER_TYPE.GOBLIN));

            let rounds = playBattle(map, players);
            let expectedRounds = 20;
            expect(rounds).to.equal(expectedRounds);
        });

        describe('Score', () => {
            it('should be 27730 after 47 rounds', () => {
                let map = [];
                let players = [];
                
                map.push('#######'.split(''));
                map.push('#.....#'.split(''));
                map.push('#.....#'.split(''));
                map.push('#.#.#.#'.split(''));
                map.push('#...#.#'.split(''));
                map.push('#.....#'.split(''));
                map.push('#######'.split(''));
            
                players.push(new Player(1, 2, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(2, 4, 200, 3, PLAYER_TYPE.ELF));
                players.push(new Player(2, 5, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(3, 5, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(4, 3, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(4, 5, 200, 3, PLAYER_TYPE.ELF));
    
                let score = calculateScoreAfterBattle(map, players);
                let expectedScore = 27730;
                expect(score).to.equal(expectedScore);
            });
    
            it('should be 36334 after 37 rounds', () => {
                let map = [];
                let players = [];
                
                map.push('#######'.split(''));
                map.push('#...#.#'.split(''));
                map.push('#.#...#'.split(''));
                map.push('#..##.#'.split(''));
                map.push('#...#.#'.split(''));
                map.push('#.....#'.split(''));
                map.push('#######'.split(''));
            
                players.push(new Player(1, 1, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(1, 5, 200, 3, PLAYER_TYPE.ELF));
                players.push(new Player(2, 1, 200, 3, PLAYER_TYPE.ELF));
                players.push(new Player(2, 3, 200, 3, PLAYER_TYPE.ELF));
                players.push(new Player(2, 5, 200, 3, PLAYER_TYPE.ELF));
                players.push(new Player(3, 1, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(4, 5, 200, 3, PLAYER_TYPE.ELF));
                players.push(new Player(5, 4, 200, 3, PLAYER_TYPE.ELF));
    
                let score = calculateScoreAfterBattle(map, players);
                let expectedScore = 36334;
                expect(score).to.equal(expectedScore);
            });
    
            it('should be 39514 after 46 rounds', () => {
                let map = [];
                let players = [];
                
                map.push('#######'.split(''));
                map.push('#.....#'.split(''));
                map.push('#.#...#'.split(''));
                map.push('#..##.#'.split(''));
                map.push('#...#.#'.split(''));
                map.push('#...#.#'.split(''));
                map.push('#######'.split(''));
            
                players.push(new Player(1, 1, 200, 3, PLAYER_TYPE.ELF));
                players.push(new Player(1, 4, 200, 3, PLAYER_TYPE.ELF));
                players.push(new Player(1, 5, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(2, 3, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(2, 5, 200, 3, PLAYER_TYPE.ELF));
                players.push(new Player(3, 1, 200, 3, PLAYER_TYPE.ELF));
                players.push(new Player(3, 5, 200, 3, PLAYER_TYPE.ELF));
                players.push(new Player(4, 1, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(5, 3, 200, 3, PLAYER_TYPE.ELF));
    
                let score = calculateScoreAfterBattle(map, players);
                let expectedScore = 39514;
                expect(score).to.equal(expectedScore);
            });
    
            it('should be 27755 after 35 rounds', () => {
                let map = [];
                let players = [];
                
                map.push('#######'.split(''));
                map.push('#...#.#'.split(''));
                map.push('#.#...#'.split(''));
                map.push('#..#..#'.split(''));
                map.push('#...#.#'.split(''));
                map.push('#.....#'.split(''));
                map.push('#######'.split(''));
            
                players.push(new Player(1, 1, 200, 3, PLAYER_TYPE.ELF));
                players.push(new Player(1, 3, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(2, 3, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(3, 1, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(3, 5, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(4, 1, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(5, 4, 200, 3, PLAYER_TYPE.ELF));
    
                let score = calculateScoreAfterBattle(map, players);
                let expectedScore = 27755;
                expect(score).to.equal(expectedScore);
            });
    
            it('should be 28944 after 54 rounds', () => {
                let map = [];
                let players = [];
                
                map.push('#######'.split(''));
                map.push('#.....#'.split(''));
                map.push('#.#...#'.split(''));
                map.push('#.###.#'.split(''));
                map.push('#.#.#.#'.split(''));
                map.push('#...#.#'.split(''));
                map.push('#######'.split(''));
            
                players.push(new Player(1, 2, 200, 3, PLAYER_TYPE.ELF));
                players.push(new Player(2, 5, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(4, 1, 200, 3, PLAYER_TYPE.ELF));
                players.push(new Player(4, 3, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(4, 5, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(5, 5, 200, 3, PLAYER_TYPE.GOBLIN));
    
                let score = calculateScoreAfterBattle(map, players);
                let expectedScore = 28944;
                expect(score).to.equal(expectedScore);
            });
    
            it('should be 18740 after 20 rounds', () => {
                let map = [];
                let players = [];
                
                map.push('#########'.split(''));
                map.push('#.......#'.split(''));
                map.push('#...#...#'.split(''));
                map.push('#..##...#'.split(''));
                map.push('#...##..# '.split(''));
                map.push('#...#...#'.split(''));
                map.push('#.......#'.split(''));
                map.push('#.......#'.split(''));
                map.push('#########'.split(''));
            
                players.push(new Player(1, 1, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(2, 2, 200, 3, PLAYER_TYPE.ELF));
                players.push(new Player(3, 7, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(6, 2, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(6, 6, 200, 3, PLAYER_TYPE.GOBLIN));
                players.push(new Player(7, 6, 200, 3, PLAYER_TYPE.GOBLIN));
    
                let score = calculateScoreAfterBattle(map, players);
                let expectedScore = 18740;
                expect(score).to.equal(expectedScore);
            });
        });
    });
});