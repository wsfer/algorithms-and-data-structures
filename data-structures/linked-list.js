class Node {
    constructor(value=null, next=null) {
        this.value = value;
        this.next = next;
    }

    toString() {
        return `( ${this.value} ) -> `;
    }
}

class LinkedList {
    #head;
    #tail;
    #size;
    constructor() {
        this.#head = null;
        this.#tail = null;
        this.#size = 0;
    }

    get length() {
        return this.#size;
    }

    // Insert a node at the end of the list. O(1)
    append(value) {
        const node = new Node(value);
        if (!this.#head) { // When list is empty.
            this.#head = node;
            this.#tail = node;
        } else {
            this.#tail.next = node;
            this.#tail = node;
        }
        this.#size += 1;
    }

    // Insert a node at the start of the list. O(1)
    prepend(value) {
        const node = new Node(value);
        if (!this.#head) { // When list is empty.
            this.#head = node;
            this.#tail = node;
        } else {
            node.next = this.#head;
            this.#head = node;
        }
        this.#size += 1;
    }

    // Returns the node at given index. O(n)
    at(index) {
        if (index >= this.#size || index < 0) {
            throw new Error("There's no such index.");
        }
        let node = this.#head;
        for (let i = 0; i < index; i++) {
            node = node.next;
        }
        return node;
    }

    // Returns true if any node contains the given value. O(n)
    contains(value) {
        let node = this.#head;
        while (node) {
            if (node.value === value) return true;
            node = node.next;
        }
        return false;
    }

    // Returns the index of node containing given value, or null if not found. O(n)
    find(value) {
        let node = this.#head;
        let index = 0;
        while (node) {
            if (node.value === value) return index;
            node = node.next;
            index += 1;
        }
        return null;
    }

    // Remove and returns the last element from list. O(n)
    pop() {
        if (this.#size === 0) {
            throw new Error('List is empty.');
        }

        // This variable is returned at the end of the function.
        const removedNode = this.#tail;

        if (this.#size === 1) {
            this.#head = null;
            this.#tail = null;
            this.#size -= 1;
            return removedNode;
        }

        // Get the node before the last node, which will become the last.
        let node = this.#head;
        for (let i = 0; i < this.#size - 2; i++) {
            node = node.next;
        }

        node.next = null;
        this.#tail = node;
        

        this.#size -= 1;
        removedNode.next = null;
        return removedNode;
    }

    // Insert a node with given value at given index. O(n)
    insertAt(value, index) {
        if (index > this.#size || index < 0) {
            throw new Error("There's no such index.");
        }

        if (index === this.#size) { // Empty list or last position.
            this.append(value);
            return;
        } else if (index === 0) { // First position.
            this.prepend(value);
            return;
        }
        
        // General case
        const node = new Node(value);

        let tmp = this.#head;
        // Get the element before given index.
        for (let i = 0; i < index - 1; i++) {
            tmp = tmp.next;
        }

        node.next = tmp.next;
        tmp.next = node;
        this.#size += 1;
    }

    // Remove and returns the node at given index. O(n)
    removeAt(index) {
        if (index >= this.#size || index < 0) {
            throw new Error("There's no such index.");
        }


        if (index === this.#size - 1) { // For last element.
            return this.pop();
        } else if (index === 0) { // For first element.
            const removedNode = this.#head;
            this.#head = this.#head.next;
            this.#size -= 1;
            removedNode.next = null;
            return removedNode;
        }

        // General case.

        let node = this.#head;
        // Get the element before given index.
        for (let i = 0; i < index - 1; i++) {
            node = node.next;
        }
        const removedNode = node.next;
        node.next = removedNode.next;
        this.#size -= 1;
        removedNode.next = null;
        return removedNode;
    }

    // Returns the list as a string. O(n)
    toString() {
        if (!this.#head) { // When list is empty.
            return 'null';
        }
        let list = '';
        let node = this.#head;
        while (node) {
            list += node.toString();
            node = node.next;
        }
        list += 'null';
        return list;
    }
}
