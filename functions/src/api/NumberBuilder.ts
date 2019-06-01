import { makeSuccess, SomeResult, ResultType } from "../utils/AppProviderTypes";

import {
  languageSelector,
} from '../models';

export enum NumberPlaceEnum {
  Zeros = 'Zeros',
  Thousands = 'Thousands',
  Millions = 'Millions',
}

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
    
    const numberBuilder = builderResult.result.numberBuilder;
    const audioFiles: Array<string> = numberBuilder(number);

    return Promise.resolve(makeSuccess<string[]>(audioFiles));
  }
}