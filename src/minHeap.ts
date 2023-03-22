export default class MinHeap<T> {
    public length: number
    _storage: T[]

    constructor() {
        this._storage = []
        this.length = 0
    }

    insert(value: T): void {
        this._storage[this.length] = value
        this._heapifyUp(this.length)
        this.length++
    }

    // delete(index: number): T {

    // }

    private _heapifyDown(index: number): void {
        if (index >= this.length) {
            return
        }

        const leftIndex = this._leftChild(index)
        const rightIndex = this._rightChild(index)

        if (leftIndex >= this.length || rightIndex >= this.length) {
            return
        }
    }

    private _heapifyUp(index: number): void {
        const parentIndex = this._parent(index)
        const parentValue = this._storage[parentIndex]
        const value = this._storage[index]

        if (parentValue > value) {
            this._storage[index] = parentValue
            this._storage[parentIndex] = value
            this._heapifyUp(parentIndex)
        }
    }

    private _parent(index: number): number {
        return Math.floor((index - 1) / 2)
    }

    private _leftChild(index: number): number {
        return index * 2 + 1
    }

    private _rightChild(index: number): number {
        return index * 2 + 2
    }
}
