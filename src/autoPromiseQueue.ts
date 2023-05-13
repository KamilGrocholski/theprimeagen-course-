export type PromiseFactory = () => Promise<unknown>

export default class AutoPromiseQueue {
    private maxConcurrent: number
    private queue: PromiseFactory[]
    private runningTasks: number

    constructor(maxConcurrent: number) {
        this.maxConcurrent = maxConcurrent
        this.queue = []
        this.runningTasks = 0
    }

    enqueue(promiseFactory: PromiseFactory): void {
        const task = async () => {
            this.runningTasks++
            try {
                await promiseFactory()
            } finally {
                this.runningTasks--
                this.runTask()
            }
        }

        if (this.runningTasks >= this.maxConcurrent) {
            this.queue.push(task)
        } else {
            task()
        }
    }

    private runTask(): void {
        if (this.runningTasks >= this.maxConcurrent || this.queue.length <= 0) {
            return
        }

        const nextTask = this.queue.shift() as PromiseFactory

        nextTask()
    }
}
