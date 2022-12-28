import fs from 'fs'

const input = fs.readFileSync('input.txt', 'utf8')

// Day 4 - Part 1
// Full overlap

function generateSection(c) {
    let numbers = []
    for(let i=parseInt(c[0]); i<=parseInt(c[1]); i++){
        numbers.push(i)
    }
    return numbers
}

let pairs = input
                .split('\n')
                .map((p) => p.split(',')
                            .map((c) => c.split('-'))
                            .map((c) => generateSection(c))
                    )

                    
let fullOverlap = pairs
                    .filter((p) => p[0].every(v => p[1].includes(v)) || p[1].every(v => p[0].includes(v)))
                    .length             

console.log(fullOverlap)


// Day 4 - Part 2
// Any overlap, same thing with small change

let partialOverlap = pairs
                    .filter((p) => p[0].some(v => p[1].includes(v)) || p[1].some(v => p[0].includes(v)))
                    .length             

console.log(partialOverlap)