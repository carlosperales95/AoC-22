import { Console } from 'console'
import fs from 'fs'

const input = fs.readFileSync('input.txt', 'utf8')

// Day 10 - Part 1
let clock = 1
let register = 1
let signalStrenths = []
const breakPoints = [20, 60, 100, 140, 180, 220]
let crtDrawing = ""

function executeInstruction(instruction) {
    switch(instruction[0]) {
        case 'noop':
            clock += 1
            break;
        case 'addx':
            clock += 1
            validateClockCycle()
            clock += 1
            register += parseInt(instruction[1])
            break;
    }
    validateClockCycle()
}

function validateClockCycle(){
    let match = breakPoints.find(e => e === (clock))
    if(match != undefined) {
        signalStrenths.push(register * clock)
    }
}

function executeInputAndSumSignalStrengths(instructions) {

    instructions
            .split('\n')
            .map((x) => x.split(' '))
            .map((x) => executeInstruction(x))
 
    return signalStrenths.reduce((sum, elem) => sum+=elem, 0)
}

// Run and log result to part 1
console.log(executeInputAndSumSignalStrengths(input))


// Day 10 - Part 2
clock = 1
register = 1
crtDrawing = "#"

function executeInstructionCRT(instruction) {
    switch(instruction[0]) {
        case 'noop':
            clock += 1
            break;
        case 'addx':
            clock += 1
            drawCRT()
            clock += 1
            register += parseInt(instruction[1])
            break;
    }
    drawCRT()
}

function drawCRT() {
    let regArea = [register, (register + 1), (register + 2)]

    let placeholderClock = clock
    while(placeholderClock > 40) placeholderClock -=40

    regArea.includes(placeholderClock) ? crtDrawing += '#' : crtDrawing += '.'

    placeholderClock === 40 ? crtDrawing += '\n' : null 
}


function executeInputAndDrawCRT(instructions) {

    instructions
        .split('\n')
        .map((x) => x.split(' '))
        .map((x) => executeInstructionCRT(x))
 
    console.log(crtDrawing)
}

// Run result to part 2
executeInputAndDrawCRT(input)