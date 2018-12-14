//day 14

function partOne(numRecipes){
    console.log('You finally have a chance to look at all of the produce moving around. Chocolate, cinnamon, mint, chili peppers, nutmeg, vanilla... the Elves must be growing these plants to make hot chocolate! As you realize this, you hear a conversation in the distance. When you go to investigate, you discover two Elves in what appears to be a makeshift underground kitchen/laboratory.');
    console.log('The Elves are trying to come up with the ultimate hot chocolate recipe; they\'re even maintaining a scoreboard which tracks the quality score (0-9) of each recipe.');
    console.log('Only two recipes are on the board: the first recipe got a score of 3, the second, 7. Each of the two Elves has a current recipe: the first Elf starts with the first recipe, and the second Elf starts with the second recipe.');
    console.log('To create new recipes, the two Elves combine their current recipes. This creates new recipes from the digits of the sum of the current recipes\' scores. With the current recipes\' scores of 3 and 7, their sum is 10, and so two new recipes would be created: the first with score 1 and the second with score 0. If the current recipes\' scores were 2 and 3, the sum, 5, would only create one recipe (with a score of 5) with its single digit.');
    console.log('The new recipes are added to the end of the scoreboard in the order they are created. So, after the first round, the scoreboard is 3, 7, 1, 0.');
    console.log('After all new recipes are added to the scoreboard, each Elf picks a new current recipe. To do this, the Elf steps forward through the scoreboard a number of recipes equal to 1 plus the score of their current recipe. So, after the first round, the first Elf moves forward 1 + 3 = 4 times, while the second Elf moves forward 1 + 7 = 8 times. If they run out of recipes, they loop back around to the beginning. After the first round, both Elves happen to loop around until they land on the same recipe that they had in the beginning; in general, they will move to different recipes.');
    console.log('Drawing the first Elf as parentheses and the second Elf as square brackets, they continue this process:');
    console.log('(3)[7]');
    console.log('(3)[7] 1  0 ');
    console.log(' 3  7  1 [0](1) 0 ');
    console.log(' 3  7  1  0 [1] 0 (1)');
    console.log('(3) 7  1  0  1  0 [1] 2 ');
    console.log(' 3  7  1  0 (1) 0  1  2 [4]');
    console.log(' 3  7  1 [0] 1  0 (1) 2  4  5 ');
    console.log(' 3  7  1  0 [1] 0  1  2 (4) 5  1 ');
    console.log(' 3 (7) 1  0  1  0 [1] 2  4  5  1  5 ');
    console.log(' 3  7  1  0  1  0  1  2 [4](5) 1  5  8 ');
    console.log(' 3 (7) 1  0  1  0  1  2  4  5  1  5  8 [9]');
    console.log(' 3  7  1  0  1  0  1 [2] 4 (5) 1  5  8  9  1  6 ');
    console.log(' 3  7  1  0  1  0  1  2  4  5 [1] 5  8  9  1 (6) 7 ');
    console.log(' 3  7  1  0 (1) 0  1  2  4  5  1  5 [8] 9  1  6  7  7 ');
    console.log(' 3  7 [1] 0  1  0 (1) 2  4  5  1  5  8  9  1  6  7  7  9 ');
    console.log(' 3  7  1  0 [1] 0  1  2 (4) 5  1  5  8  9  1  6  7  7  9  2 ');
    console.log('The Elves think their skill will improve after making a few recipes (your puzzle input). However, that could take ages; you can speed this up considerably by identifying the scores of the ten recipes after that. For example:');
    console.log('If the Elves think their skill will improve after making 9 recipes, the scores of the ten recipes after the first nine on the scoreboard would be 5158916779 (highlighted in the last line of the diagram).');
    console.log('After 5 recipes, the scores of the next ten would be 0124515891.');
    console.log('After 18 recipes, the scores of the next ten would be 9251071085.');
    console.log('After 2018 recipes, the scores of the next ten would be 5941429882.');
    console.log('What are the scores of the ten recipes immediately after the number of recipes in your puzzle input?');
    console.log('Your puzzle input is 540391.');
    console.log('-----------------------------------');
    console.log('Your puzzle answer was  ');
    console.log('-----------------------------------');
}

function getScoresOfRecipesTriedAfter(numRecipes, numExtraScores){
    let scores = calculateScoresAfterTryingXRecipes(numRecipes);
    
    return last10Scores.join('');
}

function calculateScoresAfterTryingXRecipes(numRecipes){
    let numRecipiesToTry = numRecipes;
    let recipesScores = [3, 7];
    let elvesCooking = [0, 1];

    for (let i = 0; i < numRecipiesToTry; i++){
        let newScores = tryRecipesAndGetNewScores(elvesCooking, recipesScores);
        recipesScores = recipesScores.concat(newScores);
        for(let i = 0; i < elvesCooking.length; i++){
            elvesCooking[i] = moveElf(elvesCooking[i], recipesScores[elvesCooking[i]], recipesScores.length);
        }
    }

    return [elvesCooking, recipesScores];
}

function calculateExtraScores(numExtraScores, elvesCooking, recipesScores){

}

function tryRecipesAndGetNewScores(elvesCooking, recipesScores){
    let score = 0;
    let scores = [];
    elvesCooking.forEach(recipeId => {
        score += recipesScores[recipeId];
    });
    while (score > 0){
        scores.unshift(score % 10);
        score = Math.floor(score/10);
    }
    return scores;
}

function moveElf(currentRecipe, currentScore, numRecipes){
    let numStepsForward = 1 + currentScore;
    let nextRecipe = (currentRecipe + numStepsForward) % numRecipes;
    return nextRecipe;
}

function partTwo(track, carts){
    
    console.log('-----------------------------------');
    console.log('Your puzzle answer was  ');
    console.log('-----------------------------------');
}

function moveUntilOneCartIsLeft(track, carts){
    while(carts.length > 1){
        sortCarts(carts);
        for (let i = 0; i < carts.length; i++){
            if(!carts[i].hasCrashed){
                carts[i].move(track);
                let crash = findCrash(carts, i);
                if(crash !== -1){
                    carts[i].hasCrashed = true;
                    carts[crash].hasCrashed = true;
                }
            }
        }
        carts = carts.filter(c => c.hasCrashed === false);
    }
    return carts[0];
}

function day14(){
    console.log('--- Day 14: Chocolate Charts ---');
    let numRecipes = 540391;
    partOne(numRecipes);
    //partTwo(numRecipes);
    console.log('\n\n');
}

export { day14, calculateScoresAfterTryingXRecipes, tryRecipesAndGetNewScores, moveElf };