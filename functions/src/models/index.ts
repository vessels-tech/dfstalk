import model1 from './model1';
import Swahili from './Swahili';
import { SomeResult, makeSuccess, makeError } from '../utils/AppProviderTypes';

export type NumberBuilderFunctionType = (digit: number, place: number, lastDigit?: number, nextDigit?: number, originalNumber?: number) => string[];


function languageSelector(language: string): SomeResult<NumberBuilderFunctionType> {
  switch(language) {
    case 'en_AU_male': return makeSuccess(model1);
    case 'sw_TZ_male': return makeSuccess(Swahili);
    default:
      return makeError(`Unsupported language: ${language}`);
  }
}


export {
  languageSelector
}
