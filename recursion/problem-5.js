// Smallest multiple
// From https://projecteuler.net/problem=5

/* 2520 is the smallest number that can be divided by each of the numbers from 1 to 10
without any remainder.
What is the smallest positive number that is evenly divisible by all of the numbers
from 1 to 20?
*/


function smallestMultiple(n, result=0, max=0) {
    if (result === 0) { // FIRST CALL
        // Get the multiple of all primes below or equal to n
        result = primeFactors(n).reduce((acc, num) => acc * num, 1);
        [n, max] = [0, n]; // A count to know when the recursion ends

    } else if (result % n !== 0) { // RECURSIVE CALL
        // Check if result is divisible by n
        // If it's not, multiply base by the smallest prime factor of n
        result *= primeFactors(n).filter((prime) => n % prime === 0)[0];
    }

    // Base case:
    if (n >= max) return result;
    
    // Recursive case:
    return smallestMultiple(n+1, result, max);
}

// Returns an array with all prime numbers below or equal n
function primeFactors(n) {
    let primes = [];
    // For each number <= n
    for (let i = 2; i <= n; i++) {
        let isPrime = true;
        // Check if it's prime
        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(i);
        }
    }
    return primes;
}

console.log(smallestMultiple(20)); // Expected 232792560
