import { NumberPlaceEnum } from "../api/NumberBuilder";
/**
 * Combine multiple arrays, for millions, thousands and zeros.
 *
 * TODO: generalize for broader numbers
 * @returns Array<string> - combined arrays
 */
declare function glueFiles(filesArrays: Array<Array<string>>): Array<string>;
declare const _default: {
    builder: (digit: number, place: number, originalNumber: number, group: NumberPlaceEnum) => string[];
    glue: typeof glueFiles;
};
export default _default;
