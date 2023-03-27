// Largest Prime Factor
// From https://projecteuler.net/problem=3

/* The prime factors of 13195 are 5, 7, 13 and 29.
What is the largest prime factor of the number 600851475143 ?
*/

function largestPrimeFactor(n) {
    // Base cases:
    if (n < 3) return 1;
    if (n % 2 === 0) return largestPrimeFactor(n/2);
    let prime = 3;
    while (n % prime !== 0) { // Find a prime that divides n
        prime = nextPrime(prime);
    }
    if (n === prime) return n;

    // Recursive case: divide n by the smallest prime factor and calculate the largest again
    return largestPrimeFactor(n/prime);
}

// A function to get the next prime number after n
function nextPrime(n) {
    if (n < 3) return 3;
    let next = n;
    let isPrime = false;
    while (!isPrime) {
        next += 1;
        isPrime = true;
        for (let i = 2; i < next; i++) {
            if (next % i === 0) {
                isPrime = false;
                break;
            }
        }
    }
    return next;
}

console.log(largestPrimeFactor(600851475143)); // Expected 6857
