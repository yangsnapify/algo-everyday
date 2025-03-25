function eraseOverlapIntervals(intervals) {
    if (intervals.length === 0) return 0;

    intervals.sort((a, b) => a[1] - b[1]); // 按结束时间排序
    let count = 0, end = intervals[0][1];

    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < end) { 
            count++; // 发现重叠，需要删除
        } else {
            end = intervals[i][1]; // 更新当前不重叠区间的结束时间
        }
    }
    return count;
}

console.log(eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]])); // 输出 1
console.log(eraseOverlapIntervals([[1,2],[1,2],[1,2]])); // 输出 2
console.log(eraseOverlapIntervals([[1,2],[2,3]])); // 输出 0
