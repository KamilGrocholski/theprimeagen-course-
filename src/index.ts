// import PromiseQueue from './promiseQueue'

// const pq = new PromiseQueue<number>(2)

// pq.enqueue([
//     async () => 1,
//     async () => 2,
//     async () => 3,
//     async () => 4,
//     async () => 5,
// ])
// ;(async () => {
//     const doConcurrentTasks = async () => await pq.run()

//     const currentSize = pq.size
//     for (let i = 0; i < currentSize; ++i) {
//         const d = await doConcurrentTasks()
//         d.forEach((e) => console.log(e))
//     }
// })()

import MinHeap from './minHeap'

const minHeap = new MinHeap<number>()

minHeap.insert(8)
minHeap.insert(6)
minHeap.insert(1)
minHeap.insert(3)
minHeap.insert(1)

console.log(minHeap.heap)

minHeap.remove()

console.log(minHeap.heap)
