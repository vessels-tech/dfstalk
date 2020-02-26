import { isNullOrUndefined } from "../utils/isNullOrUndefined";


const getOrDefault = (thing: any, defaultValue: any) => {
  if (isNullOrUndefined(thing)) {
    return defaultValue;
  }

  return thing;
}


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
    nextDigit: getOrDefault(digits[place + 1], undefined),
    lastDigit: getOrDefault(digits[place - 1], undefined),
  }
}


/**
 * Split a number up into lots of 100's
 * 
 * @example, 19,000 => millions: undefined, thousands: 19, zeros: 0
 * 
 * 
 * @param originalNumber 
 */
export const splitByZeros = (originalNumber: number): { zeros: number, thousands: number, millions: number} => {
  let zeros, thousands, millions;

  const digits = splitNumberIntoDigits(originalNumber);
  zeros =     getOrDefault(digits[2], 0) * 100 + getOrDefault(digits[1], 0) * 10 + getOrDefault(digits[0], 0); 
  thousands = getOrDefault(digits[5], 0) * 100 + getOrDefault(digits[4], 0) * 10 + getOrDefault(digits[3], 0); 
  millions =  getOrDefault(digits[8], 0) * 100 + getOrDefault(digits[7], 0) * 10 + getOrDefault(digits[6], 0); 

  return {
    zeros,
    thousands,
    millions,
  };
}