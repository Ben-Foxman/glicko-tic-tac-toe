const Q = Math.log(10)/400;

//helper function for new r- calculates g(RD)
function g(RD) {
    return 1/Math.sqrt(1 + (3 * Q * Q * RD * RD / (Math.PI * Math.PI)))
}
//helper function for new r- calculates s term
//outcome is either 0(loss), .5(tie), 1(win)
function s(player, opponent){
    return  (1/(1 + Math.pow(10, -g(opponent.RD) * (player.R - opponent.R) / 400)));
}
//helper function for new r, calculates right half of term
function rightHalfOfNewR(player, opponents){
    let result = 0;
    for(let opponent of opponents) {
        result += (g(opponent.RD) * (opponent.outcome - s(player, opponent)))
    }
    return result;
}
// helper function to calculate d term
function d(player, opponents) {
    let result = 0;
    for(let opponent of opponents) {
        result += Math.pow(g(opponent.RD), 2) *s(player, opponent) * (1 - s(player, opponent))
    }
    result *= (Q * Q);
    result = 1 / result;
    return result
}
//function to calculate new rating based on old rating, RD, and the games played
function newR(player, opponents) {
    return player.R + (Q / ((1 /(player.RD * player.RD)) + (1/d(player, opponents)))) * rightHalfOfNewR(player, opponents)
}
//function to calculate new RD based on old rating, RD, and the games played
function newRD(player, opponents) {
    let result =  1 / (player.RD * player.RD) + (1 / d(player, opponents));
    result = 1 /result;
    return Math.sqrt(result);
}
// function to update rating, RD
function updateRating(player, opponents){
        player.R = newR(player, opponents);
        player.RD = newRD(player, opponents);
        // to avoid scenarios where players can't improve due to low deviation
        if (player.RD < 30){
            player.RD = 30
        }
}
//function to increase RD as time increments pass- if player is inactive, rating is less accurate
function RDincrease(player){
    player.RD =  Math.min(350, Math.sqrt((player.RD * player.RD) + 63.2 * 63.2))
}

//expected outcome of a game between two players
//0 = player never wins, 1 = player always wins
function expectedOutcome(player, opponent){
    let result = -g(Math.sqrt((player.RD * player.RD) + (opponent.RD * opponent.RD))) * (player.R - opponent.R)/400;
    result = Math.pow(10, result) + 1;
    return 1 / result
}



//TESTING
let player = {
    R: 1400,
    RD: 80
};
let opp1 = {
    R: 2400,
    RD: 300,
    outcome: 1
};
let opp2 = {
    R: 1500,
    RD: 150,
    outcome: 0
};
let opp3 = {
    R: 1700,
    RD: 300,
    outcome: 0
};

let opponents = [];
opponents.push(opp1);
opponents.push(opp2);
opponents.push(opp3);
console.log(player.R, player.RD);
console.log(expectedOutcome(player, opp2));
for(let x = 0; x < 50; x++) {
    updateRating(player, opponents);
    console.log(Math.round(player.R), (player.RD));
}
console.log(expectedOutcome(player, opp2));
