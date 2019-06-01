/**
 * SwahiliEnglish uses english numbers, but with swahili ordering
 */

import { splitNumberIntoDigits } from "../utils/NumberUtils";
import { isNullOrUndefined } from "util";


function numberBuilder(num: number): Array<string> {
  const digits = splitNumberIntoDigits(num);
  const audioFiles: Array<string> = [];

  /* Ones */
  const ones = digits[0];
  //lookahead
  const tens = digits[1];

  switch (ones) {
    case undefined: return audioFiles;
    case 0: {
      if (isNullOrUndefined(tens)) {
        audioFiles.push('zero');
      }
      break;
    }
    case 1: audioFiles.unshift('one'); break;
    case 2: audioFiles.unshift('two') ; break;
    case 3: audioFiles.unshift('three'); break;
    case 4: audioFiles.unshift('four'); break;
    case 5: audioFiles.unshift('five'); break;
    case 6: audioFiles.unshift('six'); break;
    case 7: audioFiles.unshift('seven'); break;
    case 8: audioFiles.unshift('eight'); break;
    case 9: audioFiles.unshift('nine'); break;
  }

  /* Tens */
  if (isNullOrUndefined(tens)) {
    return audioFiles;
  } 

  if (ones > 0) {
    audioFiles.unshift('and');
  }

  switch (tens) {
    case 0: break;
    case 1: audioFiles.unshift('ten'); break;
    case 2: audioFiles.unshift('twenty'); break;
    case 3: audioFiles.unshift('thirty'); break;
    case 4: audioFiles.unshift('forty'); break;
    case 5: audioFiles.unshift('fifty'); break;
    case 6: audioFiles.unshift('sixty'); break;
    case 7: audioFiles.unshift('seventy'); break;
    case 8: audioFiles.unshift('eighty'); break;
    case 9: audioFiles.unshift('ninety'); break;
  }
  
  /* Hundreds */
  const hundreds = digits[2];
  if (isNullOrUndefined(hundreds)) {
    return audioFiles;
  }

  switch (hundreds) {
    case 0: break;
    case 1: audioFiles.unshift('one'); audioFiles.unshift('hundred'); break;
    case 2: audioFiles.unshift('two'); audioFiles.unshift('hundred'); break;
    case 3: audioFiles.unshift('three'); audioFiles.unshift('hundred'); break;
    case 4: audioFiles.unshift('four'); audioFiles.unshift('hundred'); break;
    case 5: audioFiles.unshift('five'); audioFiles.unshift('hundred'); break;
    case 6: audioFiles.unshift('six'); audioFiles.unshift('hundred'); break;
    case 7: audioFiles.unshift('seven'); audioFiles.unshift('hundred'); break;
    case 8: audioFiles.unshift('eight'); audioFiles.unshift('hundred'); break;
    case 9: audioFiles.unshift('nine'); audioFiles.unshift('hundred'); break;
  }
  
  /* Thousands */
  const thousands = digits[3];
  //lookahead
  const tenThousands = digits[4];
  if (!isNullOrUndefined(tenThousands)) {
    switch (thousands) {
      case 0: break;
      case 1: audioFiles.unshift('thousand'); audioFiles.unshift('one');   break;
      case 2: audioFiles.unshift('thousand'); audioFiles.unshift('two');   break;
      case 3: audioFiles.unshift('thousand'); audioFiles.unshift('three'); break;
      case 4: audioFiles.unshift('thousand'); audioFiles.unshift('four');  break;
      case 5: audioFiles.unshift('thousand'); audioFiles.unshift('five');  break;
      case 6: audioFiles.unshift('thousand'); audioFiles.unshift('six');   break;
      case 7: audioFiles.unshift('thousand'); audioFiles.unshift('seven'); break;
      case 8: audioFiles.unshift('thousand'); audioFiles.unshift('eight'); break;
      case 9: audioFiles.unshift('thousand'); audioFiles.unshift('nine');  break;
    }
  } else {
    //No nextDigit
    switch (thousands) {
      case 0: break;
      case 1: audioFiles.unshift('one'); audioFiles.unshift('thousand'); break;
      case 2: audioFiles.unshift('two'); audioFiles.unshift('thousand'); break;
      case 3: audioFiles.unshift('three'); audioFiles.unshift('thousand'); break;
      case 4: audioFiles.unshift('four'); audioFiles.unshift('thousand'); break;
      case 5: audioFiles.unshift('five'); audioFiles.unshift('thousand'); break;
      case 6: audioFiles.unshift('six'); audioFiles.unshift('thousand'); break;
      case 7: audioFiles.unshift('seven'); audioFiles.unshift('thousand'); break;
      case 8: audioFiles.unshift('eight'); audioFiles.unshift('thousand'); break;
      case 9: audioFiles.unshift('nine'); audioFiles.unshift('thousand'); break;
    }
  }

  /* Ten Thousands */
  if (isNullOrUndefined(tenThousands)) {
    return audioFiles;
  }

  if (thousands > 0) {
    audioFiles.unshift('and');
  }

  switch (tenThousands) {
    case 0: break;
    case 1: audioFiles.unshift('ten'); break;
    case 2: audioFiles.unshift('twenty'); break;
    case 3: audioFiles.unshift('thirty'); break;
    case 4: audioFiles.unshift('forty'); break;
    case 5: audioFiles.unshift('fifty'); break;
    case 6: audioFiles.unshift('sixty'); break;
    case 7: audioFiles.unshift('seventy'); break;
    case 8: audioFiles.unshift('eighty'); break;
    case 9: audioFiles.unshift('ninety'); break;
  }

  /* Hundred thousands */
  const hundredThousands = digits[5];
  if (isNullOrUndefined(hundredThousands)) {
    return audioFiles;
  }

  switch (hundredThousands) {
    case 0: break;
    case 1: audioFiles.unshift('one'); audioFiles.unshift('hundred'); break;
    case 2: audioFiles.unshift('two'); audioFiles.unshift('hundred'); break;
    case 3: audioFiles.unshift('three'); audioFiles.unshift('hundred'); break;
    case 4: audioFiles.unshift('four'); audioFiles.unshift('hundred'); break;
    case 5: audioFiles.unshift('five'); audioFiles.unshift('hundred'); break;
    case 6: audioFiles.unshift('six'); audioFiles.unshift('hundred'); break;
    case 7: audioFiles.unshift('seven'); audioFiles.unshift('hundred'); break;
    case 8: audioFiles.unshift('eight'); audioFiles.unshift('hundred'); break;
    case 9: audioFiles.unshift('nine'); audioFiles.unshift('hundred'); break;
  }

  /* Millions */
  const millions = digits[6];
  //lookahead
  const tenMillions = digits[7];
  if (!isNullOrUndefined(tenMillions)) {
    switch (millions) {
      case 0: break;
      case 1: audioFiles.unshift ('million'); audioFiles.unshift('one');   break;
      case 2: audioFiles.unshift ('million'); audioFiles.unshift('two');   break;
      case 3: audioFiles.unshift ('million'); audioFiles.unshift('three'); break;
      case 4: audioFiles.unshift ('million'); audioFiles.unshift('four');  break;
      case 5: audioFiles.unshift ('million'); audioFiles.unshift('five');  break;
      case 6: audioFiles.unshift ('million'); audioFiles.unshift('six');   break;
      case 7: audioFiles.unshift ('million'); audioFiles.unshift('seven'); break;
      case 8: audioFiles.unshift ('million'); audioFiles.unshift('eight'); break;
      case 9: audioFiles.unshift ('million'); audioFiles.unshift('nine');  break;
    }
  } else {
    //No nextDigit
    switch (millions) {
      case 0: break;
      case 1: audioFiles.unshift('one'); audioFiles.unshift('million'); break;
      case 2: audioFiles.unshift('two'); audioFiles.unshift('million'); break;
      case 3: audioFiles.unshift('three'); audioFiles.unshift('million'); break;
      case 4: audioFiles.unshift('four'); audioFiles.unshift('million'); break;
      case 5: audioFiles.unshift('five'); audioFiles.unshift('million'); break;
      case 6: audioFiles.unshift('six'); audioFiles.unshift('million'); break;
      case 7: audioFiles.unshift('seven'); audioFiles.unshift('million'); break;
      case 8: audioFiles.unshift('eight'); audioFiles.unshift('million'); break;
      case 9: audioFiles.unshift('nine'); audioFiles.unshift('million'); break;
    }
  }

  /* Ten Millions */
  if (isNullOrUndefined(tenMillions)) {
    return audioFiles;
  }

  if (millions > 0) {
    audioFiles.unshift('and');
  }

  switch (tenMillions) {
    case 0: break;
    case 1: audioFiles.unshift('ten'); break;
    case 2: audioFiles.unshift('twenty'); break;
    case 3: audioFiles.unshift('thirty'); break;
    case 4: audioFiles.unshift('forty'); break;
    case 5: audioFiles.unshift('fifty'); break;
    case 6: audioFiles.unshift('sixty'); break;
    case 7: audioFiles.unshift('seventy'); break;
    case 8: audioFiles.unshift('eighty'); break;
    case 9: audioFiles.unshift('ninety'); break;
  }

  /* Hundred Millions */
  const hundredMillion = digits[8];
  if (isNullOrUndefined(hundredMillion)) {
    return audioFiles;
  }

  switch (hundredMillion) {
    case 0: break;
    case 1: audioFiles.unshift('one'); audioFiles.unshift('hundred'); break;
    case 2: audioFiles.unshift('two'); audioFiles.unshift('hundred'); break;
    case 3: audioFiles.unshift('three'); audioFiles.unshift('hundred'); break;
    case 4: audioFiles.unshift('four'); audioFiles.unshift('hundred'); break;
    case 5: audioFiles.unshift('five'); audioFiles.unshift('hundred'); break;
    case 6: audioFiles.unshift('six'); audioFiles.unshift('hundred'); break;
    case 7: audioFiles.unshift('seven'); audioFiles.unshift('hundred'); break;
    case 8: audioFiles.unshift('eight'); audioFiles.unshift('hundred'); break;
    case 9: audioFiles.unshift('nine'); audioFiles.unshift('hundred'); break;
  }

  return audioFiles;
}

export default {
  numberBuilder
}