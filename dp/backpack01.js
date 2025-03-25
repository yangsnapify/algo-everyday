function knapsack(W, weights, values) {
    const dp = new Array(W + 1).fill(0);

    for (let i = 0; i < weights.length; i++) {
        for (let j = W; j >= weights[i]; j--) {
            dp[j] = Math.max(dp[j], dp[j - weights[i]] + values[i]);
        }
    }

    return dp[W];
}

// Test case
const W = 6;
const weights = [2, 3, 1, 5];
const values = [1, 3, 5, 7];

console.log(knapsack(W, weights, values)); // Output: 12

