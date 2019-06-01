import swahili from "./Swahili";
import english from "./English";
import { SomeResult, makeSuccess, makeError } from '../utils/AppProviderTypes';

export type NumberBuilderFunctionType = (num: number) => Array<string>;
export type ModelType = {
  numberBuilder: NumberBuilderFunctionType,
}

function languageSelector(language: string): SomeResult<ModelType> {
  switch(language) {
    case 'en_AU_male': return makeSuccess(english);
    case 'sw_TZ_male': return makeSuccess(swahili);
    default:
      return makeError(`Unsupported language: ${language}`);
  }
}

export {
  languageSelector
}
