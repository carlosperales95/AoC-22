import fs from 'fs'

const input = fs.readFileSync('input.txt', 'utf8')

// Day 1 - Part 1
let elves = input
                .split('\n\n')
                .map((e) => e.split('\n'))
                .map(function(e) {
                    return e.reduce((sum, cal) => sum += parseInt(cal), 0)
                })
                .reduce(function(max, e) {
                    e > max ? max = e : null
                    return max
                }, 0)
                
console.log(elves)


// Day 1- Part 2

let allElves = input
                .split('\n\n')
                .map((e) => e.split('\n'))
                .map(function(e) {
                    return e.reduce((sum, cal) => sum += parseInt(cal), 0)
                })

let top3elves = 0
console.log(allElves)
for (let i = 0; i < 3; i++){
    let topElf =allElves.reduce(function(max, e) {
        e > max ? max = e : null
        return max
    }, 0)
    top3elves += topElf
    allElves.splice(allElves.indexOf(topElf), 1)
}

console.log(top3elves)