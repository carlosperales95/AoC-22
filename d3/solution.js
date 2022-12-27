import fs from 'fs'

const input = fs.readFileSync('input.txt', 'utf8')

let abc = ['a', 'b', 'c', 'd', 'e', 'f' , 'g', 'h', 'i', 'j', 'k', 'l', 'm' ,'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F' , 'G', 'H', 'I', 'J', 'K', 'L', 'M' ,'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']


// Day 3 - Part1

const unique = (value, index, self) => {
    return self.indexOf(value) === index
}

let backpacks = input
                    .split('\n')
                    .map((b) => [b.substring(0, (b.length / 2)), b.substring((b.length / 2), b.length)])
                    .reduce(function(sum, b) {
                        let letters = b[0]
                                    .split('')
                                    .filter((l) => b[1].includes(l))
                                    .filter(unique)
                        
                        // console.log("srtring1: " + b[0] + " string2: " + b[1])
                        // let score = letters.reduce((add, l) => add += (abc.indexOf(l) + 1), 0)
                        
                        let score = abc.indexOf(letters[0]) + 1
                        sum += score
                        // if (score === 0){
                        //     console.log('letters: ' + letters + ' score: ' + score + ' sum: ' + sum)
                        //     console.log("srtring1: " + b[0] + " string2: " + b[1])
                        // }
                        return sum
                    },0)


console.log(backpacks)


// Day 3 - Part1

let splitter = 0
let group = []
let badges = input
                .split('\n')
                .map(function(b) {
                    if(splitter === 0){
                        group = []
                    }
                    splitter++
                    group.push(b)
                    if (splitter === 3){
                        splitter = 0
                        return group
                    }
                })
                .filter((b) => b !== undefined)
                .reduce(function(sum, g) {
                    let badge = g[0]
                                .split('')
                                .filter((l) => g[1].includes(l) && g[2].includes(l))
                                .filter(unique)
                    let score = abc.indexOf(badge[0]) + 1
                    sum += score
                    
                    return sum
                },0)
                

console.log(badges)