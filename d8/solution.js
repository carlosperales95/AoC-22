import { Console } from 'console'
import fs from 'fs'

const input = fs.readFileSync('input.txt', 'utf8')

let count = 0
// Day 8 - Part 1

const lines = input.split('\n')

function isTreeVisible(columnIndex, lineIndex, value) {
    
    let column = lines
                    .reduce((surr, l) => { 
                        surr.push(l.split('')[columnIndex]) 
                        return surr 
                    }, [])
                    
    let row = lines[lineIndex].split('')

    let splitRows = [row.slice(0, columnIndex)]
    // if(columnIndex != (row.length -1)) {
    splitRows.push(row.slice(-(row.length - (columnIndex + 1))))
    // }
    // else{
    //     splitRows = [row]
    // }
    let splitCols = [column.slice(0, lineIndex)]
    // if(lineIndex != (column.length - 1)) {
    splitCols.push(column.slice(-(column.length - (lineIndex + 1))))
    // }else{
    //     splitCols = [column]
    // }
    
    console.log("Tree value: " + value + " | index: " + columnIndex+"/"+lineIndex)
    console.log(splitRows)
    console.log(splitCols)
 

    let visibleCol = splitCols
                        .some((c) =>  c.every((t) => t < value))
    
    let visibleRow = splitRows
                        .some((c) =>  c.every((t) => t < value))
    
                            
    const isVisible = [visibleCol, visibleRow].some((e) => e)

    // console.log(isVisible)
    isVisible ? count+=1 : console.log("Not Visible!") 

    return isVisible
}

let resultmatrix = []

const visibleTrees = lines
                        .map((l) => l.split(''))
                        .map((l, i) => {
                            let visibles = l.filter((t, j) => {
                                // console.log(j + " " + i + " " + t)
                                // console.log("Visible?" + isTreeVisible(j, i, t))
                                // return isTreeVisible(j, i, t)
                                if (i > 0 && i < 98 && j > 0 && j < 98) {
                                    if (isTreeVisible(j, i, t)) resultmatrix.push('O')
                                    else resultmatrix.push('X')

                                    return isTreeVisible(j, i, t)
                                }
                                else {
                                    resultmatrix.push('X')
                                    return false
                                }
                             })
                            //  console.log(visibles)
                            resultmatrix.push('\n')
                            return visibles
                        })

// console.log(visibleTrees)
console.log(count + 97 + 97 + 97 + 97 + 4)

let res = visibleTrees.filter((x) => x.length > 0)
const finalCount = res.reduce((sum, l) => sum +=l.length, 0)
// console.log(finalCount + 97 + 97 + 97 + 97 + 4)
// console.log(res + 97 + 97 + 97 + 97 + 4)


// console.log(visibleTrees.reduce((sum, l) => {
//                                             sum += l.length
//                                             return sum
//                                         },0))

// console.log(count + 97 + 97 + 97 + 97 + 4)

// // console.log(isTreeVisible(3, 12, 4))
// console.log(isTreeVisible(1, 97, 3))
// console.log(isTreeVisible(47, 97, 5))


// Part 1: 1851

// Part 2: 574080


fs.writeFile('Output.txt', resultmatrix.join(''), (err) => {
          
    // In case of a error throw err.
    if (err) throw err;
})

let countxt = resultmatrix.filter((x) => x==='O').length
console.log(countxt)