class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// Build a basic binary tree from an array of integers
// This tree isn't a self balanced (AVL or red-black tree) but have methods to balance
class Tree {
    constructor(array) {
        // Remove duplicate elements and sort the array
        const sortedArray = [...new Set(array)].sort((a, b) => (a > b) ? 1 : -1);
        this.root = this.buildTree(sortedArray, 0, sortedArray.length-1);
    }

    // Recursively build a subtree with subarray[start...end]
    buildTree(array, start, end) {
        // Base case
        if (start > end) return null;

        // Get the middle element of the array and build the root node
        const mid = Math.floor((start + end)/2);
        const node = new Node(array[mid]);
        // Recursively build the subtree on the left and right side of the root node
        node.left = this.buildTree(array, start, mid-1);
        node.right = this.buildTree(array, mid+1, end);
        // Return the root node
        return node;
    }

    // Insert a new node with given value and returns the root node
    insert(data, root=this.root) {
        // Base case
        if (root === null) return new Node(data);

        // Recursively traverse the tree until a leaf node is found
        // Then insert a child node with the data there
        if (data < root.data) {
            root.left = this.insert(data, root.left);
        } else if (data > root.data) {
            root.right = this.insert(data, root.right);
        }

        return root;
    }

    // Delete a node with given value and returns the root node
    delete(data, root=this.root) {
        // Base case: there's no node with given value
        if (root === null) return root;

        // Recursively traverse the tree until the node with given value is found
        if (data < root.data) {
            root.left = this.delete(data, root.left);
        } else if (data > root.data) {
            root.right = this.delete(data, root.right);
        // Value is found - remove it
        } else {
            // For one or zero child nodes
            if (root.left === null) {
                return root.right;
            } else if (root.right === null) {
                return root.left;
            }

            // For two child nodes
            // Find the successor node
            let successor = root.right;
            while (successor.left) {
                successor = successor.left;
            }
            // Delete the successor from the root's right subtree
            root.right = this.delete(successor.data, root.right);
            // Replace root's value with successor's value
            root.data = successor.data;
            return root;
        }

        return root;
    }

    // Returns the node with given value, or null if value is not found
    find(data, root=this.root) {
        // Base case
        if (root === null || root.data === data) return root;

        // Data < root's value, search on left subtree
        if (data < root.data) return this.find(data, root.left);
        // Data > root's value, search on right subtree
        if (data > root.data) return this.find(data, root.right);
    }

    // The 4 methods below run the given function on each node in the specific order traverse
    // Returns an array with the function's returned value on each element
    // Or an array of elements, if no function is given

    // Breadth First Traverse
    // TODO: use a real queue class, to avoid O(n) array methods such as Array.shift
    levelOrder(func, root=this.root) {
        if (root === null) return;
        const queue = [];
        queue.push(root);
        const values = [];
        while (queue.length > 0) {
            const node = queue.shift();
            values.push((func) ? func(node) : node.data);
            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        }
        return values;
    }

    // Depth First Traverse
    inOrder(func, root=this.root, values=[]) {
        // Base case
        if (root === null) return;
        
        this.inOrder(func, root.left, values);
        values.push((func) ? func(root) : root.data);
        this.inOrder(func, root.right, values);

        return values;
    }

    preOrder(func, root=this.root, values=[]) {
        // Base case
        if (root === null) return;
        
        values.push((func) ? func(root) : root.data);
        this.preOrder(func, root.left, values);
        this.preOrder(func, root.right, values);

        return values;
    }

    postOrder(func, root=this.root, values=[]) {
        // Base case
        if (root === null) return;
        
        this.postOrder(func, root.left, values);
        this.postOrder(func, root.right, values);
        values.push((func) ? func(root) : root.data);

        return values;
    }

    // Returns the height of a subtree
    height(root=this.root) {
        /** 
         * A recursive case always consider there's an edge connecting the root to subtree 
         * then it sum + 1, but there isn't an edge on base case, so -1 is returned here
         */
        // Base case
        if (root === null) return -1;

        // Get the left subtree and right subtree height
        const LSubTreeH = this.height(root.left);
        const RSubTreeH = this.height(root.right);
        // Sum 1 to the biggest value, because there's an edge connecting the root with subtree
        // And return
        return Math.max(LSubTreeH, RSubTreeH) + 1;
    }

    // Returns the depth of a node: the number of edges in path from a given node to the tree’s root node.
    depth(node) {
        let depth = 0;
        let tmp = this.root;
        while (tmp !== node) {
            tmp = (node.data < tmp.data) ? tmp.left : tmp.right;
            depth += 1;
        }
        return depth;
    }

    // Check if the difference between heights of left subtree and right
    // subtree of every node is not more than 1.
    isBalanced(root=this.root) {
        // Base cases
        if (root === null) return true;

        const LSubTreeH = this.height(root.left);
        const RSubTreeH = this.height(root.right);
        const difference = Math.abs(LSubTreeH - RSubTreeH);

        if (difference < 2) {
            return this.isBalanced(root.left) && this.isBalanced(root.right);
        }
        return false;
    }

    // Replace the tree with a new tree balanced tree by using current tree nodes
    rebalance() {
        // inOrder traverse gives a sorted array with all node values
        const sortedArray = this.inOrder();
        this.root = this.buildTree(sortedArray, 0, sortedArray.length-1)
    }
}

// Auxiliary function to print the binary tree
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root);
console.log('Tree balanced: ' + tree.isBalanced()); // true

console.log(tree.levelOrder()); // [8, 4, 67, 1, 5, 9, 324, 3, 7, 23, 6345]
console.log(tree.inOrder()); // [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]
console.log(tree.preOrder()); // [8, 4, 1, 3, 5, 7, 67, 9, 23, 324, 6345]
console.log(tree.postOrder()); // [3, 1, 7, 5, 4, 23, 9, 6345, 324, 67, 8]

tree.insert(100);
tree.insert(101);
tree.insert(102);
tree.insert(103);
tree.insert(104);
tree.insert(105);
prettyPrint(tree.root);
console.log('Tree balanced: ' + tree.isBalanced()); // false

tree.rebalance();

prettyPrint(tree.root);
console.log('Tree balanced: ' + tree.isBalanced()); // true

console.log(tree.levelOrder()); // [67, 5, 103, 3, 8, 101, 105, 1, 4, 7, 9, 100, 102, 104, 324, 23, 6345] 
console.log(tree.inOrder()); // [1, 3, 4, 5, 7, 8, 9, 23, 67, 100, 101, 102, 103, 104, 105, 324, 6345]
console.log(tree.preOrder()); // [67, 5, 3, 1, 4, 8, 7, 9, 23, 103, 101, 100, 102, 105, 104, 324, 6345]
console.log(tree.postOrder()); // [1, 4, 3, 7, 23, 9, 8, 5, 100, 102, 101, 104, 6345, 324, 105, 103, 67]
