//day 04
import {readFileSync} from 'fs';

let Event = class{
    constructor(date, event){
        this.date = date;
        this.event = event;
    }
}

function partOne(events){
    console.log('You\'ve sneaked into another supply closet - this time, it\'s across from the prototype suit manufacturing lab. You need to sneak inside and fix the issues with the suit, but there\'s a guard stationed outside the lab, so this is as close as you can safely get.');
    console.log('As you search the closet for anything that might help, you discover that you\'re not the first person to want to sneak in. Covering the walls, someone has spent an hour starting every midnight for the past few months secretly observing this guard post! They\'ve been writing down the ID of the one guard on duty that night - the Elves seem to have decided that one guard was enough for the overnight shift - as well as when they fall asleep or wake up while at their post (your puzzle input).');
    console.log('For example, consider the following records, which have already been organized into chronological order:');
    console.log('[1518-11-01 00:00] Guard #10 begins shift');
    console.log('[1518-11-01 00:05] falls asleep');
    console.log('[1518-11-01 00:25] wakes up');
    console.log('[1518-11-01 00:30] falls asleep');
    console.log('[1518-11-01 00:55] wakes up');
    console.log('[1518-11-01 23:58] Guard #99 begins shift');
    console.log('[1518-11-02 00:40] falls asleep');
    console.log('[1518-11-02 00:50] wakes up');
    console.log('[1518-11-03 00:05] Guard #10 begins shift');
    console.log('[1518-11-03 00:24] falls asleep');
    console.log('[1518-11-03 00:29] wakes up');
    console.log('[1518-11-04 00:02] Guard #99 begins shift');
    console.log('[1518-11-04 00:36] falls asleep');
    console.log('[1518-11-04 00:46] wakes up');
    console.log('[1518-11-05 00:03] Guard #99 begins shift');
    console.log('[1518-11-05 00:45] falls asleep');
    console.log('[1518-11-05 00:55] wakes up');
    console.log('Timestamps are written using year-month-day hour:minute format. The guard falling asleep or waking up is always the one whose shift most recently started. Because all asleep/awake times are during the midnight hour (00:00 - 00:59), only the minute portion (00 - 59) is relevant for those events.');
    console.log('Visually, these records show that the guards are asleep at these times:');
    console.log('Date   ID   Minute');
    console.log('            000000000011111111112222222222333333333344444444445555555555');
    console.log('            012345678901234567890123456789012345678901234567890123456789');
    console.log('11-01  #10  .....####################.....#########################.....');
    console.log('11-02  #99  ........................................##########..........');
    console.log('11-03  #10  ........................#####...............................');
    console.log('11-04  #99  ....................................##########..............');
    console.log('11-05  #99  .............................................##########.....');
    console.log('The columns are Date, which shows the month-day portion of the relevant day; ID, which shows the guard on duty that day; and Minute, which shows the minutes during which the guard was asleep within the midnight hour. (The Minute column\'s header shows the minute\'s ten\'s digit in the first row and the one\'s digit in the second row.) Awake is shown as ., and asleep is shown as #.');
    console.log('Note that guards count as asleep on the minute they fall asleep, and they count as awake on the minute they wake up. For example, because Guard #10 wakes up at 00:25 on 1518-11-01, minute 25 is marked as awake.');
    console.log('If you can figure out the guard most likely to be asleep at a specific time, you might be able to trick that guard into working tonight so you can have the best chance of sneaking in. You have two strategies for choosing the best guard/minute combination.');
    console.log('Strategy 1: Find the guard that has the most minutes asleep. What minute does that guard spend asleep the most?');
    console.log('In the example above, Guard #10 spent the most minutes asleep, a total of 50 minutes (20+25+5), while Guard #99 only slept for a total of 30 minutes (10+10+10). Guard #10 was asleep most during minute 24 (on two days, whereas any other minute the guard was asleep was only seen on one day).');
    console.log('While this example listed the entries in chronological order, your entries are in the order you found them. You\'ll need to organize them before they can be analyzed.');
    console.log('What is the ID of the guard you chose multiplied by the minute you chose? (In the above example, the answer would be 10 * 24 = 240.)');
    console.log('-----------------------------------');
    console.log('Your puzzle answer was  ' + calculateStrategy1(events));
    console.log('-----------------------------------');
}

