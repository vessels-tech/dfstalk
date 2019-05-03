import { SomeResult } from '../utils/AppProviderTypes';
declare function languageSelector(language: string): SomeResult<(digit: number, place: number, lastDigit: number, nextDigit?: number) => string[]>;
export { languageSelector };
