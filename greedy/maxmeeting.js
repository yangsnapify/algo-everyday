function maxMeetings(intervals) {
    if (intervals.length === 0) return 0;

    intervals.sort((a, b) => a[1] - b[1]); // 按结束时间排序
    let count = 1, end = intervals[0][1];
    console.log(end, intervals)
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] >= end) {
            count++; // 选择该会议
            end = intervals[i][1]; // 更新最近结束时间
        }
    }
    return count;
}

console.log(maxMeetings([[1, 3], [2, 5], [3, 9], [6, 8]])); // 输出 2
console.log(maxMeetings([[0, 30], [5, 10], [15, 20]])); // 输出 1
