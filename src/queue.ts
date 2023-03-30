import SingularLinkedList from './singularLinkedList'

export default class Queue<T> {
    private _storage: SingularLinkedList<T>

    constructor() {
        this._storage = new SingularLinkedList()
    }

    pop(): T | undefined {
        return this._storage.shift()
    }

    push(value: T): void {
        this._storage.append(value)
    }

    peek(): T | undefined {
        return this._storage.head
    }

    get isEmpty(): boolean {
        return this._storage.isEmpty()
    }

    get size(): number {
        return this._storage.size
    }
}
