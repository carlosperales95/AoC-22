import fs from 'fs'

const input = fs.readFileSync('input.txt', 'utf8')

// Day 12 - Part 1
// Sbaaaccccccc[...]acccaaaagggmmmsttxxxEzzzzyyvvvppplllccccccccc
// From S to E in least steps possible
// Can only move max one step higher (as low as wanted tho)


let grid = input
                .split('\n')
                .map((l) => l.split(''))


let starter = grid
                .map((l, i) => {
                    let found = l.findIndex((e) => e == 'S')

                    return found != -1 ? [i, found] : null
                })
                .filter(x => x != null)




// My Hill Climbing Algorithm Pseudocode:
// Recursively
// Evaluate current spot s | s == E?
// if so, stop
// if not, fetch possible spots
// for each possible stop calculate score: distance to E (max height = current height +1)
// select best spot
// will not make algorithm blind, will see at least 1/2 steps ahead to calc score



let alphabet = ['a', 'b', 'c', 'd', 'e', 'f' , 'g', 'h', 'i', 'j', 'k', 'l', 'm' ,'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
let count = 0
let paths = []
console.log(grid[20][88])
// Day 12 - Part 2

function focusArea(indexRow, indexCol) {
    // console.log("S Row: " + indexRow + " | Col: " + indexCol)
    // console.log("VAl = " + grid[indexRow][indexCol])
    count ++
    // console.log("Count " + count)
    let current = grid[indexRow][indexCol] === 'S' ? 'a' : grid[indexRow][indexCol]


    if (current === 'E') {
        return console.log("DONE")
    }

    let focus = [
            [ indexRow-1, indexCol-1, grid?.[indexRow-1]?.[indexCol-1] ],
            [ indexRow-1, indexCol,   grid?.[indexRow-1]?.[indexCol]   ],
            [ indexRow-1, indexCol+1, grid?.[indexRow-1]?.[indexCol+1] ],
            [ indexRow,   indexCol-1, grid[indexRow]?.[indexCol-1]     ],
            // [ indexRow,   indexCol,   grid[indexRow][indexCol]         ],
            [ indexRow,   indexCol+1, grid[indexRow]?.[indexCol+1]     ],
            [ indexRow+1, indexCol-1, grid?.[indexRow+1]?.[indexCol-1] ],
            [ indexRow+1, indexCol,   grid?.[indexRow+1]?.[indexCol]   ],
            [ indexRow+1, indexCol+1, grid?.[indexRow+1]?.[indexCol+1] ]
        ].filter(x => x[2] != undefined && !choices.reduce((indicator, item) => ( item.includes(x[0]) && item.includes(x[1]) ) ? true : (indicator ? true : false), false))   
        
        // console.log(focus)
    // focus.forEach(x => choices.forEach((item) => console.log(item.includes(x[0]) && item.includes(x[1]) )))
        
    let scores = focus.map(e => {
                                return (e[2] === 'E') ? alphabet.indexOf(current) - alphabet.indexOf('z') : alphabet.indexOf(current) - alphabet.indexOf(e[2])
                            })
    // console.log(scores)
    
    let res = scores
                    .map((opt, ind) => opt < 2 ? focus[ind] : null)
                    .filter((x) => x != null)
    
    return res

}
let choices = [ [starter[0][0], starter[0][1]]]
let indi = 0
let f = 0
// let vari = focusArea(starter[0][0], starter[0][1])

while (indi != 5) {
    if(choices.length === 100){
        indi++
        choices = [ [starter[0][0], starter[0][1]]]
    }
    // console.log(choices)
    // console.log(choices.slice(-1)[0])
    let result = focusArea(choices.slice(-1)[0][0], choices.slice(-1)[0][1])

    // [20][88]
    let scoring = result.map(item => Math.abs(20 - item[0]) + Math.abs(88 - item[1]))
    console.log("Scores")
    console.log(scoring)

    let chose = result[scoring.indexOf(Math.min(...scoring))]
    // result[scoring.indexOf(chose)]

    if(result.length > 1) {
        console.log("Result: ")
        console.log(result)
        choices.push([chose[0], chose[1]])
        console.log("Choices: ")
        console.log(choices)
        console.log("Indicator: " + indi)
    }
    else {
        indi++
        choices.pop()
    }

    
}

// vari.forEach((option, i) => {
//     paths.push([option])
//     thing = focusArea(option[0], option[1])
//     console.log("End of eval: ")
//     console.log(thing)
//     thing.forEach(t => paths[i].push(t))
// })


// console.log(vari)

console.log("==============================")
// console.log(choices)
console.log(grid[21][89])