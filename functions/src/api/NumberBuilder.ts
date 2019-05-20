import { makeSuccess, SomeResult, ResultType } from "../utils/AppProviderTypes";

import {
  languageSelector,
} from '../models';
import { splitNumberIntoDigits } from "../utils/NumberUtils";


export default class NumberBuilder {


  /**
   * Given a number and a language, generate an array of audio files that
   * need to be stitched together to create the single audio number
   * 
   * Currently ignores numbers with decimals
   * 
   * @param number 
   * @param language 
   * 
   * @returns A Promise containing a result with a list of audio file name Strings
   */
  public static buildNumber(number: number, language: string): Promise<SomeResult<string[]>> {

    const builderResult = languageSelector(language);
    if (builderResult.type === ResultType.ERROR) {
      return Promise.resolve(builderResult);
    }

    const builder = builderResult.result;

    //split the numbers by digit places, order lowest place first (1's, 10's, 100's etc)
    const digitPlaces = splitNumberIntoDigits(number);
    const audioFiles: Array<string> = [];

    //First naive approach
    let lastDigit: number | undefined;
    let nextDigit: number | undefined;
    digitPlaces.forEach((d, idx) => {
      if (idx <= digitPlaces.length - 2) {
        nextDigit = digitPlaces[idx + 1];
      } else {
        nextDigit = undefined;
      }
      //idx tells us where we are in the number. 0 = 1's, 1 = 10's etc.
      const files = builder(d, idx, lastDigit, nextDigit, number).reverse();

      files.forEach(f => audioFiles.unshift(f));
      lastDigit = d;
    });

    return Promise.resolve(makeSuccess<string[]>(audioFiles));
  }
}