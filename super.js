function timeout(t) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, t)
    })
}

class SuperTask {
    constructor() {
        this.cb = [];
        this.c = 0;
        this.m = 2;
    }

    add(cb, na) {
        return new Promise((resolve, reject) => {
            this.cb.push({ cb, resolve, reject });
            this._process()
        })
    }

    async _process() {
       
        while (this.c < this.m && this.cb.length > 0) {
            const { cb, resolve, reject } = this.cb.shift();
            this.c ++;

        // 使用 .then() 和 .catch() 来处理异步任务
         await Promise.resolve(cb())
            .then(() => {
                resolve();  // 如果任务成功，resolve 任务
            })
            .catch((err) => {
                reject(err);  // 如果任务失败，reject 任务
            })
            .finally(() => {
                this.c--;  // 任务完成，减少正在执行的任务数量
            });
        }
    }
    
   
    //   async _process() {
    //     // If there are tasks to run, process them
    //     while (this.c < this.m && this.cb.length > 0) {
    //         const { cb, resolve, reject } = this.cb.shift();  // Get the next task
    //         this.c++;  // Increment the count of running tasks

    //         try {
    //             await cb();  // Wait for the task to complete
    //             resolve();  // Resolve the task if successful
    //         } catch (err) {
    //             reject(err);  // Reject the task if there was an error
    //         } finally {
    //             this.c--;  // Decrease the running task count
    //         }
    //     }
    // }
     

   

    //    _process() {
    //     // Process tasks while we have space for concurrent tasks
    //     if (this.cb.length === 0) return;  // If no tasks, do nothing
    //     if (this.c < this.m) {
    //         const { cb, resolve, reject } = this.cb.shift();  // Get the next task

    //         this.c++;  // Increment the count of running tasks

    //         Promise.resolve(cb()).then(resolve,reject).finally(() => {
    //             this.c--;  // Decrement the running task count after completion
    //             this._process();  // Process the next task in the queue
    //         });
    //     }
    // }
     
}

var supertask = new SuperTask();

function addTask(time, name) {
    supertask.add(() => timeout(time), name)
        .then(() => {
            console.log(`Task ${name} has completed its work.`);
        });
}

addTask(10000, 1);
addTask(5000, 2);
addTask(3000, 3);
addTask(4000, 4);
