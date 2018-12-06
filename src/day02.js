//day 02

function partOne(labelsList){
    console.log('You stop falling through time, catch your breath, and check the screen on the device. "Destination reached. Current Year: 1518. Current Location: North Pole Utility Closet 83N10." You made it! Now, to find those anomalies.');
    console.log('Outside the utility closet, you hear footsteps and a voice. "...I\'m not sure either. But now that so many people have chimneys, maybe he could sneak in that way?" Another voice responds, "Actually, we\'ve been working on a new kind of suit that would let him fit through tight spaces like that. But, I heard that a few days ago, they lost the prototype fabric, the design plans, everything! Nobody on the team can even seem to remember important details of the project!"');
    console.log('"Wouldn\'t they have had enough fabric to fill several boxes in the warehouse? They\'d be stored together, so the box IDs should be similar. Too bad it would take forever to search the warehouse for two similar box IDs..." They walk too far away to hear any more.');
    console.log('Late at night, you sneak to the warehouse - who knows what kinds of paradoxes you could cause if you were discovered - and use your fancy wrist device to quickly scan every box and produce a list of the likely candidates (your puzzle input).');
    console.log('To make sure you didn\'t miss any, you scan the likely candidate boxes again, counting the number that have an ID containing exactly two of any letter and then separately counting those with exactly three of any letter. You can multiply those two counts together to get a rudimentary checksum and compare it to what your device predicts.');
    console.log('For example, if you see the following box IDs:');
    console.log('abcdef contains no letters that appear exactly two or three times.');
    console.log('bababc contains two a and three b, so it counts for both.');
    console.log('abbcde contains two b, but no letter appears exactly three times.');
    console.log('abcccd contains three c, but no letter appears exactly two times.');
    console.log('aabcdd contains two a and two d, but it only counts once.');
    console.log('abcdee contains two e.');
    console.log('ababab contains three a and three b, but it only counts once.');
    console.log('Of these box IDs, four of them contain a letter which appears exactly twice, and three of them contain a letter which appears exactly three times. Multiplying these together produces a checksum of 4 * 3 = 12.');
    console.log('What is the checksum for your list of box IDs?');
    console.log('-----------------------------------');
    console.log('Your puzzle answer was  ' + calculateChecksum(labelsList));
    console.log('-----------------------------------');
}

function calculateChecksum(listOfBoxLabels){
    let numTwoTimes = 0;
    let numThreeTimes = 0;

    listOfBoxLabels.forEach(boxLabel => {
        let lettersCount = countOfDifferentLetters(boxLabel);
        let containsTwoTimes = false;
        let containsThreeTimes = false;
        for(let letter in lettersCount){
            if(lettersCount[letter] === 2){
                containsTwoTimes = true;
            }
            if(lettersCount[letter] === 3){
                containsThreeTimes = true;
            }
        }
        numTwoTimes += containsTwoTimes ? 1 : 0;
        numThreeTimes += containsThreeTimes ? 1 : 0;
    });

    return numTwoTimes * numThreeTimes;
}

function countOfDifferentLetters(boxLabel){
    let lettersCount = {};

    boxLabel.split('').forEach(letter => {
        if(!lettersCount.hasOwnProperty(letter)){
            lettersCount[letter] = 0;
        }
        lettersCount[letter]++;
    });

    return lettersCount;
}

function partTwo(labelsList){
    console.log('--- Part Two ---');
    console.log('Confident that your list of box IDs is complete, you\'re ready to find the boxes full of prototype fabric.');
    console.log('The boxes will have IDs which differ by exactly one character at the same position in both strings. For example, given the following box IDs:');
    console.log('abcde');
    console.log('fghij');
    console.log('klmno');
    console.log('pqrst');
    console.log('fguij');
    console.log('axcye');
    console.log('wvxyz');
    console.log('The IDs abcde and axcye are close, but they differ by two characters (the second and fourth). However, the IDs fghij and fguij differ by exactly one character, the third (h and u). Those must be the correct boxes.');
    console.log('What letters are common between the two correct box IDs? (In the example above, this is found by removing the differing character from either ID, producing fgij.)');
    console.log('-----------------------------------');
    console.log("Your puzzle answer was  " + findLabelsForSantaSuit(labelsList));
    console.log('-----------------------------------');
}

