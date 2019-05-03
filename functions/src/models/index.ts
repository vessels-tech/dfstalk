import en_AU_male from './en_AU_male';
import { SomeResult, makeSuccess, makeError } from '../utils/AppProviderTypes';



function languageSelector(language: string): SomeResult<(digit: number, place: number, lastDigit: number, nextDigit?: number) => string[]> {
  switch(language) {
    case 'en_AU_male': return makeSuccess(en_AU_male);
    default:
      return makeError(`Unsupported language: ${language}`);
  }
}


export {
  languageSelector
}
