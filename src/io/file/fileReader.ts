export interface FileReader<T> {
    /**
     * Reads a file from a given path and maps its content to {T}
     * @param {string} path
     * @returns {T}
     */
    read(path: string): T;
}
