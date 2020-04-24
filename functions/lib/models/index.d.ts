import { SomeResult } from '../utils/AppProviderTypes';
export declare type NumberBuilderFunctionType = (num: number) => Array<string>;
export declare type ModelType = {
    numberBuilder: NumberBuilderFunctionType;
};
declare function languageSelector(language: string): SomeResult<ModelType>;
export { languageSelector };