function findLabelsForSantaSuit(listOfBoxLabels){
    let numLabels = listOfBoxLabels.length;
    for (let i = 0; i < numLabels - 1; i++){
        for (let j = i + 1; j < numLabels; j++){
            let distance = calculateHammingDistance(listOfBoxLabels[i], listOfBoxLabels[j]);
            if (distance === 1){
                return getCommonLetters(listOfBoxLabels[i], listOfBoxLabels[j]);
            }
        }
    }
}

function getCommonLetters(word1, word2){
    let common = '';
    let wordLength = word1.length;
    
    for(let i = 0; i < wordLength; i++){
        if(word1[i] === word2[i]){
            common += word1[i];
        }
    }

    return common;
}

function calculateHammingDistance(word1, word2){
    let distance = 0;
    let wordLength = word1.length;
    
    for(let i = 0; i < wordLength; i++){
        if(word1[i] !== word2[i]){
            distance++;
        }
    }

    return distance;
}

function day02(){
    console.log("--- Day 2: Inventory Management System ---");
    let labelsList = ['cnjxpritdzhubeseewfmqagkul', 'cwyxpgitdzhvbosyewfmqagkul', 'cnfxpritdzhebosywwfmqagkul', 'cnjxpritdzgvbosyawfiqagkul', 'cnkxpritdzhvbosyewfmgagkuh', 'gnjxprhtdzhebosyewfmqagkul', 'cnjxpriedzevbosyewfjqagkul', 'cnjxpritdzhpyosyewfsqagkul', 'cnjxprltdzhvbosyewfmhagkzl', 'cnjxfritdjhvbosyewfmiagkul', 'xnjxpritdzhvbosyewfmqagkgn', 'cnjxpritdzmvzosyewfhqagkul', 'cljxxritdzhvbosyewfmragkul', 'cnjxjritdzhvbovyewfmvagkul', 'cnjxprdtdzhpbosyewvmqagkul', 'cojxprdtdzhzbosyewfmqagkul', 'cnjxpritgzhvfgsyewfmqagkul', 'knjxprptdzhvbosyecfmqagkul', 'cnjxpritdzhvbvsyeyfmqagkuc', 'cnjxpritdzhvbosvewfmoagjul', 'cnjxpritdzhvbosyfwfmbagkjl', 'cnjxpjitazhvbosfewfmqagkul', 'cnjtpfitdzhvbosyewfmiagkul', 'ckjxpritdzhvbysyewfmqagoul', 'cnjxvritdzhvbfsyewfmqalkul', 'cnjipqitdzhvbosyewfeqagkul', 'cnjhpritdzhvbosyewymqjgkul', 'cnjxprrtdzhvbosyewfmlkgkul', 'cnjxnritdzhvbopyewfmqaskul', 'cxjxpritdzhvtosyewjmqagkul', 'cnjxpritdzhvbjsyewfrqagkwl', 'cnjxhritdzhubosyewfmqagvul', 'cnjxpritdzhvbosyyyfmeagkul', 'cnjxkritdzhvaoeyewfmqagkul', 'cnjxpritdzhvtotyewfmqazkul', 'cnjxoriadzhvbosyewfmqcgkul', 'cnjxpritdzhcbosyewfmkapkul', 'fnjxprtddzhvbosyewfmqagkul', 'cnjxmvitdzhvbosyewfmqagrul', 'cnjxpyitdzhibosyewfmqagktl', 'cyjxprxtdzhvbosyewbmqagkul', 'onjxpditdzhvbosyeofmqagkul', 'cnjxprixdzhvbosuewftqagkul', 'cnjxpritdrhvaosyewymqagkul', 'cnjxpritdzhhbokyewfvqagkul', 'cnjxpritczhvbosyewfmqwgxul', 'cnjxpribdzqvbnsyewfmqagkul', 'ynpxpritdzhvbvsyewfmqagkul', 'cnjxprirdzhvboerewfmqagkul', 'cnjxpritdxhvbosyewfmgavkul', 'cnwxprntdzhvbosyewfmqagkuk', 'cnjxpritzzhvbosyewfmcagktl', 'bbjxpritdzhvbosyetfmqagkul', 'cnjxpbitdzhvbosyewrmqagkui', 'cnjxwrildzcvbosyewfmqagkul', 'cnqxpoitdzhvbosnewfmqagkul', 'cnzxpritdzhvbosyewfmqazkfl', 'cnjxpriddzhvoosyewfmhagkul', 'znjxpritdzhvbosjewfmqagkur', 'cnjxpritdzhvbosyewcmfagkuk', 'cnjxpritdzhvbomyywnmqagkul', 'cnjxpgitjzhvbosyejfmqagkul', 'cnjxpkitdzjvbosyewfmqcgkul', 'cnjxpritduhvbosyewfmqfkkul', 'cnfxpritdzhvbgsyewfmqwgkul', 'cnjxpritdzhvbosywufmqaskul', 'cnjxprittzhvboryswfmqagkul', 'cndxpritpzrvbosyewfmqagkul', 'cnjxpritdzhvbosyewfwqazkum', 'cccxprmtdzhvbosyewfmqagkul', 'cnjxpzitdzhvlbsyewfmqagkul', 'cnjxdrigdzhvbosyewfmqagsul', 'fhjxpritdzhvbosyewfmqagkcl', 'cnjxpritdzhvdosyewffqagaul', 'cnjxprikdztvbosyekfmqagkul', 'cnjxpritdzhvbohiewfmqagkue', 'cnjxpritdzhvbowyetfmqegkul', 'cnuxpritdzhvbosyewmmqapkul', 'qnjxpritdzhvbosyewfmjakkul', 'cnjxpritdzlvbosyewiaqagkul', 'cnjxpritdzhpoosyewfmvagkul', 'cdjxpritdzhvboryewfbqagkul', 'cnjxppitxzhvbosyewymqagkul', 'cnjxpywtdzhvboiyewfmqagkul', 'cnjxpritdzpvbosyezfmqaqkul', 'cnjppritdghvbosyewfdqagkul', 'cmjxpritdzhvbosvewfmqagkup', 'cnjxoritdzhvbosylffmqagkul', 'cnjxfritdzhvbojyewfmqagkvl', 'cnjxpritdzhvbozyewgmqlgkul', 'cnjxlritdzhvbosyewfmqalkug', 'cnyxprittzhvbosyewfmsagkul', 'cnjxprytdzcvdosyewfmqagkul', 'ctjxpritdzhvbosyedfmqagkil', 'cnjxpvitdzhrbosyewfmqaekul', 'cnyxyritdzhvbospewfmqagkul', 'cnjxoritwzhvbosyewrmqhgkul', 'cnjxpritdzhjbosyqwsmqagkul', 'cnjzprindzhvbosyewfmqabkul', 'cnjspritdzhvbosysffmqagkul', 'cnxxpritdzhvbosyelfmqageul', 'bnjhpritdzhvbosyewfmzagkul', 'cnjxbhitdzhdbosyewfmqagkul', 'cnjxprktdzmvbosyewfmqagkuj', 'cnjxprixdzhvbqsyewfmqmgkul', 'cnjxpkitdzhvbosyewfmqagbum', 'cnjhpritdzhxbosyewfmqagjul', 'cnjxpritdzzvbosyewuqqagkul', 'cnjxprhtdzhvuopyewfmqagkul', 'cnjxpritdzhjqosyewfmqagkgl', 'cnzxpritdzhvbosyejfmuagkul', 'cnvxpritoohvbosyewfmqagkul', 'cnjxpmitdzwvbosyemfmqagkul', 'cnjoprittzzvbosyewfmqagkul', 'cnjxpgitdzhvbosytwfmqsgkul', 'cnjxprrtdehvbosyewfnqagkul', 'onjxpjitdzgvbosyewfmqagkul', 'cnjxpmitdzhvbopaewfmqagkul', 'cnjxpritqzhvbosoewfrqagkul', 'cnjxpnitdzhvbosyewfmqagkjy', 'cnsxpritdzhvbosyewfmqjykul', 'cnjxpriidzhvbosyewfmqxgkut', 'cnjxpyitdzhnbosyewfgqagkul', 'cnjxpritdzhbboyyewfmqagsul', 'cnjxpeitdzsvbosyewfmqabkul', 'cnjxpritdzhzvosyewfmragkul', 'cnjrpritdzhmbosyewfmqrgkul', 'cnjxpritdzhmbosyenfmqaglul', 'cnjxqrntdzhvboswewfmqagkul', 'cnjxprdtpzhvbosyewfmqagkcl', 'cnjxpritdzhvsdsyewfmqagkur', 'cnjxpritdzhvvosyewumqhgkul', 'cnzxpritdznvhosyewfmqagkul', 'ynjypritdzhvbosyewfmqagkuz', 'cnjxpnitdzhvbocyezfmqagkul', 'vnjxpritdzhvbfsyewfmjagkul', 'cnjfpritdzhvbosyewfmqagkzu', 'cnjxpritdzhbbosyewfmlegkul', 'cnjxpnitdzhvbosyesfmbagkul', 'cnjxpritezwvbosyewfmqagkgl', 'cujxpritdzhqbosyawfmqagkul', 'cnjxprindzhrbosyerfmqagkul', 'cntxpritdzhvbosyewfmqauxul', 'cnjxpvitdzhvbosyepfmqagkuy', 'cnjxdrqtdzhvbosdewfmqagkul', 'cnnxpritdzhvvosyenfmqagkul', 'lnjxphitdzhvbosyewfaqagkul', 'cngxpritdzhhbobyewfmqagkul', 'uncxphitdzhvbosyewfmqagkul', 'cnjxpribdehvbosfewfmqagkul', 'cnjxppitdqhvbmsyewfmqagkul', 'gnjxpritkzhvbosyewfbqagkul', 'znjxpritdzhvbowycwfmqagkul', 'cnjxpgitdzhvbosyewidqagkul', 'cnjxhritdzhvbowyswfmqagkul', 'injxkritdzhvbjsyewfmqagkul', 'cmjupritgzhvbosyewfmqagkul', 'cnjxpritdzbvjoeyewfmqagkul', 'cnjxpritdkhvbosyewlmuagkul', 'cnkxpritdzhebvsyewfmqagkul', 'cyjxptitdzhvbosyewfmqagkuv', 'cnjxpritdzhvbodrewflqagkul', 'cnjxpratdzhvbksyewfhqagkul', 'cnjxpoitdzhvbosjewxmqagkul', 'cnjxprhidzhvbasyewfmqagkul', 'cnjxpritdzhvbosqewvmqagmul', 'cnjxoritdzhvbosyzifmqagkul', 'mnjxpritdzhvbcsyeyfmqagkul', 'cnjhpritgzhvbosyewfmqngkul', 'cnjxprijdzevbesyewfmqagkul', 'cnexprqtdzhvbosyewvmqagkul', 'cnjxpxitdzhvbosyawfmqmgkul', 'cnjxpritdzhvbosyirfmqaxkul', 'cqjxpcitdzhvboslewfmqagkul', 'cmjxpqitdztvbosyewfmqagkul', 'cnbxpritdzhvfosyewfmuagkul', 'cnjxprrtdzhvbosumwfmqagkul', 'cnjxprttdvhvbossewfmqagkul', 'cnjxpritdzhvbcsuewfaqagkul', 'cbjxpritdzhvbosyewfhqalkul', 'cnjxprithzhvbosjcwfmqagkul', 'chjxpritdzhvbosyewftcagkul', 'cnjxprirdchvdosyewfmqagkul', 'cnjxpritdxhvbosyewfmqcgkal', 'cnjxpriidchvbosrewfmqagkul', 'cnjhprizdzhvbosyewfmqagvul', 'cnjwpritdzhpbosyewfmqaqkul', 'cnjxpgitfzhvbosyxwfmqagkul', 'cnjxpjiedzhvbosywwfmqagkul', 'cnjxpritdzhvbosyewfpqynkul', 'xnixlritdzhvbosyewfmqagkul', 'cnjxoritdznvbosyehfmqagkul', 'cnjxpritdzhvbjsyewsmqagcul', 'lnjxpritdzhvkosyewjmqagkul', 'cnjxpritdzhvbosyedfiqvgkul', 'cnjxpritdzhqbdsyerfmqagkul', 'cnjxpritdzavbosyywfmqagvul', 'dmjxprithzhvbosyewfmqagkul', 'cnjxpriqdzhvnosyeofmqagkul', 'cnjxpritdxhvboszewfmqkgkul', 'cnjxpritdzxvbosjewymqagkul', 'cnjxpritdzngbosyewfmqugkul', 'cajxpritdnhvbosyerfmqagkul', 'cnsxpritdzhvbosymwfmqagcul', 'cnjxoritdzhvbosyewrmqhgkul', 'cnjxpritdzhvposyewfmqagkwo', 'cnjxpriazzhvbosyeufmqagkul', 'cnjxrritdzhvbosymhfmqagkul', 'cnjxprztdzhvbosyewfmqtgkum', 'cnjxpritdzhvbmsyewfmqatkun', 'cnuxpritdzhvbosyewfmqagvur', 'ctjxxritdzhvbosyewfvqagkul', 'cnjxpritdzlvbosyevfmqagkll', 'cnjxpritdzhlbosyewfmqagasl', 'cnjxpritwzhvbosyewfcxagkul', 'cyjxpritdzhfbosyewfmqagcul', 'cnjxpritxghvkosyewfmqagkul', 'ctjxpritdjhvbosyewfmqkgkul', 'cnjxpritxzhvbosyewjmbagkul', 'unjxpritdzhkbosyewfmqaghul', 'cnjoprqtdzhvbosyewzmqagkul', 'rnjxprgtgzhvbosyewfmqagkul', 'cnjgpqitdzhvbosyewfaqagkul', 'cnjxpritdzuybosyewfmqagful', 'cnjxprqtdahvbosyewfnqagkul', 'cnjxpritdzhmkhsyewfmqagkul', 'wnjxpritdzhvbosiewfmqagkml', 'cnjmpritdzhvbosyjwfmqagkdl', 'cnjopritdzhvbksyewfmqrgkul', 'cnlxpritdzhvbosyewfmomgkul', 'cgjxpritdzhvbbsyewfmxagkul', 'cnaxpritdvhvnosyewfmqagkul', 'cnjxprijdzhvbkmyewfmqagkul', 'cnjxpritdzhvposyewzmqagkuz', 'cnuxpuitdzdvbosyewfmqagkul', 'cnjxprifdzjvbosyewfyqagkul', 'cnhspritdzhvbosyewfmqaghul', 'cnjxprcbdzfvbosyewfmqagkul', 'lnjapritdzhvbosyewfmqegkul', 'cnjxprisszhvbosyewqmqagkul', 'cnjxpritdzhvbosyeifmsagoul', 'cnjxpritrfhvbosyewfmqagkuz', 'cnjxkritdzmvboqyewfmqagkul', 'cnjxpritdzhvbosyedfmqzgkzl', 'cnjxprifdzhvbosyswfmqagksl', 'cnjxoritdzhvbosyxwfmhagkul', 'cnjhpritdzzvbosfewfmqagkul', 'cnjxprityjhvbomyewfmqagkul', 'cnjbpritdzhvbosyywfmqagkuf', 'cnjxprrtdzhvbosyewgmqagtul'];
    partOne(labelsList);
    partTwo(labelsList);
    console.log('\n\n');
}

export { day02, calculateChecksum, findLabelsForSantaSuit };