import fs from 'fs'

// Input file for challenge
const input = fs.readFileSync('input.txt', 'utf8')

// Day 8 - Part 1

// Split full file input in lines
const lines = input.split('\n')

// Evaluates if tree is visible, returns true/false
function isTreeVisible(columnIndex, lineIndex, value) {  
    // Get full row, split left/right, evaluate visibility          
    let row = lines[lineIndex].split('')

    let splitRows = [row.slice(0, columnIndex)]
    splitRows.push(row.slice(-(row.length - (columnIndex + 1))))

    let visibleRow = splitRows
                            .some((c) =>  c.every((t) => t < value))


    // Get full column, split up/down, evaluate visibility          
    let column = lines
                    .reduce((surr, l) => { 
                        surr.push(l.split('')[columnIndex]) 
                        return surr 
                    }, [])
    
    let splitCols = [column.slice(0, lineIndex)]
    splitCols.push(column.slice(-(column.length - (lineIndex + 1))))
    
    let visibleCol = splitCols
                        .some((c) =>  c.every((t) => t < value))
       
    // If visible in column or row, then tree is visible                       
    return (visibleCol || visibleRow)
}

// Iterate for each tree in file and find count of which are visible
function getVisibleTrees(lines, visualize) {
    // resultMatrix will only be used for visualization purposes
    let resultMatrix = []

    const visibleTrees = lines
                            .map((l) => l.split(''))
                            .map((l, i) => {
                                let visibles = l.filter((t, j) => {
                                    if (i > 0 && i < (l.length-1) && j > 0 && j < (l.length-1)) {

                                        if (visualize) {
                                            if (isTreeVisible(j, i, t)) resultMatrix.push('X')
                                            else resultMatrix.push('O')
                                        }

                                        return isTreeVisible(j, i, t)
                                    }
                                    else {
                                        if (visualize) resultMatrix.push('X')

                                        return false
                                    }
                                })
                                if (visualize) resultMatrix.push('\n')

                                return visibles
                            })
    
    // Painting visualization in the output file (X = visible / O = non-visible)
    if (visualize) {
        fs.writeFile('visible-visualization.txt', resultMatrix.join(''), (err) => {
          
            // In case of a error throw err.
            if (err) throw err;
        })
    }

    // Count Visible Trees
    let result = visibleTrees
                        .filter((x) => x.length > 0)
                        .reduce((sum, l) => sum +=l.length, 0)

    // Result does not count the perimeter, as those are already discarded as visible
    // Perimeter = ((SideLength - 2) * 4 ) + 4
    return (result + (4 * (lines[0].split('').length - 2)) + 4)
}

// Print result of Part 1
console.log(getVisibleTrees(lines, false))


// Day 8 - Part 2 - 327180

function scenicScore(columnIndex, lineIndex, value) {  
    // Get full row, split left/right, evaluate visibility          
    let row = lines[lineIndex].split('')

    let splitRows = [row.slice(0, columnIndex).reverse()]
    splitRows.push(row.slice(-(row.length - (columnIndex + 1))))

    let rowScore = splitRows
                        .reduce((score, parts) => {
                            let block = false
                            let res = parts.reduce((sum, t) => {
                                if(sum===0) block = false
                                if(block) return sum
                                if (t < value) {
                                    return sum+=1
                                } else {
                                    block = true 
                                    return sum+=1
                                } 
                            }, 0)
                            score *= res
                            return score
                        }, 1)

    // Get full column, split up/down, evaluate visibility          
    let column = lines
                    .reduce((surr, l) => { 
                        surr.push(l.split('')[columnIndex]) 
                        return surr 
                    }, [])
    
    let splitCols = [column.slice(0, lineIndex).reverse()]
    splitCols.push(column.slice(-(column.length - (lineIndex + 1))))
    

    let colScore = splitCols
                        .reduce((score, parts) => {
                            let block = false
                            let res = parts.reduce((sum, t) => {
                                if(sum===0) block = false
                                if(block) return sum
                                if (t < value) {
                                    return sum+=1
                                } else {
                                    block = true 
                                    return sum+=1
                                } 
                            }, 0)
                            score *= res
                            return score
                        }, 1)
                   
    return (colScore * rowScore)
}


function getAllScores(lines, visualize) {
    // resultMatrix will only be used for visualization purposes
    let resultMatrix = []

    const visibleTrees = lines
                            .map((l) => l.split(''))
                            .map((l, i) => {
                                let scores = l.map((t, j) => {
                                    if (i > 0 && i < (l.length-1) && j > 0 && j < (l.length-1)) {
                                        if (visualize) resultMatrix.push('['+scenicScore(j, i, t)+']')
                                        return scenicScore(j, i, t)
                                    }
                                    else {
                                        if (visualize) resultMatrix.push('['+ 0 +']')
                                        return 0
                                    }
                                })
                                if (visualize) resultMatrix.push('\n')

                                return scores
                            })
    
    // Painting visualization in the output file (X = visible / O = non-visible)
    if (visualize) {
        fs.writeFile('visible-visualization.txt', resultMatrix.join(''), (err) => {
          
            // In case of a error throw err.
            if (err) throw err;
        })
    }

    // Count Visible Trees
    let result = visibleTrees
                            .reduce((joined, tree) => {
                                // console.log(tree)
                                return joined.concat(tree)
                            }, [])
                        
                        // .filter((x) => x > 0)
                        // .reduce((sum, l) => sum +=l.length, 0)
    console.log(Math.max(...result))

    // Result does not count the perimeter, as those are already discarded as visible
    // Perimeter = ((SideLength - 2) * 4 ) + 4
    // return (result + (4 * (lines[0].split('').length - 2)) + 4)
}

getAllScores(lines, true)
// scenicScore(3, 1, 3)
