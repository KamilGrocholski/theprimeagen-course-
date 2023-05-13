import PromiseQueue from "./promiseQueue";

const pq = new PromiseQueue(2);

for (let i = 0; i < 10; ++i) {
  pq.enqueue(
    async () => {
      console.log(i, pq.running);
    },
  );
}
