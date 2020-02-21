import { isNullOrUndefined } from "util";
import { splitNumberIntoDigits } from "../utils/NumberUtils";

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


const fileForNumberAndPlace = (digit: number, place: number, lastDigit?: number, nextDigit?: number): string[] => {
  if (place === 0) {

    //If this is the second number in a teen, don't return anything
    if (nextDigit === 1) {
      return [];
    }

    switch (digit) {
      case 0: {
        if (isNullOrUndefined(nextDigit) && isNullOrUndefined(lastDigit)) {
          return ['zero'];
        }

        return [];
      }
      case 1: return ['one'];
      case 2: return ['two'];
      case 3: return ['three'];
      case 4: return ['four'];
      case 5: return ['five'];
      case 6: return ['six'];
      case 7: return ['seven'];
      case 8: return ['eight'];
      case 9: return ['nine'];
    }
  }

  //TODO: this doesn't handle teens properly
  if (place === 1) {
    switch (digit) {
      //Handle Teens by using last number
      case 1: {
        switch (lastDigit) {
          case 0: return ['ten'];
          case 1: return ['eleven'];
          case 2: return ['twelve'];
          case 3: return ['thirteen'];
          case 4: return ['fourteen'];
          case 5: return ['fifteen'];
          case 6: return ['sixteen'];
          case 7: return ['seventeen'];
          case 8: return ['eighteen'];
          case 9: return ['nineteen'];
        }
      }
      case 2: return ['twenty'];
      case 3: return ['thirty'];
      case 4: return ['forty'];
      case 5: return ['fifty'];
      case 6: return ['sixty'];
      case 7: return ['seventy'];
      case 8: return ['eighty'];
      case 9: return ['ninety'];
    }
  }

  if (place === 2) {
    //Hundreds, recurse! - ignore the next digit as it isn't relevent to hundreds
    const root = fileForNumberAndPlace(digit, 0, lastDigit);
    if (digit !== 0) {
      root.push('hundred');
    }
    return root;
  }

  if (place === 3) {
    //Thousands, recurse!
    const root = fileForNumberAndPlace(digit, 0, lastDigit, nextDigit);
    root.push('thousand');
    return root;
  }

  if (place === 4) {
    //Ten Thousands, just use the tens
    const root = fileForNumberAndPlace(digit, 1, lastDigit, nextDigit);
    return root;
  }

  if (place === 5) {
    //Hundred Thousands, just use the hundreds
    const root = fileForNumberAndPlace(digit, 2, lastDigit, nextDigit);
    return root;
  }

  if (place === 6) {
    //Millions,
    const root = fileForNumberAndPlace(digit, 0, lastDigit, nextDigit);
    root.push('million');
    return root;
  }

  if (place === 7) {
    //10-millions,
    const root = fileForNumberAndPlace(digit, 1, lastDigit, nextDigit);
    return root;
  }

  return [];
}


function numberBuilder(num: number): Array<string> {
  const digitPlaces = splitNumberIntoDigits(num);
  const audioFiles: Array<string> = [];

  //First naive approach
  let lastDigit: number | undefined;
  let nextDigit: number | undefined;
  digitPlaces.forEach((d, idx) => {
    if (idx <= digitPlaces.length - 2) {
      nextDigit = digitPlaces[idx + 1];
    } else {
      nextDigit = undefined;
    }
    //idx tells us where we are in the number. 0 = 1's, 1 = 10's etc.
    const files = fileForNumberAndPlace(d, idx, lastDigit, nextDigit).reverse();
    files.forEach(f => audioFiles.unshift(f));
    lastDigit = d;
  });

  return audioFiles;
}

export default {
  numberBuilder
}