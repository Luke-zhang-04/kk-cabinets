import type Firebase from "firebase/app"

/**
 * Splits an array into chunks
 * @param arr - array to split
 * @param chunkSize - size of array chunks
 */
export const arrayToChunks = <T extends unknown>(arr: T[], chunkCount = 3): T[][] => {
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

export const snapshotToArray = (
    snapshot: Firebase.firestore.QuerySnapshot<Firebase.firestore.DocumentData> | undefined,
): Firebase.firestore.QueryDocumentSnapshot<Firebase.firestore.DocumentData>[] => {
    const arr: ReturnType<typeof snapshotToArray> = []

    snapshot?.forEach((doc) => arr.push(doc))

    return arr
}

export const capitalizeFirst = (str: string): string => str[0].toUpperCase() + str.slice(1)
