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
  const transposedMatrix = matrix[0].map((_, colIndex) =>
    matrix.map(row => row[colIndex])
  );

  return transposedMatrix.map(row => row.reverse());
}

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const rotatedMatrix = rotateMatrix(matrix);

// 6. curry fn
function cur(fn) {
  let a = [];
  return function cur1(...args) {
    a = [...a, ...args];
    if (args.length == 0) {
      return fn(...a)
    }
    return cur1;
  }
}
function add(...args) {
  console.log(args)
}
var a = cur(add);
a(1, 2)(3)();

// Array reduce with async functions
const asyncReduce = async (arr, fn, initial) => {
  let result = initial;
  for (const item of arr) {
    result = await fn(result, item);
  }
  return result;
};
asyncReduce([1,2,3], async (acc, val) => acc + val, 0).then(console.log); // 6

// Custom Promise.all implementation
function customPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    
    if (promises.length === 0) return resolve([]);

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(result => {
          results[index] = result;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject); // If any promise fails, reject immediately
    });
  });
}

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

// Map with concurrency limit
async function limit() {
  const limit = 2;
  const arr = [1, 2, 3, 4, 5, 6];
  const queue = [];
  let current = 0;
  let running = 0;

  async function runner() {
    while (arr.length > 0) {
      if (running < limit) {
        const item = arr.shift();
        running++;
        req(item).then((result) => {
          queue[current] = result;
          current++;
          running--;
          runner();
            console.log(queue)
        });
      } else {
        break;
      }
    }
  }

  for (let i = 0; i < limit; i++) {
    runner();
  }
}

function req(i) {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(i);
    }, 1000);
  });
}

limit();

// Convert callback to promise
const promisify = (fn) => (...args) => 
  new Promise((resolve, reject) => 
    fn(...args, (err, result) => err ? reject(err) : resolve(result))
  );

const readFile = promisify(fs.readFile);
readFile('file.txt').then(console.log);