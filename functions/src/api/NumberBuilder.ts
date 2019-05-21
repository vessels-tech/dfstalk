import { makeSuccess, SomeResult, ResultType } from "../utils/AppProviderTypes";

import {
  languageSelector, NumberBuilderFunctionType,
} from '../models';
import { splitNumberIntoDigits, splitByZeros } from "../utils/NumberUtils";
import newBuildSwahili from "../models/SwahiliNew";

export enum NumberPlaceEnum {
  Zeros = 'Zeros',
  Thousands = 'Thousands',
  Millions = 'Millions',
}


export default class NumberBuilder {


  /**
   * Given a number and a language, generate an array of audio files that
   * need to be stitched together to create the single audio number
   * 
   * Currently ignores numbers with decimals
   * 
   * @param number 
   * @param language 
   * 
   * @returns A Promise containing a result with a list of audio file name Strings
   */
  public static buildNumber(number: number, language: string): Promise<SomeResult<string[]>> {

    // const builderResult = languageSelector(language);
    // if (builderResult.type === ResultType.ERROR) {
    //   return Promise.resolve(builderResult);
    // }

    // const buildFromDigits = (digitPlaces: number[], myBuilder: NumberBuilderFunctionType, place: NumberPlaceEnum): string[] => {
    //   const placeAudioFiles: string[] = [];
    //   digitPlaces.forEach((d, idx) => {
    //     //idx tells us where we are in the number. 0 = 1's, 1 = 10's etc.
    //     const files = myBuilder(d, idx, number, place).reverse();

    //     // console.log("appending files", files);
    //     files.forEach(f => placeAudioFiles.unshift(f));
    //   });

    //   return placeAudioFiles;
    // }

    // const builder = builderResult.result.builder;
    // const glue = builderResult.result.glue;

    // //split the numbers by digit places, order lowest place first (1's, 10's, 100's etc)

    // //I think  we need a new approach, where we split the number into 000's first:
    // //TODO: fix for english
    // //TODO: generalize better
    // const { millions, thousands, zeros } = splitByZeros(number);

    // const digitPlacesMillions = splitNumberIntoDigits(millions);
    // const digitPlacesThousands = splitNumberIntoDigits(thousands);
    // const digitPlacesZeros = splitNumberIntoDigits(zeros);

    // const audioFilesMillions = buildFromDigits(digitPlacesMillions, builder, NumberPlaceEnum.Millions);
    // const audioFilesThousands = buildFromDigits(digitPlacesThousands, builder, NumberPlaceEnum.Thousands);
    // const audioFilesZeros = buildFromDigits(digitPlacesZeros, builder, NumberPlaceEnum.Zeros);

    // // now stitch together the files into one array, with the places:
    // console.log('audioFilesMillions, audioFilesThousands, audioFilesZeros', audioFilesMillions, audioFilesThousands, audioFilesZeros);

    //model.glueNumbers(audioFilesMillions, audioFilesThousands, audioFilesZeros);
    
    // const audioFiles: Array<string> = glue([audioFilesMillions, audioFilesThousands, audioFilesZeros]);
    const audioFiles: Array<string> = newBuildSwahili(number);

    


    //First naive approach
    // let lastDigit: number | undefined;
    // let nextDigit: number | undefined;
    // digitPlaces.forEach((d, idx) => {
    //   if (idx <= digitPlaces.length - 2) {
    //     nextDigit = digitPlaces[idx + 1];
    //   } else {
    //     nextDigit = undefined;
    //   }
    //   //idx tells us where we are in the number. 0 = 1's, 1 = 10's etc.
    //   const files = builder(d, idx, lastDigit, nextDigit, number).reverse();

    //   console.log("appending files", files);

    //   files.forEach(f => audioFiles.unshift(f));
    //   lastDigit = d;
    // });

    return Promise.resolve(makeSuccess<string[]>(audioFiles));
  }
}