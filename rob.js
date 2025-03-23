function rob(nums) {
    let prev2 = 0;  // dp[i-2]
    let prev1 = 0;  // dp[i-1]

    for (let i = 0; i < nums.length; i++) {
        let temp = prev1;  
        prev1 = Math.max(prev1, prev2 + nums[i]); 
        prev2 = temp;
    }

    return prev1;
}