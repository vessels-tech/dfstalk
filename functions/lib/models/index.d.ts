import { SomeResult } from '../utils/AppProviderTypes';
export declare type NumberBuilderFunctionType = (digit: number, place: number, lastDigit?: number, nextDigit?: number) => string[];
declare function languageSelector(language: string): SomeResult<NumberBuilderFunctionType>;
export { languageSelector };
