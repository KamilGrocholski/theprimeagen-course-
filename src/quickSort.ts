import { swap } from './utils'

function qs(array: number[], low: number, high: number): void {
    if (low >= high) {
        return
    }

    const pivotIndex = partition(array, low, high)
    qs(array, low, pivotIndex - 1)
    qs(array, pivotIndex + 1, high)
}

function partition(array: number[], low: number, high: number): number {
    const pivotValue = array[high]
    let partitioningIndex = low - 1

    for (let i = low; i < high; ++i) {
        if (array[i] < pivotValue) {
            partitioningIndex++
            swap(array, i, partitioningIndex)
        }
    }

    partitioningIndex++
    array[high] = array[partitioningIndex]
    array[partitioningIndex] = pivotValue
    return partitioningIndex
}

export default function (array: number[]): void {
    qs(array, 0, array.length - 1)
}
