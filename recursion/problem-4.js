// Largest Palindrome Product
// From https://projecteuler.net/problem=4

/* A palindromic number reads the same both ways. The largest palindrome made from
the product of two 2-digit numbers is 9009 = 91 × 99.
Find the largest palindrome made from the product of two 3-digit numbers.
*/


function largestPalindrome(n=999, largest=0) {
    // Base case: n = 100, reached the last digit then return the largest palindrome found
    if (n <= 100) return largest;

    for (let a = 100; a <= n; a++) {
        let product = a * n;
        if (isPalindrome(product) && product > largest) {
            largest = product;
        }
    }

    // Recursive case: keep calling the same function again while substracting 1 from n,
    // while passing the current largest palindrome found as parameter.
    // The last call (base case) will return the largest number found in all calls (passed as parameter).
    return largestPalindrome(n-1, largest);
}

// A function to check if number is palindrome
function isPalindrome(n) {
    let num = n.toString();
    let front = 0;
    let back = num.length - 1;

    let bool = true;
    while (bool) {
        if (num[front] !== num[back]) {
            bool = false;
            break;
        }
        front += 1;
        back -= 1;
        if (front >= back) break;
    }
    return bool;
}

console.log(largestPalindrome());
