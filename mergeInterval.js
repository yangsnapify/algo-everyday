// merge intervals
// [1, 3], [2, 6], [8, 10], [15, 18] => [ [ 1,6 ], [ 8, 10 ], [ 15, 18 ]]

function merge() {
    let resut = []
    let val =  [[1, 3], [2, 6], [8, 10], [15, 18]];
    const range = val.map((x) => resut.push(calRange(x[0], x[1])));
    const flattenVal = flatte(val);
    const cleanRange = flattenVal.filter((x) => !flatte(resut).includes(x) && x);
    const final =  twodArr(cleanRange);
    console.log(final)
}
function calRange(x, y) {
    let dup = [];
    for (let iz = x; iz < y; iz ++ ) {
       if (iz > x && iz < y) {
           dup.push(iz);
       }     
    }
    return dup;
}
function flatte(arr) {
    let result = [];

    function run(_arr) {
        for (let i of _arr) {
            if (Array.isArray(i)) {
                run(i);
            } else {
                result.push(i)
            }
        }
    }
    run(arr);
    return result;
}
function twodArr(arr) {
    let result = []
    function runner() {
        const first = arr.shift();
        const second = arr.shift();
        result.push([first, second])
    }
   
    while(arr.length > 0) {
       runner()     
    }
    return result;
}
merge();
