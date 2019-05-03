import { SomeResult } from "../utils/AppProviderTypes";
/**
 * FileBuilder stitches together files for a given language
 */
declare class FileBuilder {
    /**
     * Create a single file from a list of audio file names and language
     *
     * @param audioFiles
     * @param language
     *
     * @returns Promise<SomeResult> containing the local url of the file
     */
    static createFile(audioFiles: string[], language: string): Promise<SomeResult<string>>;
}
export default FileBuilder;
