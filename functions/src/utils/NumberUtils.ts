

/**
 * Split a number into individual digits, starting from the end of the number
 */
export const splitNumberIntoDigits = (num: number): Array<number> =>
  Math.floor(num).toString().split('').reverse().map(s => parseInt(s))



/**
 * Given a number and the place in that number, get the next and last digit, when iterating through each digit right to left
 * 
 * @example for getNextAndLastDigit(1003, 2) returns {nextDigit: 1, lastDigit: 0}
 * 
 * @param originalNumber 
 * @param place 
 */
export const getNextAndLastDigit = (originalNumber: number, place: number): { nextDigit: number | undefined, lastDigit: number | undefined} => {

  const digits = splitNumberIntoDigits(originalNumber);
  return {
    nextDigit: digits[place + 1] || undefined,
    lastDigit: digits[place - 1] || undefined,
  }
}