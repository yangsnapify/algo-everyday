const heights = [4, 2, 3];

let count = 0;
for (let i = 1; i < heights.length - 1; i++) {
    let leftMax = Math.max(...heights.slice(0, i));
    let rightMax = Math.max(...heights.slice(i + 1));

    let minHeight = Math.min(leftMax, rightMax);
    if (minHeight > heights[i]) {
        count += minHeight - heights[i];
    }
}

console.log(count); // Output: 1

// dp

const n = [4, 2, 3];
const len = n.length;

const leftMax = new Array(len).fill(null);
const rightMax = new Array(len).fill(null);

leftMax[0] = n[0];
rightMax[len - 1] = n[len - 1];

// Fill leftMax array
for (let i = 1; i < len; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], n[i]);
}

// Fill rightMax array
for (let i = len - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], n[i]);
}

let c1 = 0;
// Calculate the trapped water
for (let i = 1; i < len - 1; i++) {
    const minHeight = Math.min(leftMax[i], rightMax[i]);
    if (minHeight > n[i]) {
        c1 += minHeight - n[i];
    }
}

console.log(c1);
