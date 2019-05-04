/**
 * TODO: rename
 * TODO: refactor to use whole number for context, and not the lastDigit and nextDigit
 * TODO: refactor into a nicely documented and implemented interface
 *
 *
 * Convert a given number into a list of audio files specific to language
 *
 *
 * @param digit
 * @param place
 * @param lastDigit
 * @param nextDigit
 */
declare const fileForNumberAndPlace: (digit: number, place: number, lastDigit?: number | undefined, nextDigit?: number | undefined) => string[];
export default fileForNumberAndPlace;
