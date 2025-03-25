const result = [Promise.reject("err1"), 3,  Promise.reject("err2")]

function p1( retry) {
    console.log("retry", retry);
    if (retry === 0) return;
    
    return new Promise((resolve, reject) => {

        Promise.resolve(result[result.length - retry])
            .then(d => {
                console.log("success", d)
                return resolve(d);
            })
            .catch(err => {
                console.log(err)
                retry--;
                resolve(p1(retry))
            })
    })
}


p1(3).then(console.log);
