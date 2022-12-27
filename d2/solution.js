import fs from 'fs'

const input = fs.readFileSync('input.txt', 'utf8')

// Day 2 - Part 1
// First col: What the opponent plays - A = Rock, B = Paper, C = Scissors
// Second col: What you play - X = Rock, Y = Paper, Z = Scissors
// Score Shape: Rock = 1, Paper = 2, Scissors = 3
// Score Result: Win = 6, Draw = 3, Lose = 0 


function rockPaperScisDefault(round){
    let points = 0
    switch(round){
        case 'AX':
            points = 1 + 3
            break
        case 'AY':
            points = 2 + 6
            break
        case 'AZ':
            points = 3 + 0
            break
        case 'BX':
            points = 1 + 0
            break
        case 'BY':
            points = 2 + 3
            break
        case 'BZ':
            points = 3 + 6
            break
        case 'CX':
            points = 1 + 6
            break
        case 'CY':
            points = 2 + 0
            break
        case 'CZ':
            points = 3 + 3
            break
    }
    return points
}

let rounds = input
                .split('\n')
                .map((r) => r.split(' ').join(''))
                .reduce(function(sum, r){
                    return sum +=rockPaperScisDefault(r)
                }, 0)

console.log(rounds)


// Day 2 - Part 2
// First col: What the opponent plays - A = Rock, B = Paper, C = Scissors
// Second col: The result- X = lose, Y = draw, Z = win
// Scoring is same
// Score Shape: Rock = 1, Paper = 2, Scissors = 3
// Score Result: Win = 6, Draw = 3, Lose = 0 

function rockPaperScisCorrected(round){
    let points = 0
    switch(round){
        case 'AX':
            points = 3 + 0
            break
        case 'AY':
            points = 1 + 3
            break
        case 'AZ':
            points = 2 + 6
            break
        case 'BX':
            points = 1 + 0
            break
        case 'BY':
            points = 2 + 3
            break
        case 'BZ':
            points = 3 + 6
            break
        case 'CX':
            points = 2 + 0
            break
        case 'CY':
            points = 3 + 3
            break
        case 'CZ':
            points = 1 + 6
            break
    }
    return points
}

let correctRounds = input
                .split('\n')
                .map((r) => r.split(' ').join(''))
                .reduce(function(sum, r){
                    return sum +=rockPaperScisCorrected(r)
                }, 0)

console.log(correctRounds)