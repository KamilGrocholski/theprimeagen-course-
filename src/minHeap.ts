import { COMPARISON, CompareFn, defaultCompareFn, swap } from './utils'

export default class MinHeap<T> {
    #length: number
    #compareFn: CompareFn<T>
    #heap: T[]

    constructor(compareFn: CompareFn<T> = defaultCompareFn) {
        this.#length = 0
        this.#heap = []
        this.#compareFn = compareFn
    }

    insert(value: T): void {
        this.#heap.push(value)
        this.#length++
        this.#heapifyUp(this.#length - 1)
    }

    remove(): T | undefined {
        if (this.#length === 0) {
            return undefined
        }

        const removed = this.#heap[0]
        this.#length--

        if (this.#length === 0) {
            this.#heap = []

            return removed
        }

        this.#heap[0] = this.#heap.pop() as T
        this.#heapifyDown(0)
        return removed
    }

    get length(): number {
        return this.#length
    }

    get heap(): readonly T[] {
        return this.#heap
    }

    #heapifyUp(index: number): void {
        if (index === 0) {
            return
        }

        const parentIndex = this.#getParentIndex(index)
        const parent = this.#heap[parentIndex]
        const child = this.#heap[index]
        const comparison = this.#compareFn(parent, child)

        if (comparison === COMPARISON.BIGGER) {
            swap(this.#heap, index, parentIndex)
            this.#heapifyUp(parentIndex)
        }
    }

    #heapifyDown(index: number): void {
        const leftChildIndex = this.#getLeftChildIndex(index)
        const rightChildIndex = this.#getRightChildIndex(index)

        if (index >= this.#length || leftChildIndex >= this.#length) {
            return
        }

        const leftChild = this.#heap[leftChildIndex]
        const rightChild = this.#heap[rightChildIndex]
        const item = this.#heap[index]
        const childrenComparison = this.#compareFn(leftChild, rightChild)

        if (
            childrenComparison === COMPARISON.BIGGER &&
            this.#compareFn(item, rightChild) === COMPARISON.BIGGER
        ) {
            swap(this.#heap, index, rightChildIndex)
            this.#heapifyDown(rightChildIndex)
        } else if (
            childrenComparison === COMPARISON.SMALLER &&
            this.#compareFn(item, leftChild) === COMPARISON.BIGGER
        ) {
            swap(this.#heap, index, leftChildIndex)
            this.#heapifyDown(leftChildIndex)
        }
    }

    #getParentIndex(childIndex: number): number {
        return Math.floor((childIndex - 1) / 2)
    }

    #getLeftChildIndex(parentIndex: number): number {
        return parentIndex * 2 + 1
    }

    #getRightChildIndex(parentIndex: number): number {
        return parentIndex * 2 + 2
    }
}
