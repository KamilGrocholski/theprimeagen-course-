export class SingularNode<T> {
    value: T
    next: SingularNode<T> | null = null

    constructor(value: T) {
        this.value = value
    }

    static create<V>(value: V): SingularNode<V> {
        return new SingularNode(value)
    }
}

export default class SingularLinkedList<T> {
    private _head: SingularNode<T> | null = null
    private _tail: SingularNode<T> | null = null
    private _size = 0

    prepend(value: T): void {
        const node = SingularNode.create(value)
        this._size++

        if (!this._head) {
            this._head = this._tail = node
            return
        }

        node.next = this._head
        this._head = node
    }

    append(value: T): void {
        const node = SingularNode.create(value)
        this._size++

        if (!this._tail) {
            this._tail = this._head = node
            return
        }

        this._tail.next = node
        this._tail = node
    }

    shift(): T | undefined {
        const head = this._head

        if (!head) {
            return undefined
        }

        if (head === this._tail) {
            this.clear()

            return head.value
        }

        this._size--
        this._head = head.next

        return head.value
    }

    isEmpty(): boolean {
        return this._head === null
    }

    clear(): void {
        this._size = 0
        this._head = this._tail = null
    }

    get head(): T | undefined {
        return this._head?.value
    }

    get tail(): T | undefined {
        return this._tail?.value
    }

    get size(): number {
        return this._size
    }

    *[Symbol.iterator]() {
        let node = this._head
        while (node) {
            yield node
            node = node.next
        }
    }
}
