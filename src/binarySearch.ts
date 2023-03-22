export default function binarySearch(array: number[], value: number): number {
    let low = 0
    let high = array.length

    while (low < high) {
        const mid = Math.floor((low + high) / 2)
        if (array[mid] > value) {
            high = mid - 1
        } else if (array[mid] < value) {
            low = mid + 1
        } else {
            return mid
        }
    }

    return -1
}
