//day 02

function partOne(labelsList){
    console.log("PART ONE:");
    console.log('Puzzle solution => ' + calculateChecksum(labelsList));
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
    console.log("PART TWO:");
    console.log("Puzzle solution => " + findLabelsForSantaSuit(labelsList));
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
    console.log("...... DAY 02 ......");
    let labelsList = ['cnjxpritdzhubeseewfmqagkul', 'cwyxpgitdzhvbosyewfmqagkul', 'cnfxpritdzhebosywwfmqagkul', 'cnjxpritdzgvbosyawfiqagkul', 'cnkxpritdzhvbosyewfmgagkuh', 'gnjxprhtdzhebosyewfmqagkul', 'cnjxpriedzevbosyewfjqagkul', 'cnjxpritdzhpyosyewfsqagkul', 'cnjxprltdzhvbosyewfmhagkzl', 'cnjxfritdjhvbosyewfmiagkul', 'xnjxpritdzhvbosyewfmqagkgn', 'cnjxpritdzmvzosyewfhqagkul', 'cljxxritdzhvbosyewfmragkul', 'cnjxjritdzhvbovyewfmvagkul', 'cnjxprdtdzhpbosyewvmqagkul', 'cojxprdtdzhzbosyewfmqagkul', 'cnjxpritgzhvfgsyewfmqagkul', 'knjxprptdzhvbosyecfmqagkul', 'cnjxpritdzhvbvsyeyfmqagkuc', 'cnjxpritdzhvbosvewfmoagjul', 'cnjxpritdzhvbosyfwfmbagkjl', 'cnjxpjitazhvbosfewfmqagkul', 'cnjtpfitdzhvbosyewfmiagkul', 'ckjxpritdzhvbysyewfmqagoul', 'cnjxvritdzhvbfsyewfmqalkul', 'cnjipqitdzhvbosyewfeqagkul', 'cnjhpritdzhvbosyewymqjgkul', 'cnjxprrtdzhvbosyewfmlkgkul', 'cnjxnritdzhvbopyewfmqaskul', 'cxjxpritdzhvtosyewjmqagkul', 'cnjxpritdzhvbjsyewfrqagkwl', 'cnjxhritdzhubosyewfmqagvul', 'cnjxpritdzhvbosyyyfmeagkul', 'cnjxkritdzhvaoeyewfmqagkul', 'cnjxpritdzhvtotyewfmqazkul', 'cnjxoriadzhvbosyewfmqcgkul', 'cnjxpritdzhcbosyewfmkapkul', 'fnjxprtddzhvbosyewfmqagkul', 'cnjxmvitdzhvbosyewfmqagrul', 'cnjxpyitdzhibosyewfmqagktl', 'cyjxprxtdzhvbosyewbmqagkul', 'onjxpditdzhvbosyeofmqagkul', 'cnjxprixdzhvbosuewftqagkul', 'cnjxpritdrhvaosyewymqagkul', 'cnjxpritdzhhbokyewfvqagkul', 'cnjxpritczhvbosyewfmqwgxul', 'cnjxpribdzqvbnsyewfmqagkul', 'ynpxpritdzhvbvsyewfmqagkul', 'cnjxprirdzhvboerewfmqagkul', 'cnjxpritdxhvbosyewfmgavkul', 'cnwxprntdzhvbosyewfmqagkuk', 'cnjxpritzzhvbosyewfmcagktl', 'bbjxpritdzhvbosyetfmqagkul', 'cnjxpbitdzhvbosyewrmqagkui', 'cnjxwrildzcvbosyewfmqagkul', 'cnqxpoitdzhvbosnewfmqagkul', 'cnzxpritdzhvbosyewfmqazkfl', 'cnjxpriddzhvoosyewfmhagkul', 'znjxpritdzhvbosjewfmqagkur', 'cnjxpritdzhvbosyewcmfagkuk', 'cnjxpritdzhvbomyywnmqagkul', 'cnjxpgitjzhvbosyejfmqagkul', 'cnjxpkitdzjvbosyewfmqcgkul', 'cnjxpritduhvbosyewfmqfkkul', 'cnfxpritdzhvbgsyewfmqwgkul', 'cnjxpritdzhvbosywufmqaskul', 'cnjxprittzhvboryswfmqagkul', 'cndxpritpzrvbosyewfmqagkul', 'cnjxpritdzhvbosyewfwqazkum', 'cccxprmtdzhvbosyewfmqagkul', 'cnjxpzitdzhvlbsyewfmqagkul', 'cnjxdrigdzhvbosyewfmqagsul', 'fhjxpritdzhvbosyewfmqagkcl', 'cnjxpritdzhvdosyewffqagaul', 'cnjxprikdztvbosyekfmqagkul', 'cnjxpritdzhvbohiewfmqagkue', 'cnjxpritdzhvbowyetfmqegkul', 'cnuxpritdzhvbosyewmmqapkul', 'qnjxpritdzhvbosyewfmjakkul', 'cnjxpritdzlvbosyewiaqagkul', 'cnjxpritdzhpoosyewfmvagkul', 'cdjxpritdzhvboryewfbqagkul', 'cnjxppitxzhvbosyewymqagkul', 'cnjxpywtdzhvboiyewfmqagkul', 'cnjxpritdzpvbosyezfmqaqkul', 'cnjppritdghvbosyewfdqagkul', 'cmjxpritdzhvbosvewfmqagkup', 'cnjxoritdzhvbosylffmqagkul', 'cnjxfritdzhvbojyewfmqagkvl', 'cnjxpritdzhvbozyewgmqlgkul', 'cnjxlritdzhvbosyewfmqalkug', 'cnyxprittzhvbosyewfmsagkul', 'cnjxprytdzcvdosyewfmqagkul', 'ctjxpritdzhvbosyedfmqagkil', 'cnjxpvitdzhrbosyewfmqaekul', 'cnyxyritdzhvbospewfmqagkul', 'cnjxoritwzhvbosyewrmqhgkul', 'cnjxpritdzhjbosyqwsmqagkul', 'cnjzprindzhvbosyewfmqabkul', 'cnjspritdzhvbosysffmqagkul', 'cnxxpritdzhvbosyelfmqageul', 'bnjhpritdzhvbosyewfmzagkul', 'cnjxbhitdzhdbosyewfmqagkul', 'cnjxprktdzmvbosyewfmqagkuj', 'cnjxprixdzhvbqsyewfmqmgkul', 'cnjxpkitdzhvbosyewfmqagbum', 'cnjhpritdzhxbosyewfmqagjul', 'cnjxpritdzzvbosyewuqqagkul', 'cnjxprhtdzhvuopyewfmqagkul', 'cnjxpritdzhjqosyewfmqagkgl', 'cnzxpritdzhvbosyejfmuagkul', 'cnvxpritoohvbosyewfmqagkul', 'cnjxpmitdzwvbosyemfmqagkul', 'cnjoprittzzvbosyewfmqagkul', 'cnjxpgitdzhvbosytwfmqsgkul', 'cnjxprrtdehvbosyewfnqagkul', 'onjxpjitdzgvbosyewfmqagkul', 'cnjxpmitdzhvbopaewfmqagkul', 'cnjxpritqzhvbosoewfrqagkul', 'cnjxpnitdzhvbosyewfmqagkjy', 'cnsxpritdzhvbosyewfmqjykul', 'cnjxpriidzhvbosyewfmqxgkut', 'cnjxpyitdzhnbosyewfgqagkul', 'cnjxpritdzhbboyyewfmqagsul', 'cnjxpeitdzsvbosyewfmqabkul', 'cnjxpritdzhzvosyewfmragkul', 'cnjrpritdzhmbosyewfmqrgkul', 'cnjxpritdzhmbosyenfmqaglul', 'cnjxqrntdzhvboswewfmqagkul', 'cnjxprdtpzhvbosyewfmqagkcl', 'cnjxpritdzhvsdsyewfmqagkur', 'cnjxpritdzhvvosyewumqhgkul', 'cnzxpritdznvhosyewfmqagkul', 'ynjypritdzhvbosyewfmqagkuz', 'cnjxpnitdzhvbocyezfmqagkul', 'vnjxpritdzhvbfsyewfmjagkul', 'cnjfpritdzhvbosyewfmqagkzu', 'cnjxpritdzhbbosyewfmlegkul', 'cnjxpnitdzhvbosyesfmbagkul', 'cnjxpritezwvbosyewfmqagkgl', 'cujxpritdzhqbosyawfmqagkul', 'cnjxprindzhrbosyerfmqagkul', 'cntxpritdzhvbosyewfmqauxul', 'cnjxpvitdzhvbosyepfmqagkuy', 'cnjxdrqtdzhvbosdewfmqagkul', 'cnnxpritdzhvvosyenfmqagkul', 'lnjxphitdzhvbosyewfaqagkul', 'cngxpritdzhhbobyewfmqagkul', 'uncxphitdzhvbosyewfmqagkul', 'cnjxpribdehvbosfewfmqagkul', 'cnjxppitdqhvbmsyewfmqagkul', 'gnjxpritkzhvbosyewfbqagkul', 'znjxpritdzhvbowycwfmqagkul', 'cnjxpgitdzhvbosyewidqagkul', 'cnjxhritdzhvbowyswfmqagkul', 'injxkritdzhvbjsyewfmqagkul', 'cmjupritgzhvbosyewfmqagkul', 'cnjxpritdzbvjoeyewfmqagkul', 'cnjxpritdkhvbosyewlmuagkul', 'cnkxpritdzhebvsyewfmqagkul', 'cyjxptitdzhvbosyewfmqagkuv', 'cnjxpritdzhvbodrewflqagkul', 'cnjxpratdzhvbksyewfhqagkul', 'cnjxpoitdzhvbosjewxmqagkul', 'cnjxprhidzhvbasyewfmqagkul', 'cnjxpritdzhvbosqewvmqagmul', 'cnjxoritdzhvbosyzifmqagkul', 'mnjxpritdzhvbcsyeyfmqagkul', 'cnjhpritgzhvbosyewfmqngkul', 'cnjxprijdzevbesyewfmqagkul', 'cnexprqtdzhvbosyewvmqagkul', 'cnjxpxitdzhvbosyawfmqmgkul', 'cnjxpritdzhvbosyirfmqaxkul', 'cqjxpcitdzhvboslewfmqagkul', 'cmjxpqitdztvbosyewfmqagkul', 'cnbxpritdzhvfosyewfmuagkul', 'cnjxprrtdzhvbosumwfmqagkul', 'cnjxprttdvhvbossewfmqagkul', 'cnjxpritdzhvbcsuewfaqagkul', 'cbjxpritdzhvbosyewfhqalkul', 'cnjxprithzhvbosjcwfmqagkul', 'chjxpritdzhvbosyewftcagkul', 'cnjxprirdchvdosyewfmqagkul', 'cnjxpritdxhvbosyewfmqcgkal', 'cnjxpriidchvbosrewfmqagkul', 'cnjhprizdzhvbosyewfmqagvul', 'cnjwpritdzhpbosyewfmqaqkul', 'cnjxpgitfzhvbosyxwfmqagkul', 'cnjxpjiedzhvbosywwfmqagkul', 'cnjxpritdzhvbosyewfpqynkul', 'xnixlritdzhvbosyewfmqagkul', 'cnjxoritdznvbosyehfmqagkul', 'cnjxpritdzhvbjsyewsmqagcul', 'lnjxpritdzhvkosyewjmqagkul', 'cnjxpritdzhvbosyedfiqvgkul', 'cnjxpritdzhqbdsyerfmqagkul', 'cnjxpritdzavbosyywfmqagvul', 'dmjxprithzhvbosyewfmqagkul', 'cnjxpriqdzhvnosyeofmqagkul', 'cnjxpritdxhvboszewfmqkgkul', 'cnjxpritdzxvbosjewymqagkul', 'cnjxpritdzngbosyewfmqugkul', 'cajxpritdnhvbosyerfmqagkul', 'cnsxpritdzhvbosymwfmqagcul', 'cnjxoritdzhvbosyewrmqhgkul', 'cnjxpritdzhvposyewfmqagkwo', 'cnjxpriazzhvbosyeufmqagkul', 'cnjxrritdzhvbosymhfmqagkul', 'cnjxprztdzhvbosyewfmqtgkum', 'cnjxpritdzhvbmsyewfmqatkun', 'cnuxpritdzhvbosyewfmqagvur', 'ctjxxritdzhvbosyewfvqagkul', 'cnjxpritdzlvbosyevfmqagkll', 'cnjxpritdzhlbosyewfmqagasl', 'cnjxpritwzhvbosyewfcxagkul', 'cyjxpritdzhfbosyewfmqagcul', 'cnjxpritxghvkosyewfmqagkul', 'ctjxpritdjhvbosyewfmqkgkul', 'cnjxpritxzhvbosyewjmbagkul', 'unjxpritdzhkbosyewfmqaghul', 'cnjoprqtdzhvbosyewzmqagkul', 'rnjxprgtgzhvbosyewfmqagkul', 'cnjgpqitdzhvbosyewfaqagkul', 'cnjxpritdzuybosyewfmqagful', 'cnjxprqtdahvbosyewfnqagkul', 'cnjxpritdzhmkhsyewfmqagkul', 'wnjxpritdzhvbosiewfmqagkml', 'cnjmpritdzhvbosyjwfmqagkdl', 'cnjopritdzhvbksyewfmqrgkul', 'cnlxpritdzhvbosyewfmomgkul', 'cgjxpritdzhvbbsyewfmxagkul', 'cnaxpritdvhvnosyewfmqagkul', 'cnjxprijdzhvbkmyewfmqagkul', 'cnjxpritdzhvposyewzmqagkuz', 'cnuxpuitdzdvbosyewfmqagkul', 'cnjxprifdzjvbosyewfyqagkul', 'cnhspritdzhvbosyewfmqaghul', 'cnjxprcbdzfvbosyewfmqagkul', 'lnjapritdzhvbosyewfmqegkul', 'cnjxprisszhvbosyewqmqagkul', 'cnjxpritdzhvbosyeifmsagoul', 'cnjxpritrfhvbosyewfmqagkuz', 'cnjxkritdzmvboqyewfmqagkul', 'cnjxpritdzhvbosyedfmqzgkzl', 'cnjxprifdzhvbosyswfmqagksl', 'cnjxoritdzhvbosyxwfmhagkul', 'cnjhpritdzzvbosfewfmqagkul', 'cnjxprityjhvbomyewfmqagkul', 'cnjbpritdzhvbosyywfmqagkuf', 'cnjxprrtdzhvbosyewgmqagtul'];
    partOne(labelsList);
    partTwo(labelsList);
}

export { day02 };