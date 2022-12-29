import { Console } from 'console'
import fs from 'fs'

const input = fs.readFileSync('input.txt', 'utf8')

let logit = []

// Day 11 - Part 1 
// 20 rounds
// Monkey business = Top 2 monkey item handled count (multiply)
// Will not go through all the text parsing to define the monkeys object
const rounds = 20

// Smaller data used to compare with official site's example execution
const monkeysTest = [
    { id: 0, objects: [79, 98],          operator: "*", operated: 19,   test: 23,  positive: 2, negative: 3, inspectedCount: 0 },
    { id: 1, objects: [54, 65, 75, 74],  operator: "+", operated: 6,    test: 19,  positive: 2, negative: 0, inspectedCount: 0 },
    { id: 2, objects: [79, 60, 97],      operator: "*", operated: null, test: 13,  positive: 1, negative: 3, inspectedCount: 0 },
    { id: 3, objects: [74],              operator: "+", operated: 3,    test: 17,  positive: 0, negative: 1, inspectedCount: 0 }
]

const monkeys = [
    { id: 0, objects: [75, 63],                         operator: "*", operated: 3,    test: 11, positive: 7, negative: 2, inspectedCount: 0 },
    { id: 1, objects: [65, 79, 98, 77, 56, 54, 83, 94], operator: "+", operated: 3,    test: 2,  positive: 2, negative: 0, inspectedCount: 0 },
    { id: 2, objects: [66],                             operator: "+", operated: 5,    test: 5,  positive: 7, negative: 5, inspectedCount: 0 },
    { id: 3, objects: [51, 89, 90],                     operator: "*", operated: 19,   test: 7,  positive: 6, negative: 4, inspectedCount: 0 },
    { id: 4, objects: [75, 94, 66, 90, 77, 82, 61],     operator: "+", operated: 1,    test: 17, positive: 6, negative: 1, inspectedCount: 0 },
    { id: 5, objects: [53, 76, 59, 92, 95],             operator: "+", operated: 2,    test: 19, positive: 4, negative: 3, inspectedCount: 0 },
    { id: 6, objects: [81, 61, 75, 89, 70, 92],         operator: "*", operated: null, test: 3,  positive: 0, negative: 1, inspectedCount: 0 },
    { id: 7, objects: [81, 86, 62, 87],                 operator: "+", operated: 8,    test: 13, positive: 3, negative: 5, inspectedCount: 0 }
]


function inspectObject(monkey, object) {
    let result = 0
    let number = !monkey.operated ? object : monkey.operated


    switch(monkey.operator) {
        case '*':
            result = (object * number)
            break;
        case '+':
            result = (object + number)
            break;
    }
   return result
}


function monkeyDoes(monkey) {
    if (monkey.objects.length > 0) {
        monkey.inspectedCount += monkey.objects.length
        monkey.objects
                    .map((x) => inspectObject(monkey, x))
                    .forEach((x) => (Math.floor(x/3) % monkey.test) == 0 
                                                        ? monkeys[monkey.positive].objects.push(Math.floor(x/3)) 
                                                        : monkeys[monkey.negative].objects.push(Math.floor(x/3)) 
                            )
            
        monkey.objects = []
    }
}

// Function that prints inspestion countes per monkey
function writeItemsMonkeys(i){
    console.log("ROUND " + i)
    console.log("Monkey 0: " + monkeys[0].inspectedCount)
    console.log("Monkey 1: " + monkeys[1].inspectedCount)
    console.log("Monkey 2: " + monkeys[2].inspectedCount)
    console.log("Monkey 3: " + monkeys[3].inspectedCount)
    console.log("Monkey 4: " + monkeys[4].inspectedCount)
    console.log("Monkey 5: " + monkeys[5].inspectedCount)
    console.log("Monkey 6: " + monkeys[6].inspectedCount)
    console.log("Monkey 7: " + monkeys[7].inspectedCount)
    console.log("=============================")

}

// Execute rounds
for (let i = 1; i <= rounds; i++) {
    monkeys.forEach((m) => monkeyDoes(m))
}

// Sort counts array and print result
let counts = monkeys.map((m) => m.inspectedCount)
                    .sort()
                    .reverse()

console.log(counts[0] * counts[1])


// Day 11 - Part 2 
// 10000 Rounds 
// Monkey business = Top 2 monkey item handled count (multiply)
// Issue: object's worry lvls go to infinite - Need to keep them manageable somehow
rounds = 1000