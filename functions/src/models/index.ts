import swahili from "./Swahili";
import swahiliEnglish from "./SwahiliEnglish";
import english from "./English";
import englishLimited from "./EnglishLimited";
import { SomeResult, makeSuccess, makeError } from '../utils/AppProviderTypes';

export type NumberBuilderFunctionType = (num: number) => Array<string>;
export type ModelType = {
  numberBuilder: NumberBuilderFunctionType,
}

function languageSelector(language: string): SomeResult<ModelType> {
  switch(language) {
    case 'en_AU_male': return makeSuccess(english);
    // A limited list of english numbers - for uncdf-gmb
    case 'eng_male': return makeSuccess(englishLimited);
    // TODO: add wol, mnk, ful
    
    case 'sw_TZ_male': return makeSuccess(swahili);
    case 'sw_TZ_male_english': return makeSuccess(swahiliEnglish);
    default:
      return makeError(`Unsupported language: ${language}`);
  }
}

export {
  languageSelector
}
