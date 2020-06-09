import swahili from "./Swahili";
import swahiliEnglish from "./SwahiliEnglish";
import english from "./English";
import englishLimited from "./EnglishLimited";
import mandinkaLimited from "./MandinkaLimited";
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
    // A limited list of mandinka numbers - for uncdf-gmb
    case 'mnk_male': return makeSuccess(mandinkaLimited);
    // TODO: add wol, ful
    case 'sw_TZ_male': return makeSuccess(swahili);
    case 'sw_TZ_male_english': return makeSuccess(swahiliEnglish);
    default:
      return makeError(`Unsupported language: ${language}`);
  }
}

export {
  languageSelector
}
