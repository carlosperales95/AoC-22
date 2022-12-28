import { Console } from 'console'
import fs from 'fs'

const input = fs.readFileSync('input.txt', 'utf8')

// Day 5 - Part 1

function parseStartOfQueues(initial) {
    let queues = [[], [], [], [], [], [], [], [], []]
    let second = initial
                    .split('\n')
                    .map(function(c) {
                        let s = c.split('')
                        let indexes = s.reduce(function(a, e, i) {
                            if (e === ']')
                                a.push(i);
                            return a;
                        }, [])
                        .reduce(function(queues, a) {
                            let queueInd = getQindex(a)
                                                    
                            if (queueInd !== null){ 
                                queues[queueInd].push(s[a-1])
                            }
                            return queues

                        }, queues)
                        return indexes                    
                    })
    return queues
}

function getQindex(a) {
    let queueInd = null

    switch (true) {
        case (a < 4):
            queueInd = 0
            break
        case (a < 8):
            queueInd = 1
            break
        case (a < 12):
            queueInd = 2
            break
        case (a < 16):
            queueInd = 3
            break
        case (a < 20):
            queueInd = 4
            break
        case (a < 24):
            queueInd = 5
            break
        case (a < 28):
            queueInd = 6
            break
        case (a < 32):
            queueInd = 7
            break
        case (a < 38):
            queueInd = 8
            break
    }

    return queueInd
}


let [initial, steps] = input.split('\n\n')

let queues =  parseStartOfQueues(initial)


let finals = steps
                .split('\n')
                .map((l) => l.split(' ').filter((e) => !isNaN(e)))
                .map(function(g) {
                    let elems = queues[(g[1] - 1)].splice(0, g[0])
                    elems = elems.map((e) => queues[(g[2] - 1)].unshift(e))
                })

console.log(queues.map((q) => q[0]).join(''))



// Day 5 - Part 2
// Same thing with steps but they stay in same order, not first in-first out

queues =  parseStartOfQueues(initial)

finals = steps
            .split('\n')
            .map((l) => l.split(' ').filter((e) => !isNaN(e)))
            .map(function(g) {
                
                let elems = queues[(g[1] - 1)].splice(0, g[0])
                elems = elems.reverse().map((e) => queues[(g[2] - 1)].unshift(e))

            })

console.log(queues.map((q) => q[0]).join(''))
