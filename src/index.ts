import PromiseQueue from './promiseQueue'

const pq = new PromiseQueue<number>(2)

pq.enqueue([
    async () => 1,
    async () => 2,
    async () => 3,
    async () => 4,
    async () => 5,
])
;(async () => {
    const doConcurrentTasks = async () => await pq.run()

    const currentSize = pq.size
    for (let i = 0; i < currentSize; ++i) {
        const d = await doConcurrentTasks()
        d.forEach((e) => console.log(e))
    }
})()
