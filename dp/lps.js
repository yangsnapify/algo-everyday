const s = "bbbab";

function lps(str) {
    const n = str.length;
    const dp = Array.from({ length: n }, () => Array(n).fill(0));

    // 初始化：单个字符的最长回文子序列长度为 1
    for (let i = 0; i < n; i++) {
        dp[i][i] = 1;
    }

    // 处理不同长度的子串
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            let j = i + len - 1;

            if (str[i] === str[j]) {
                dp[i][j] = dp[i + 1][j - 1] + 2;
            } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[0][n - 1];
}

const z = lps(s);
console.log(z); // 输出: 4