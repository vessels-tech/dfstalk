import model1 from './model1';
import { SomeResult, makeSuccess, makeError } from '../utils/AppProviderTypes';

export type NumberBuilderFunctionType = (digit: number, place: number, lastDigit?: number, nextDigit?: number) => string[];


function languageSelector(language: string): SomeResult<NumberBuilderFunctionType> {
  switch(language) {
    case 'en_AU_male': return makeSuccess(model1);
    default:
      return makeError(`Unsupported language: ${language}`);
  }
}


export {
  languageSelector
}
