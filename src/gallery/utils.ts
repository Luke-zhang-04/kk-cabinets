/**
 * Splits an array into chunks
 * @param arr - array to split
 * @param chunkSize - size of array chunks
 */
export const arrayToChunks = <T extends unknown>(
    arr: T[], chunkSize = 3,
): T[][] => {
    const chunks: T[][] = []

    for (let index = 0; index < arr.length; index += chunkSize) {
        chunks.push(arr.slice(index, index + chunkSize))
    }

    return chunks
}

export default {
    arrayToChunks,
}
