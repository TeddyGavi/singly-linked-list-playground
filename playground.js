const { performance } = require("perf_hooks");
const exampleLinkedList = {
  head: {
    data: 1,
    next: {
      data: 2,
      next: {
        data: 3,
        next: {
          data: 4,
          next: {
            data: 5,
            next: null,
          },
        },
      },
    },
  },
};

class LinkedNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor(head) {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  getSize() {
    return this.size;
  }

  last() {
    return this.tail.data;
  }

  first() {
    return this.head.data;
  }
  clearList() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  printList() {
    let output = "";
    let current = this.head;
    while (current !== null) {
      output += current.data + " ";
      current = current.next;
    }
    console.log(output);
  }

  prepend(data) {
    const node = new LinkedNode(data);
    if (this.size === 0) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.size++;
  }

  append(data) {
    const node = new LinkedNode(data);
    if (this.size === 0) {
      this.head = node;
      this.tail = node;
    } else {
      const temp = this.tail;
      this.tail = node;
      temp.next = this.tail;
    }
    this.size++;
  }

  removeFirstNode() {
    if (this.size === 0) {
      return null;
    }
    const first = this.head;
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.size--;
      return first.data;
    }
  }

  removeLastNode() {
    if (this.size === 0) {
      return null;
    }
    const last = this.tail;
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      let current = this.head;
      while (current.next.next !== null) {
        // stop at the second to last node
        current = current.next;
      }
      current.next = null;
      this.tail = current;
    }
    this.size--;
    return last.data;
  }

  deleteByData(data) {
    if (this.size === 0) {
      console.log("List is empty");
      return null;
    }
    let current = this.head;
    let last = this.tail;
    let previous = null;
    while (current !== null) {
      if (current.data === data) {
        if (previous === null) {
          // this means that the data to be deleted was the first element
          return this.removeFirstNode();
        } else if (last.data === data) {
          // this means that the data to be deleted was the last element
          return this.removeLastNode();
        } else {
          // set the previous value of next to the current.next value
          previous.next = current.next;
          current.next = null;
          this.size--;
          return current.data;
        }
      }
      // if the value is not found we set the previous value to the current, and current is moved to the next
      previous = current;
      current = current.next;
    }
    // if the loop ends and nothing is found, then we return null
    console.log("Data not found");
    return null;
  }

  insertAt(data, index) {
    if (index < 0 || index >= this.size) {
      return;
    }
    if (index === 0) {
      return this.prepend(data);
    } else if (index === this.size) {
      return this.append(data);
    } else {
      const node = new LinkedNode(data);
      let current = this.head;
      let previous = null;
      let counter = 0;
      // while the counter does not equal the index we move the pointers forward
      while (counter < index) {
        previous = current;
        current = current.next;
        counter++;
      }
      // we break out of the loop when the counter equals the index, we then sent the new data to link the current node and set the previous.next pointer to point at the new node
      node.next = current;
      previous.next = node;
      this.size++;
    }
  }

  // different than arrays, as we cannot look up by the index, there is no reference to index in LinkedList
  findByData(data) {
    let current = this.head;
    let counter = 0;
    while (current.next !== null) {
      if (current.data === data) {
        return `Your data, ${current.data}, was found at index ${counter}`;
      }
      current = current.next;
      counter++;
    }
    return "Not found!";
  }

  findByIndex(index) {
    if (index === 0) {
      return `The data at index ${index} is ${this.head.data}`;
    }
    if (index === this.getSize()) {
      return `the data at index ${index} is ${this.tail.data}`;
    }
    if (index > this.getSize() || index < 0) {
      return `the data at index ${index} is not available`;
    }

    let current = this.head;
    let counter = 0;
    let previous = null;

    while (counter < index) {
      current = current.next;
      previous = current;
      counter++;
    }
    return `The data at index ${index} is ${current.data}`;
  }
}

const linkedList = new LinkedList();

linkedList.clearList();

linkedList.prepend(1);
linkedList.prepend(2);
linkedList.prepend(3);
linkedList.prepend(4);
linkedList.append(-1);
linkedList.append(-2);
linkedList.append(-3);
// linkedList.printList();
// linkedList.removeFirstNode();
// linkedList.printList();
// console.log("This is the size of the list", linkedList.getSize());
// linkedList.removeLastNode();
console.log(linkedList.findByIndex(0));
console.log(linkedList.findByIndex(linkedList.getSize()));
console.log(linkedList.findByIndex(99));

linkedList.printList();
console.log("This is the size of the list", linkedList.getSize());
console.log("This is the head", linkedList.first());
console.log("This is the tail", linkedList.last());
console.log("This is current list");
linkedList.printList();
linkedList.deleteByData(4);

console.log("This is the list with element 4 deleted");
linkedList.printList();
console.log("This is the list with element 5 deleted");
linkedList.deleteByData(5);

console.log("This is the list with element -3 deleted");
linkedList.deleteByData(-3);
linkedList.printList();
console.log("This is the list with element 2 deleted");
linkedList.deleteByData(2);
linkedList.printList();
console.log("This is the size of the list", linkedList.getSize());
console.log("This is the head", linkedList.first());
console.log("This is the tail", linkedList.last());
linkedList.insertAt(4, 1);
linkedList.prepend(56);
linkedList.printList();
linkedList.removeFirstNode();
linkedList.printList();
linkedList.removeLastNode();
linkedList.printList();

