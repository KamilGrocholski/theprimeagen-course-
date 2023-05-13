export type Subscription<T> = (message: T) => void

export default class Subscribable<T> {
    private _subscribers: Set<Subscription<T>> = new Set()

    constructor() {}

    subscribe(onNotify: () => void): () => void {
        this._subscribers.add(onNotify)

        return () => {
            return this.unsubscribe(onNotify)
        }
    }

    unsubscribe(onNotify: () => void): void {
        this._subscribers.delete(onNotify)
    }

    notify(message: T): void {
        this._subscribers.forEach((onNotify) => onNotify(message))
    }
}
