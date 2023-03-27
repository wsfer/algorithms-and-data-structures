// Multiples of 3 or 5
// From https://projecteuler.net/problem=1

/* If we list all the natural numbers below 10 that are multiples of 3 or 5,
we get 3, 5, 6 and 9. The sum of these multiples is 23.
Find the sum of all the multiples of 3 or 5 below 1000.
*/

function sumMultiples(n) {
    // Base case: no more multiples below n < 3
    if (n < 3) return 0;

    // Recursive case: get all multiples below n and sum with n if it's multiple
    return sumMultiples(n-1) + ((n % 3 === 0 || n % 5 === 0) ? n : 0);
}

console.log(sumMultiples(999));
