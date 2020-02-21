/**
 * Split a number into individual digits, starting from the end of the number
 */
export declare const splitNumberIntoDigits: (num: number) => number[];
/**
 * Given a number and the place in that number, get the next and last digit, when iterating through each digit right to left
 *
 * @example for getNextAndLastDigit(1003, 2) returns {nextDigit: 1, lastDigit: 0}
 *
 * @param originalNumber
 * @param place
 */
export declare const getNextAndLastDigit: (originalNumber: number, place: number) => {
    nextDigit: number | undefined;
    lastDigit: number | undefined;
};
/**
 * Split a number up into lots of 100's
 *
 * @example, 19,000 => millions: undefined, thousands: 19, zeros: 0
 *
 *
 * @param originalNumber
 */
export declare const splitByZeros: (originalNumber: number) => {
    zeros: number;
    thousands: number;
    millions: number;
};