function calculateStrategy1(events){
    let guardsSleeping = getGuardsSleepingTime(events);
    let laziestGuard = getLaziestGuard(guardsSleeping);
    let mostSleptMinute = getMostSleptMinute(guardsSleeping[laziestGuard]);

    return parseInt(laziestGuard)*mostSleptMinute;
}

function getGuardsSleepingTime(events){
    let guardsSleeping = {};
    let shiftBeginRegEx = /Guard \#(\d+) begins shift/;
    let guardInShift = undefined;
    let startAsleep = undefined;
    events.forEach(e => {
        if (shiftBeginRegEx.test(e.event)){
            guardInShift = e.event.match(shiftBeginRegEx)[1];
            if (!guardsSleeping.hasOwnProperty(guardInShift)){
                guardsSleeping[guardInShift] = new Array(60);
                for (let i = 0; i < 60; i++){
                    guardsSleeping[guardInShift][i] = 0;
                }
            }
        }
        if (e.event === 'falls asleep'){
            startAsleep = e.date;
        }
        if (e.event === 'wakes up'){
            let startMin = startAsleep.getMinutes();
            let endMin = e.date.getMinutes();
            for (let i = startMin; i < endMin; i++){
                guardsSleeping[guardInShift][i]++;
            }
        }
    });

    return guardsSleeping;
}

function getLaziestGuard(guardsSleeping){
    let laziestGuard = undefined;
    let maxSleepingHours = 0;
    for (let guard in guardsSleeping){
        let minsSlept = 0;
        guardsSleeping[guard].forEach(hour => {
            minsSlept += hour;
        });
        if (minsSlept > maxSleepingHours){
            maxSleepingHours = minsSlept;
            laziestGuard = guard;
        }
    }
    return laziestGuard;
}

function getMostSleptMinute(sleepingArray){
    let mostSleptMinute = 0;
    for (let i = 1; i < sleepingArray.length; i++){
        if (sleepingArray[mostSleptMinute] < sleepingArray[i]){
            mostSleptMinute = i;
        }
    }
    return mostSleptMinute;
}

function partTwo(events){
    console.log('--- Part Two ---');
    console.log('Strategy 2: Of all guards, which guard is most frequently asleep on the same minute?');
    console.log('In the example above, Guard #99 spent minute 45 asleep more than any other guard or minute - three times in total. (In all other cases, any guard spent any minute asleep at most twice.)');
    console.log('What is the ID of the guard you chose multiplied by the minute you chose? (In the above example, the answer would be 99 * 45 = 4455.)');
    console.log('-----------------------------------');
    console.log("Your puzzle answer was  " + calculateStrategy2(events));
    console.log('-----------------------------------');
}

function calculateStrategy2(events){
    let guardsSleeping = getGuardsSleepingTime(events);
    let guardid = undefined;
    let mostSleptMinute = 0;

    for (let guard in guardsSleeping){
        console.log("guard => " + guard);
        let guardMostSleptMin = getMaxInMinArray(guardsSleeping[guard]);
        console.log("most slept minute => " + guardMostSleptMin);
        if (guardid === undefined || (mostSleptMinute <= guardMostSleptMin)){
            guardid = guard;
            mostSleptMinute = guardMostSleptMin;
        }
    }

    console.log("guard => " + guardid);
    console.log("most slept minute => " + mostSleptMinute);

    return parseInt(guardid)*mostSleptMinute;
}

function getMaxInMinArray(minArray){
    let maxMin = 0;
    for (let i = 1; i < minArray.length; i++){
        if (minArray[maxMin] < minArray[i]){
            maxMin = i;
        }
    }
    return maxMin;
}

function day04(){
    console.log("--- Day 4: Repose Record ---");
    let events = readLog(); 
    partOne(events);
    partTwo(events);
    console.log('\n\n');
}

function readLog(){
    let fileContent = readFileSync('resources/day04_input.txt', 'utf8');
    let events = [];
    let eventRegex = /\[(\d{4}\-\d{2}\-\d{2} \d{2}:\d{2})\] (.*)/;
    fileContent.split('\n').forEach(line => {
        if (eventRegex.test(line)){
            let regexResult = line.match(eventRegex);
            let date = new Date(regexResult[1]);
            let event = new Event(date, regexResult[2]);
            events.push(event);
        }
    });
    events.sort(function(a, b) {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
    });
    events.forEach(e => {
        console.log(e.date + ' -- ' + e.event);
    });
    return events;
}

export { day04, Event, getGuardsSleepingTime, getLaziestGuard, getMostSleptMinute, calculateStrategy1, calculateStrategy2 };