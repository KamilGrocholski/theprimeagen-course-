class NodeDouble<T> {
  value: T;
  prev: NodeDouble<T> | null = null;
  next: NodeDouble<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }

  static create<V>(value: V): NodeDouble<V> {
    return new NodeDouble(value);
  }
}

export default class LRU<K, V> {
  private _head: NodeDouble<V> | null;
  private _tail: NodeDouble<V> | null;
  private _length: number;

  private _lookup: Map<K, NodeDouble<V>>;
  private _reverseLookup: Map<NodeDouble<V>, K>;

  constructor(private capacity: number) {
    this._length = 0;
    this._head = this._tail = null;
    this._lookup = new Map();
    this._reverseLookup = new Map();
  }

  update(key: K, value: V): void {
    let node = this._lookup.get(key);
    if (!node) {
      node = NodeDouble.create(value);
      this._length++;
      this._detach(node);
      this._prepend(node);
      this._trimCache();

      this._lookup.set(key, node);
      this._reverseLookup.set(node, key);
    } else {
      this._detach(node);
      this._prepend(node);
      node.value = value;
    }
  }

  get(key: K): V | undefined {
    const node = this._lookup.get(key);
    if (!node) {
      return undefined;
    }

    this._detach(node);
    this._prepend(node);

    return node.value;
  }

  clear(): void {
    this._head = this._tail = null;
    this._length = 0;
    this._lookup = new Map();
    this._reverseLookup = new Map();
  }

  *[Symbol.iterator]() {
    let node = this._head;
    while (node) {
      yield node;
      node = node.next;
    }
  }

  private _detach(node: NodeDouble<V>): void {
    if (node.prev) {
      node.prev.next = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    }

    if (this._head === node) {
      this._head = this._head.next;
    }

    if (this._tail === node) {
      this._tail = this._tail.prev;
    }

    node.prev = null;
    node.next = null;
  }

  private _prepend(node: NodeDouble<V>): void {
    if (!this._head) {
      this._head = this._tail = node;
      return;
    }

    this._head.prev = node;
    node.next = this._head;
    this._head = node;
  }

  private _trimCache(): void {
    if (this._length <= this.capacity) {
      return;
    }

    const tail = this._tail as NodeDouble<V>;
    this._detach(tail);
    const key = this._reverseLookup.get(tail) as K;
    this._lookup.delete(key);
    this._reverseLookup.delete(tail);
    this._length--;
  }
}
