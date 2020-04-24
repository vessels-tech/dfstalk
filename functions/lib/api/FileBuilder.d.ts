import { SomeResult } from "../utils/AppProviderTypes";
export declare type AudioFileFormat = {
    samplingFrequency?: number;
    channels?: number;
    codec?: string;
    format?: string;
    extension: string;
};
export declare const FileBuilderFormats: {
    MP3: AudioFileFormat;
    ASTERISK_SLN: AudioFileFormat;
    [format: string]: AudioFileFormat;
};
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
    static createFile(audioFiles: string[], language: string, format?: AudioFileFormat): Promise<SomeResult<string>>;
}
export default FileBuilder;
