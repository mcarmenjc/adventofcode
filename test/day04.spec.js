import {expect}  from 'chai';
import {Event, getGuardsSleepingTime, getLaziestGuard, getMostSleptMinute, calculateStrategy1, calculateStrategy2} from '../src/day04'

describe('Day 04', () => {
    let nightEvents = [];
    before(() => {
        nightEvents.push(new Event(new Date('1518-11-01 00:00'), 'Guard #10 begins shift'));
        nightEvents.push(new Event(new Date('1518-11-01 00:05'), 'falls asleep'));
        nightEvents.push(new Event(new Date('1518-11-01 00:25'), 'wakes up'));
        nightEvents.push(new Event(new Date('1518-11-01 00:30'), 'falls asleep'));
        nightEvents.push(new Event(new Date('1518-11-01 00:55'), 'wakes up'));
        nightEvents.push(new Event(new Date('1518-11-01 23:58'), 'Guard #99 begins shift'));
        nightEvents.push(new Event(new Date('1518-11-02 00:40'), 'falls asleep'));
        nightEvents.push(new Event(new Date('1518-11-02 00:50'), 'wakes up'));
        nightEvents.push(new Event(new Date('1518-11-03 00:05'), 'Guard #10 begins shift'));
        nightEvents.push(new Event(new Date('1518-11-03 00:24'), 'falls asleep'));
        nightEvents.push(new Event(new Date('1518-11-03 00:29'), 'wakes up'));
        nightEvents.push(new Event(new Date('1518-11-04 00:02'), 'Guard #99 begins shift'));
        nightEvents.push(new Event(new Date('1518-11-04 00:36'), 'falls asleep'));
        nightEvents.push(new Event(new Date('1518-11-04 00:46'), 'wakes up'));
        nightEvents.push(new Event(new Date('1518-11-05 00:03'), 'Guard #99 begins shift'));
        nightEvents.push(new Event(new Date('1518-11-05 00:45'), 'falls asleep'));
        nightEvents.push(new Event(new Date('1518-11-05 00:55'), 'wakes up'));
    });

    describe('Part 1', () => {
        it('should calculate each guards sleeping array', () => {
            let expectedSleepingTimesGuard10 = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
            let expectedSleepingTimesGuard99 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
            let guardsSleeping = getGuardsSleepingTime(nightEvents);

            expect(guardsSleeping).to.have.property('10');
            expect(guardsSleeping).to.have.property('99');

            for(let i = 0; i < 60; i++){
                expect(guardsSleeping['10'][i]).to.equal(expectedSleepingTimesGuard10[i]);
            }

            for(let i = 0; i < 60; i++){
                expect(guardsSleeping['99'][i]).to.equal(expectedSleepingTimesGuard99[i]);
            }
        });

        it('should return guard 10 as the laziest', () => {
            let expectedLaziestGuard = '10';
            let guardsSleeping = getGuardsSleepingTime(nightEvents);
            let laziestGuard = getLaziestGuard(guardsSleeping);

            expect(laziestGuard).to.equal(expectedLaziestGuard);
        });

        it('should return min 24 as the most slept one for guard 10', () => {
            let expectedMostSleptMin = 24;
            let guardsSleeping = getGuardsSleepingTime(nightEvents);
            let laziestGuard = getLaziestGuard(guardsSleeping);
            let mostSleptMin = getMostSleptMinute(guardsSleeping[laziestGuard]);

            expect(mostSleptMin).to.equal(expectedMostSleptMin);
        });

        it('should calculate strategy 1 as 10 (laziest guard) x 24 (most slept minute) = 240', () => {
            let expectedStrategy1 = 240;
            let strategy1 = calculateStrategy1(nightEvents);

            expect(strategy1).to.equal(expectedStrategy1);
        });
    });
    describe('Part 2', () => {
        it('should calculate strategy 2 as 99 (guard) x 45 (most slept min for this guard) = 4455', () => {
            let expectedStrategy2 = 4455;
            let strategy2 = calculateStrategy2(nightEvents);

            expect(strategy2).to.equal(expectedStrategy2);
        });
    });
});