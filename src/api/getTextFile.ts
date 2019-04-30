/**
 *
 * @param fileName: Path of file
 */

export function getTextFile(fileName: string): Promise<Response> {
    return fetch(fileName);
}
