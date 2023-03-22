export function swap(array: number[], indexA: number, indexB: number) {
    const temp = array[indexA]
    array[indexA] = array[indexB]
    array[indexB] = temp
}
