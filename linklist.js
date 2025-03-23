


function isBalanced(str) {
    let stack = [];
    let matchingParenthesis = { ')': '(', '}': '{', ']': '[' };

    for ( let char of str ) {
        if (char == "{" || char == "[" || char == "(") {
            stack.push(char);
        } else {
            if (char == "}" || char == "]" || char == ")") {
                if (stack.length == 0 || stack.pop() !== matchingParenthesis[char]) {
                    return false;
                }
            }
        }
    }
    return stack.length == 0;
}

console.log(isBalanced("(())"));  // Output: true
console.log(isBalanced("({[}})"))

function dfs(graph, node, visited = new Set()) {
    console.log(node);  // Logging the node
    visited.add(node);
  
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        dfs(graph, neighbor, visited);
      }
    }
  }

function bfs(gra, start) {
    let queue = [start];
    let visited = new Set();

    visited.add(start);

    while (queue.length > 0) {
        const item = queue.shift(); // Dequeue the front item

        for (let z of gra[item]) { // Traverse each neighbor
            if (!visited.has(z)) { // Check if the neighbor has not been visited
                visited.add(z); // Mark the neighbor as visited
                queue.push(z); // Add the neighbor to the queue
            }
        }
    }
    return visited
}

const graph = {
    A: ['B', 'C'],
    B: ['A', 'D'],
    C: ['A', 'D'],
    D: ['B', 'C']
  };
  
  let z = bfs(graph, 'A'); // Start BFS from node 'A'
  console.log(z)

    // Function to find the unbalanced character (appears odd number of times)
function findUnbalanced(str) {
    const frequencyMap = {};

    // Count frequency of each character
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        frequencyMap[char] = (frequencyMap[char] || 0) + 1;
    }

    // Find the character that appears an odd number of times
    for (let char in frequencyMap) {
        if (frequencyMap[char] % 2 !== 0) {
            return char;  // Return the unbalanced character
        }
    }

    return null;  // If no unbalanced character found (all even counts)
}

// Example usage
const str1 = "abacb";  // 'c' is unbalanced (appears 1 time)
const str2 = "aabbcc"; // No unbalanced character (all even counts)
const str3 = "abcd";   // 'a', 'b', 'c', 'd' are all unbalanced (appears 1 time)

console.log(findUnbalanced(str1));  // Output: 'c'
console.log(findUnbalanced(str2));  // Output: null
console.log(findUnbalanced(str3));  // Output: 'a' (or any character that appears once)
