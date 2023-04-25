// Lesson from The Odin Project
// The Merge Sort which takes an array and return the same array sorted.

function mergeSort(array) {
    // Base case: array of length 1 is already sorted
    if (array.length === 1) {
        return array;
    }

    // Recursive case: split the array in two sorted arrays
    
    const leftArray = mergeSort(array.slice(0, Math.round(array.length/2)));
    const rightArray = mergeSort(array.slice(Math.round(array.length/2)));
    let leftPointer = 0;
    let rightPointer = 0;

    // This will clear the original array by reference, even if it's a const variable
    array.length = 0;

    // Keep comparing the elements of the two sorted arrays
    // and pushing the lowest to the original array
    // until reach the end of one sorted array
    while (leftPointer < leftArray.length && rightPointer < rightArray.length) {
        if (leftArray[leftPointer] <= rightArray[rightPointer]) {
            array.push(leftArray[leftPointer]);
            leftPointer += 1;
        } else {
            array.push(rightArray[rightPointer]);
            rightPointer += 1;
        }
    }
    
    // Finally, when one of the sorted arrays is at the end, just merge the remaining elements
    array.push(...leftArray.slice(leftPointer), ...rightArray.slice(rightPointer));
 
    // Also return a reference to the original array, which is now sorted
    return array;
}

// You could get rid of pointers by using Array.shift(), the code would be smaller.
// However the method Array.shift() is slower for bigger arrays,
// which could cause perfomance issues.