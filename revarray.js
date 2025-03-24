const a = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const k = 2;
const result = []

function b() {
    for (let i = 0; i < a.length; i++) {
        if (i % k !== 0) {
            result.push(a[i], a[i - 1])
        }
    }
    if (a.length % k !== 0) {
        result.push(a[a.length - 1]);
    }

    return result
}
b();

function reverseEveryK(a, k) {
    const result = [];

    for (let i = 0; i < a.length; i += k) {
        result.push(...a.slice(i, i + k).reverse()); 
    }

    return result;
}

console.log(reverseEveryK(a, k));
