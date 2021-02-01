/**
 * Splits an array into chunks
 * @param arr - array to split
 * @param chunkSize - size of array chunks
 */
export const arrayToChunks = <T extends unknown>(
    arr: T[], chunkCount = 3,
): T[][] => {
    const chunks: T[][] = []

    for (const [index, item] of arr.entries()) {
        if (chunks[index % chunkCount]) {
            chunks[index % chunkCount].push(item)
        } else {
            chunks[index % chunkCount] = [item]
        }
    }

    return chunks
}

export default {
    arrayToChunks,
}
