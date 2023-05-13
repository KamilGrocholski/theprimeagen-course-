class BinaryNode<T> {
    value: T
    left: BinaryNode<T> | null = null
    right: BinaryNode<T> | null = null

    constructor(value: T) {
        this.value = value
    }

    static create<V>(value: V) {
        return new BinaryNode(value)
    }
}

export default class BinaryTree<T> {
    root: BinaryNode<T> | null = null

    constructor() {}

    findSmallest(): T | undefined {
        if (!this.root) return undefined

        let node = this.root

        while (node.left) {
            node = node.left
        }

        return node.value
    }

    findBiggest(): T | undefined {
        if (!this.root) return undefined

        let node = this.root

        while (node.right) {
            node = node.right
        }

        return node.value
    }

    traverseLevelOrder(
        node: BinaryNode<T> | null,
        callbackFn: (node: BinaryNode<T>) => void,
    ) {
        const queue: (BinaryNode<T> | null)[] = [node]

        while (queue.length !== 0) {
            const dequeuedNode = queue.shift() as BinaryNode<T>

            callbackFn(dequeuedNode)

            if (dequeuedNode.left) {
                queue.push(dequeuedNode.left)
            }

            if (dequeuedNode.right) {
                queue.push(dequeuedNode.right)
            }
        }
    }

    traversePreOrder(
        node: BinaryNode<T> | null,
        callbackFn: (node: BinaryNode<T>) => void,
    ) {
        if (!node) return

        callbackFn(node)

        if (node.left) {
            this.traversePreOrder(node.left, callbackFn)
        }

        if (node.right) {
            this.traversePreOrder(node.right, callbackFn)
        }
    }

    traverseInOrder(
        node: BinaryNode<T> | null,
        callbackFn: (node: BinaryNode<T>) => void,
    ) {
        if (!node) return

        if (node.left) {
            this.traverseInOrder(node.left, callbackFn)
        }

        callbackFn(node)

        if (node.right) {
            this.traverseInOrder(node.right, callbackFn)
        }
    }

    traversePostOrder(
        node: BinaryNode<T> | null,
        callbackFn: (node: BinaryNode<T>) => void,
    ) {
        if (!node) return

        if (node.left) {
            this.traversePostOrder(node.left, callbackFn)
        }

        if (node.right) {
            this.traversePostOrder(node.right, callbackFn)
        }

        callbackFn(node)
    }

    add(value: T) {
        this.root = this._addRecursive(this.root, value)
    }

    remove(value: T) {
        this.root = this._removeRecursive(this.root, value)
    }

    find(value: T): BinaryNode<T> | undefined {
        return this._findRecursive(this.root, value)
    }

    private _findRecursive(
        node: BinaryNode<T> | null,
        value: T,
    ): BinaryNode<T> | undefined {
        if (!node) {
            return undefined
        }

        if (node.value === value) {
            return node
        }

        if (value < node.value) {
            return this._findRecursive(node.left, value)
        }

        if (value > node.value) {
            return this._findRecursive(node.right, value)
        }

        return undefined
    }

    private _removeRecursive(
        node: BinaryNode<T> | null,
        value: T,
    ): BinaryNode<T> | null {
        if (!node) {
            return null
        }

        if (value === node.value) {
            if (!node.right && !node.left) {
                return null
            }

            if (!node.right) {
                return node.left
            }

            if (!node.left) {
                return node.right
            }
        }

        if (value < node.value) {
            return (node.left = this._removeRecursive(node.left, value))
        }

        if (value > node.value) {
            return (node.right = this._removeRecursive(node.right, value))
        }

        return node
    }

    private _addRecursive(node: BinaryNode<T> | null, value: T) {
        if (!node) {
            return BinaryNode.create(value)
        }

        if (value < node.value) {
            node.left = this._addRecursive(node.left, value)
        }

        if (value >= node.value) {
            node.right = this._addRecursive(node.right, value)
        }

        return node
    }
}
