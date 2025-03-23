// 1. flatten objects
function flatobj(obj) {
  let name = "";
  let newobj = {}
  function intobj(obj, n) {
    for (let i in obj) {
      name = `${n}${i}`
      if (typeof obj[i] == "object") {
        intobj(obj[i], name);
      } else {
        newobj[name] = obj[i]
      }
    }
  }
  intobj(obj, name);
  return newobj;
}
console.log(flatobj({
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3
    }
  }
}))

// 2. flatten array
function flatten(arr) {
  let result = [];
  function intfl(arr2) {
    for (const i of arr2) {
      if (Array.isArray(i)) {
        intfl(i);
      } else {
        result.push(i)
      }
    }
  }
  intfl(arr);
  return result;
}
console.log(flatten([1, [2, [3, [4]], 5]]));

// 3. debounce fn
function debounce(fn) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn()
    }, 1000)
  }
}

// 4. throttle fn
function throttle(fn) {
  let timeout;
  return function(...args) {
    let context = this;
    if (!timeout) {
      timeout = setTimeout(() => {
        fn.apply(context, args)
        timeout = null;
      }, 1000);
    }
  }
}

// 5. rotate
function rotateMatrix(matrix) {
  const transposedMatrix = matrix[0].map((_, colIndex) =>matrix.map(row => row[colIndex]));

  return transposedMatrix.map(row => row.reverse());
}

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const rotatedMatrix = rotateMatrix(matrix);

// 6. curry fn
function cur(...args) {
  return function(...args1) {
      if ( args1.length === 0) {
          console.log([...args, ...args1]);
          return;
      }
      return cur([...args, ...args1]);
  }
}
cur(1)(2, 3)();

// Array reduce with async functions
async function asyncReduceSequential() {
  const arr = [1, 2, 3, 4, 5];

  await arr.reduce(async (prevPromise, next) => {
      await prevPromise; // Wait for the previous operation
      console.log(next);
      return new Promise((res) => setTimeout(res, 1000)); // Simulate async task
  }, Promise.resolve());
}

asyncReduceSequential();

// Custom Promise.all implementation
function customPromise() {
  let tasks = [1, 2, Promise.reject("err"), 4, 5];
  return new Promise((resolve, reject) => {
      let hasRejected = false;
      
      // Process tasks sequentially
      let processNextTask = (index) => {
     
          if (index >= tasks.length) {
              resolve(); // All tasks completed successfully
              return;
          }
          
          Promise.resolve(tasks[index])
              .then((value) => {
                  console.log(`log${value}`);
                  processNextTask(index + 1);
              })
              .catch(() => {
                  console.log("err");
                  reject();
              });
      };
      
      processNextTask(0);
  });
}

customPromise().catch(() => console.log("Promise Rejected"));

function customPromise() {
  let tasks = [1, 2, Promise.reject("err"), 4, 5];
  return new Promise((resolve, reject) => {
      let results = [];
      let completed = 0;
      
      // Process all tasks in order
      tasks.forEach((task, index) => {
          Promise.resolve(task)
              .then(value => {
                  console.log(`log${value}`);
                  results[index] = { status: 'fulfilled', value };
              })
              .catch(error => {
                  console.log("err");
                  results[index] = { status: 'rejected', reason: error };
              })
              .finally(() => {
                  completed++;
                  if (completed === tasks.length) {
                      // All promises have settled (either resolved or rejected)
                      resolve(results);
                  }
              });
      });
  });
}

customPromise()
  .then(results => console.log("All promises settled"))
  .catch(() => console.log("This won't be called"));

// Custom deep clone implementation
function deepClone(value) {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(item => deepClone(item));
  }

  const cloned = {};
  for (let key in value) {
    if (value.hasOwnProperty(key)) {
      cloned[key] = deepClone(value[key]);
    }
  }
  return cloned;
}
const obj = {a: {b: 1}};
const cloned = deepClone(obj);

// Event emitter
class Events {
  constructor() {
    this.events = {};
  }
  on(event, cb) {
    (this.events[event] ??= []).push(cb);
  }
  emit(event, data) {
    this.events[event]?.forEach(cb => cb(data));
  }
}
const events = new Events();
events.on('test', console.log);
events.emit('test', 'hello'); // logs: hello

async function limit(l) {
  const arr = [1, 2, 3, 4, 5, 6]; 
  let index = 0;
  let result = [];

  async function processBatch() {
      const batchPromises = [];
      while (index < arr.length && batchPromises.length < l) {
          batchPromises.push(req(arr[index++]).then((res) => {
              result.push(res);
          }));
      }

      await Promise.all(batchPromises);
      if (index < arr.length) {
          await processBatch();
      }
  }

  return processBatch().then(() => {
      return result;
  });
}

limit(2).then((result) => {
  console.log('Result:', result);
});

// Convert callback to promise
const promisify = (fn) => (...args) => 
  new Promise((resolve, reject) => 
    fn(...args, (err, result) => err ? reject(err) : resolve(result))
  );

const readFile = promisify(fs.readFile);
readFile('file.txt').then(console.log);

function isPalindrome() {
  const words = "abAAba";

  let i = 0,
      j = words.length - 1;
  const isvalid = v => /[a-z0-9]/.test(v);
  while (i < j) {


      if (!isvalid(words[i])) {
          i++;
      }
      if (!isvalid(words[j])) {
          j--;
      };
      

      if (words[i] === words[j]) {
          i++;
          j--;
      } else if (words[i] !== words[j]) {
          return false;
      }
  }
  return true;
}
isPalindrome()


function runpause() {
  let ispause = false;
  let i = 0;
  const tasks = [1, 2, 3, 4, 5];

  async function executeTasks() {
      while (i < tasks.length) {
          if (ispause) return;  // ✅ Now this works because execution can be interrupted
          console.log(`Processing: ${tasks[i]}`);
          i++;

          // ✅ This creates a pause and lets other events (like pause()) be handled
          await new Promise(resolve => setTimeout(resolve, 500));
      }
      console.log("end");
  }

  return {
      start: () => {
          ispause = false;
          executeTasks();
      },
      pause: () => {
          console.log("Pause called!");
          ispause = true;
      }
  };
}

const runner = runpause();
runner.start();

setTimeout(() => runner.pause(), 1200); // Pause after 1.2s
