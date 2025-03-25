function t(fn) {
    
    return new Promise((resolve, reject) => {
        let anotherms;
        const z = setTimeout(() => {
            clearTimeout(anotherms);
             reject("timesup");
            
        }, 4000);

          const resolveFn = () => {
                clearTimeout(z);
                resolve()
            }
            anotherms = fn(resolveFn)
    })
}

var ba;
function fn22(rel) {
    ba = setTimeout(() => {
            console.log('data')
            rel()
    }, 6000);
    return ba;
}

                   
t((rel) => fn22(rel))



//2
function t(fn, timeoutMs) {
    return Promise.race([
        new Promise((_, reject) => 
            setTimeout(() => reject("timesup"), timeoutMs)
        ),
        new Promise(fn)
    ]);
}

function fn22(rel) {
    setTimeout(() => {
        console.log("data");
        rel();
    }, 6000);
}

t(fn22, 4000)
    .then(() => console.log("成功执行"))
    .catch((err) => console.log(err)); // 4秒后超时，输出 "timesup"