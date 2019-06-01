// tslint:disable-next-line: no-import-side-effect
import 'mocha'
import NumberBuilder from './NumberBuilder';
import { unsafeUnwrap } from '../utils/AppProviderTypes';
import assert from 'assert';



/**
 * Common Reducer function for running a series of numbers for the same language
 * 
 * @param input 
 * @param language 
 */
const getResults = async (input: Array<number>, language: string): Promise<string[][]> => {
  return input.reduce(async (accP: Promise<string[][]>, curr: number) => {
    const result: string[] = unsafeUnwrap(await NumberBuilder.buildNumber(curr, language));

    const acc = await accP;
    acc.push(result);

    return Promise.resolve(acc);
  }, Promise.resolve([]));
}

describe('NumberBuilder Unit Tests', function() {

  describe('en_AU_male', function () {
    it('correctly formats numbers 0 < n < 1,000', async () => {
      //Arrange
      const input = [
        0,
        1,
        234,
        19,
        590,
      ]
      const expected = [
        ['zero'],
        ['one'],
        ['two', 'hundred', 'thirty', 'four'],
        ['nineteen'],
        ['five', 'hundred', 'ninety']
      ];

      //Act
      const results: string[][] = await getResults(input, 'en_AU_male');

      //Assert
      assert.deepStrictEqual(results, expected);
    });

    it('formats numbers for 1,000 <= n < 1,000,000', async () => {
      //Arrange
      const input = [
        8437,
        10398,
        111300,
        12840,
        1409,
        111111,
      ]
      const expected = [
        ['eight', 'thousand', 'four', 'hundred', 'thirty', 'seven'],
        ['ten', 'thousand', 'three', 'hundred', 'ninety', 'eight'],
        ['one', 'hundred', 'eleven', 'thousand', 'three', 'hundred'],
        ['twelve', 'thousand', 'eight', 'hundred', 'forty'],
        ['one', 'thousand', 'four', 'hundred', 'nine'],
        ['one', 'hundred', 'eleven', 'thousand', 'one', 'hundred', 'eleven'],
      ];

      //Act
      const results: string[][] = await getResults(input, 'en_AU_male');

      //Assert
      assert.deepStrictEqual(results, expected);
    });

    it('formats numbers for 1,000 <= n < 1,000,000', async () => {
      //Arrange
      const input = [
        12837419
      ]
      const expected = [
        ['twelve', 'million', 'eight', 'hundred', 'thirty', 'seven', 'thousand', 'four', 'hundred', 'nineteen'],
      ];

      //Act
      const results: string[][] = await getResults(input, 'en_AU_male');

      //Assert
      assert.deepStrictEqual(results, expected);
    });

    it('formats negative numbers')
    it('formats numbers with decimals')
  });

  describe('sw_TZ_male_english', function () {
    it('formats swahili numbers in english', async () => {
      //Arrange
      const input = [
        0,
        1,
        234,
        1000,
        1997,
        29003,
        36027,
        412238,
        3067883,
        562495011,
      ]
      const expected = [
        ['zero'],
        ['one'],
        ['hundred', 'two', 'thirty', 'and', 'four'],
        ['thousand', 'one'],
        ['thousand', 'one', 'hundred', 'nine', 'ninety', 'and', 'seven'],
        ['twenty', 'and', 'nine', 'thousand', 'and', 'three'],
        ['thirty', 'and', 'six', 'thousand', 'twenty', 'and', 'seven'],
        ['hundred', 'four', 'ten', 'and', 'two', 'thousand', 'hundred', 'two', 'thirty', 'and', 'eight'],
        ['million', 'three', 'sixty', 'and', 'seven', 'thousand', 'hundred', 'eight', 'eighty', 'and', 'three'],
        ['hundred', 'five', 'sixty', 'and', 'two', 'million', 'hundred', 'four', 'ninety', 'and', 'five', 'thousand', 'ten', 'and', 'one'],
      ];

      const results = await getResults(input, 'sw_TZ_male');
      //Assert
      assert.deepStrictEqual(results, expected);
    });


    it.skip('correctly formats numbers 0 < n < 1,000', async () => {
      //Arrange
      const input = [
        0,
        1,
        234,
        19,
        590,
        110,
      ]
      const expected = [
        ['sifuri'],
        
        ['moja'],

        // mia mbili thelathini na nne TODO: figure out na's
        // literally: hundred, three, thirty, four
        ['mia', 'mbili', 'thelathini', 'na', 'nne'],

        //kumi na tisa
        //literally: ten, nine
        ['kumi', 'na', 'tisa'],


        //mia tano tisini
        //literally: hundred, five, and ninety
        ['mia', 'tano', 'tisini'],

        //mia moja kumi
        //literally: hundred, one, ten
        ['mia', 'moja', 'kumi'],
      ];

      //Act
      const results: string[][] = [];
      await input.forEach(async n => {
        const result = unsafeUnwrap(await NumberBuilder.buildNumber(n, 'sw_TZ_male'))
        results.push(result);
      });

      //Assert
      assert.deepStrictEqual(results, expected);
    });

    it.skip('formats numbers for 1,000 <= n < 1,000,000', async () => {
      //Arrange
      const input = [
        1000,
        1997,
        13740,
        // 10398
        // 111300,
        // 12840,
        // 1409,
        // 111111,
      ]
      const expected = [
        //elfu
        //literally: thousand, one
        ['elfu', 'moja'], //todo: it may be better so just say 'elfu'

        //elfu moja mia tisa tisini na saba //todo: it may be better so just say 'elfu moja mia tisa tisini na saba'
        //literally: thousand, one, hundred, nine, ninety, and, seven
        ['elfu', 'moja', 'mia', 'na', 'tisa', 'tisini', 'na', 'saba'],

        //kumi na tatu elfu mia saba arobaini
        //literally: ten, and, three, thousand, hundred, seven, forty
        //TOOD: model is broken for this...
        ['kumi', 'na', 'tatu', 'elfu', 'mia', 'saba', 'arobaini'],
        

        // ['eight', 'thousand', 'four', 'hundred', 'thirty', 'seven'],

        //elfu nane na mia nne thelathini saba
        //literally: thousand, eight, hundred, four, thirty, seven
        // ['elfu', 'nane', 'mia', 'nne', 'thelathini', 'saba'],

        //
        //literally: thousand, ten, three, ninety, eight
        // ['elfu', 'kumi', 'tatu', 'tisini', 'nane'],



        // ['one', 'hundred', 'eleven', 'thousand', 'three', 'hundred'],
        // ['twelve', 'thousand', 'eight', 'hundred', 'forty'],
        // ['one', 'thousand', 'four', 'hundred', 'nine'],
        // ['one', 'hundred', 'eleven', 'thousand', 'one', 'hundred', 'eleven'],
      ];

      //Act
      const results: string[][] = [];
      await input.forEach(async n => {
        const result = unsafeUnwrap(await NumberBuilder.buildNumber(n, 'sw_TZ_male'))
        results.push(result);
      });

      //Assert
      assert.deepStrictEqual(results, expected);
    });

    it('formats negative numbers')
    it('formats numbers with decimals')

  });

  describe('sw_TZ_male', function () {
    it('formats swahili numbers correctly', async () => {
      //Arrange
      const input = [
        0,
        1,
        234,
        1000,
        1997,
        29003,
        36027,
        412238,
        3067883,
        562495011,
      ]
      const expected = [
        ['sifuri'],
        ['moja'],
        ['mia', 'mbili', 'thelathini', 'na', 'nne'],
        ['elfu', 'moja'],
        ['elfu', 'moja', 'mia', 'tisa', 'tisini', 'na', 'saba'],
        ['ishirini', 'na', 'tisa', 'elfu', 'na', 'tatu'],
        ['thelathini', 'na', 'sita', 'elfu', 'ishirini', 'na', 'saba'],
        ['mia', 'nne', 'kumi', 'na', 'mbili', 'elfu', 'mia', 'mbili', 'thelathini', 'na', 'nane'],
        ['millioni', 'tatu', 'sitini', 'na', 'saba', 'elfu', 'mia', 'nane', 'themanini', 'na', 'tatu'],
        ['mia', 'tano', 'sitini', 'na', 'mbili', 'millioni', 'mia', 'nne', 'tisini', 'na', 'tano', 'elfu', 'kumi', 'na', 'moja'],
      ];

      const results = await getResults(input, 'sw_TZ_male');
      //Assert
      assert.deepStrictEqual(results, expected);
    });

    it('formats negative numbers')
    it('formats numbers with decimals')
  });
});