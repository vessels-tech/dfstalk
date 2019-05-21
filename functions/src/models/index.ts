import model1 from './model1';
import swahili from './Swahili';
import { SomeResult, makeSuccess, makeError } from '../utils/AppProviderTypes';
import { NumberPlaceEnum } from '../api/NumberBuilder';

export type NumberBuilderFunctionType = (digit: number, place: number, originalNumber: number, group: NumberPlaceEnum) => Array<string>;
export type NumberGlueFunctionType = (filesArrays: Array<Array<string>>) => Array<string>;
export type ModelType = {
  builder: NumberBuilderFunctionType,
  glue: NumberGlueFunctionType,
}


function languageSelector(language: string): SomeResult<ModelType> {
  switch(language) {
    case 'en_AU_male': return makeSuccess(model1);
    case 'sw_TZ_male': return makeSuccess(swahili);
    default:
      return makeError(`Unsupported language: ${language}`);
  }
}




export {
  languageSelector
}
