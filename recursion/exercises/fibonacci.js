/* Fibonacci functions that return the sequence as an array */

// Using iteration
function fibs(number) {
    if (number <= 1) return [0];
    const sequence = [0, 1];
    for (let i = 0 ; i < number-2 ; i++) {
        sequence.push(sequence[i] + sequence[i+1]);
    }
    return sequence;
}

// Using recursion
// Get previous fibsRec(number-1) and put the current fibbonaci value to this array
function fibsRec(number) {
    if (number <= 2) return [0, 1].slice(0, number);
    const prev = fibsRec(number-1);
    return prev.concat([prev[number-2] + prev[number-3]]);
}

// One line, This works...
function fibsRecrazy(number) {
    return (number <= 2) ? [0, 1].slice(0, number) : ((prev) => prev.concat([prev[number-2] + prev[number-3]]))(fibsRecrazy(number-1))
}
