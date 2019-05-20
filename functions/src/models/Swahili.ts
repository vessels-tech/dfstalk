import { isNullOrUndefined } from "util";
import { getNextAndLastDigit } from "../utils/NumberUtils";


/**
 * Better implementation of fileForNumberAndPlace
 * 
 * Reference for Swahili: https://www.reddit.com/r/swahili/comments/22cc5f/numbers_in_swahilixpost_from_rlearnswahili/
 * 
 * 
 * @param digit 
 * @param place 
 * @param originalNumber 
 */
const V1_1_fileForNumberAndPlace = (digit: number, place: number, originalNumber: number): string[] => {
  const {nextDigit, lastDigit} = getNextAndLastDigit(originalNumber, place);

  if (place === 0) {
    const root = [];
    //In Swahili, na is always added between tens and unit digits. 
    if (!isNullOrUndefined(nextDigit)) {
      root.push('na');
    }

    switch (digit) {
      
      case 0: {
        if (isNullOrUndefined(nextDigit) && isNullOrUndefined(lastDigit)) {
          return ['sifuri'];
        }

        return [];
      }
      case 1: root.push('moja'); break;
      case 2: root.push('mbili'); break;
      case 3: root.push('tatu'); break;
      case 4: root.push('nne'); break;
      case 5: root.push('tano'); break;
      case 6: root.push('sita'); break;
      case 7: root.push('saba'); break;
      case 8: root.push('nane'); break;
      case 9: root.push('tisa'); break;
    }

    return root;
  }

  //TODO: how do we add the na?

  //no teens in Swahili
  if (place === 1) {
    // const root = V1_1_fileForNumberAndPlace(digit, 0, originalNumber);
    const root = [];
    switch (digit) {
      case 1: root.push('kumi'); break;
      case 2: root.push('ishirini'); break;
      case 3: root.push('thelathini'); break;
      case 4: root.push('arobaini'); break;
      case 5: root.push('hamsini'); break;
      case 6: root.push('sitini'); break;
      case 7: root.push('sabini'); break;
      case 8: root.push('themanini'); break;
      case 9: root.push('tisini'); break;
    }

    return root;
  }

  if (place === 2) {
    //Hundreds, recurse! - ignore the next digit as it isn't relevent to hundreds
    let root = [];
    root.push('mia');
    // root = root.concat(V1_1_fileForNumberAndPlace(digit, 0, originalNumber));
    root = root.concat(V1_1_fileForNumberAndPlace(digit, 0, Math.floor(originalNumber/100)));
    return root;
  }

  if (place === 3) {
    //Thousands, recurse!
    let root = [];
    root.push('elfu');
    root = root.concat(V1_1_fileForNumberAndPlace(digit, 0, originalNumber));
    return root;
  }

  if (place === 4) {
    //Ten Thousands, just use the tens
    const root = V1_1_fileForNumberAndPlace(digit, 0, originalNumber);
    return root;
  }

  if (place === 5) {
    //Hundred Thousands, just use the hundreds
    const root = V1_1_fileForNumberAndPlace(digit, 2, originalNumber);
    return root;
  }

  if (place === 6) {
    //Millions,
    const root = V1_1_fileForNumberAndPlace(digit, 0, originalNumber);

    root.push('million');
    return root;
  }

  if (place === 7) {
    //10-millions,
    const root = V1_1_fileForNumberAndPlace(digit, 1, originalNumber);

    return root;
  }

  return [];


}


/**
 * TODO: rename
 * TODO: refactor to use whole number for context, and not the lastDigit and nextDigit
 * TODO: refactor into a nicely documented and implemented interface
 * 
 * 
 * Convert a given number into a list of audio files specific to language
 * 
 * 
 * @param digit 
 * @param place 
 * @param lastDigit 
 * @param nextDigit 
 */


const fileForNumberAndPlace = (digit: number, place: number, lastDigit?: number, nextDigit?: number, originalNumber?: number): string[] => {
  if (isNullOrUndefined(originalNumber)) {
    throw new Error('Original number is required for V1_1_fileForNumberAndPlace');
  }

  return V1_1_fileForNumberAndPlace(digit, place, originalNumber);
}

export default fileForNumberAndPlace;