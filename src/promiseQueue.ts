import Queue from "./queue";

export type Task = () => Promise<any>;

export default class PromiseQueue {
  private _maxConcurrent: number;
  private _queue: Queue<Task>;
  private _running: number;

  constructor(_maxConcurrent: number) {
    this._maxConcurrent = _maxConcurrent;
    this._queue = new Queue();
    this._running = 0;
  }

  enqueue(task: Task): void {
    this._queue.enqueue(task);
    this._runTask();
  }

  private async _runTask(): Promise<void> {
    if (!this.shouldRun) {
      return;
    }

    const task = this._queue.dequeue() as Task;

    this._running++;

    task().finally(() => {
      this._running--;
      this._runTask();
    });
  }

  private get shouldRun(): boolean {
    return this._running < this._maxConcurrent && this._queue.size > 0;
  }

  get running(): number {
    return this._running;
  }

  get maxConcurrent(): number {
    return this._maxConcurrent;
  }
}