console.log("This is the size of the list", linkedList.getSize());
console.log(linkedList.findByData(-1));
console.log(linkedList.findByData(99));

// const runTimeTest = (...args) => {
//   for (let i = 0; i < args.length; i++) {
//     console.time(args[i].name);
//     args[i](testArray);
//     console.timeEnd(args[i].name);
//   }
// };

// A whole Swack of tests
const testArray = Array.from(
  { length: 12500000 },
  (_, i) => i + Math.random() * 1000000
);

const ITERATION_LENGTH = 1000;

// ARRAY SUMS
let popMethodResult = 0;
let findIndexArrayResult = 0;
let pushIntoArrayResult = 0;
let unshiftIntoArrayResult = 0;
// LINKED LIST SUMS
let llRemoveMethodResult = 0;
let llFindByIndexResult = 0;
let llAppendMethodResult = 0;
let llPrependMethodResult = 0;

// console.log(testArray.length); to confirm the size of the array

// INDEXING TEST

for (let i = 0; i < ITERATION_LENGTH; i++) {
  const start = performance.now();
  const ii = testArray[Math.random() * testArray.length - 1];
  const end = performance.now();
  const result = end - start;
  findIndexArrayResult = result;
}

// REMOVE LAST ELEMENT TEST
for (i = 0; i < ITERATION_LENGTH; i++) {
  const start = performance.now();
  testArray.pop();
  const end = performance.now();
  const result = end - start;
  popMethodResult += result;
}

// PUSH INTO ARRAY TEST
for (i = 0; i < ITERATION_LENGTH; i++) {
  const start = performance.now();
  testArray.push(Math.random() * 1000000);
  const end = performance.now();
  const result = end - start;
  pushIntoArrayResult += result;
}

// ADD ELEMENT TO START OF ARRAY TEST

for (let i = 0; i < ITERATION_LENGTH; i++) {
  const start = performance.now();
  testArray.unshift(Math.random() * 1000000);
  const end = performance.now();
  const result = end - start;
  unshiftIntoArrayResult = result;
}

// CREATE NEW LIST
const llTest = new LinkedList();
for (i = 0; i < 12500000; i++) {
  llTest.append(Math.random() * 1000000);
}
// console.log(llTest.getSize()); this is the to confirm the size of the linked list

// FIND DATA BY INDEX
for (let i = 0; i < ITERATION_LENGTH; i++) {
  const start = performance.now();
  llTest.findByIndex(Math.random() * llTest.getSize());
  const end = performance.now();
  const result = end - start;
  llFindByIndexResult += result;
}

// REMOVE LAST ELEMENT
for (let i = 0; i < ITERATION_LENGTH; i++) {
  const start = performance.now();
  llTest.removeLastNode();
  const end = performance.now();
  const result = end - start;
  llRemoveMethodResult += result;
}

// APPEND DATA
for (let i = 0; i < ITERATION_LENGTH; i++) {
  const start = performance.now();
  llTest.append(Math.random() * 1000000);
  const end = performance.now();
  const result = end - start;
  llAppendMethodResult += result;
}

// PREPEND DATA
for (let i = 0; i < ITERATION_LENGTH; i++) {
  const start = performance.now();
  llTest.prepend(Math.random() * 1000000);
  const end = performance.now();
  const result = end - start;
  llPrependMethodResult = result;
}

const tableResult = {
  "FIND BY INDEX ARRAY":
    (findIndexArrayResult / ITERATION_LENGTH).toFixed(10) + " m/s",
  "FIND BY INDEX LL":
    (llFindByIndexResult / ITERATION_LENGTH).toFixed(10) + " m/s",
  "ARRAY PUSH": (pushIntoArrayResult / ITERATION_LENGTH).toFixed(10) + " m/s",
  "APPEND LL": (llAppendMethodResult / ITERATION_LENGTH).toFixed(10) + " m/s",
  "UNSHIFT ARRAY":
    (unshiftIntoArrayResult / ITERATION_LENGTH).toFixed(10) + " m/s",
  "PREPEND LL": (llPrependMethodResult / ITERATION_LENGTH).toFixed(10) + " m/s",
  "POP ARRAY": (popMethodResult / ITERATION_LENGTH).toFixed(10) + " m/s",
  "REMOVE LAST NODE LL":
    (llRemoveMethodResult / ITERATION_LENGTH).toFixed(10) + " m/s",
};

console.table(tableResult);

console.log(
  "This is the sum from the find by index Array method",
  findIndexArrayResult
);
console.log(
  "This is the sum from the find by index Linked List method",
  llFindByIndexResult
);

console.log("This is the sum from the push Array method", pushIntoArrayResult);
console.log(
  "This is the sum from the append Linked List method",
  llAppendMethodResult
);

console.log(
  "This is the result from the unshift method",
  unshiftIntoArrayResult
);
console.log(
  "This is the result from the Linked List prepend method",
  llPrependMethodResult
);

console.log("This is the sum from the pop method", popMethodResult);
console.log(
  "This is the sum from the linked list method",
  llRemoveMethodResult
);
