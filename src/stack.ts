import SingularLinkedList from './singularLinkedList'

export default class Stack<T> {
    private _storage: SingularLinkedList<T>

    constructor() {
        this._storage = new SingularLinkedList()
    }

    add(value: T): void {
        this._storage.prepend(value)
    }

    remove(): T | undefined {
        return this._storage.shift()
    }

    isEmpty(): boolean {
        return this._storage.isEmpty()
    }

    get size(): number {
        return this._storage.size
    }

    clear(): void {
        this._storage.clear()
    }
}
