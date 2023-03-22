import SingularLinkedList from './singularLinkedList'

type Task<T> = () => Promise<T>

export default class PromiseQueue<T> {
    private _queue: SingularLinkedList<Task<T>>

    constructor(private _concurrent: number) {
        this._queue = new SingularLinkedList()
    }

    async run(): Promise<T[]> {
        let howManyTasks: number
        if (this.size >= this._concurrent) {
            howManyTasks = this._concurrent
        } else {
            howManyTasks = this._queue.size
        }

        const promises: Promise<T>[] = []

        for (let i = 0; i < howManyTasks; ++i) {
            const task = this._queue.shift()

            if (!task) {
                throw new Error(
                    'task is undefined, check queue implementation or run function'
                )
            }

            promises.push(
                Promise.resolve(task())
                    .then((value) => {
                        return value
                    })
                    .catch((error) => {
                        return error
                    })
            )
        }

        const result = await Promise.all(promises)

        return result
    }

    enqueue(tasks: Task<T>[]) {
        tasks.forEach((task) => {
            this._queue.append(task)
        })
    }

    get size(): number {
        return this._queue.size
    }
}
