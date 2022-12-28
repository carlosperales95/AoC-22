import { Console } from 'console'
import fs from 'fs'

const signal = fs.readFileSync('input.txt', 'utf8')

// Day 6 - Part 1

function getMarker(input, distinct) {
    let marker = input
                .split('')
                .reduce(function(past, l, i, arr) {
                    past.indexOf(l) === -1 ? past.push(l) : past = past.slice(past.indexOf(l)+1).concat(l)
                    if (past.length === distinct){ 
                        arr.splice(1) 
                        return i + 1
                    }
                    else {return past}
                }, [])
    return marker
}

console.log(getMarker(signal, 4))

// Day 6 - Part 2
// Same but 14 chars

console.log(getMarker(signal, 14))