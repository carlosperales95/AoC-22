import { Console } from 'console'
import fs from 'fs'

const input = fs.readFileSync('input.txt', 'utf8')

// Day 12 - Part 1
// Sbaaaccccccc[...]acccaaaagggmmmsttxxxEzzzzyyvvvppplllccccccccc
// From S to E in least steps possible
// Can only move max one step higher (as low as wanted tho)


let grid = input
                .split('\n')
                .map((l) => l.split(''))


console.log(grid)

// My Hill Climbing Algorithm Pseudocode:
// Recursively
// Evaluate current spot s | s == E?
// if so, stop
// if not, fetch possible spots
// for each possible stop calculate score (max heigh = current height +1)
// select best spot
// will not make algorithm blind, will see at least 1/2 steps ahead to calc score


