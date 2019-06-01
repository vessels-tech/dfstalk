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
        audioFiles.push('sifuri');
      }
      break;
    }
    case 1: audioFiles.unshift('moja'); break;
    case 2: audioFiles.unshift('mbili') ; break;
    case 3: audioFiles.unshift('tatu'); break;
    case 4: audioFiles.unshift('nne'); break;
    case 5: audioFiles.unshift('tano'); break;
    case 6: audioFiles.unshift('sita'); break;
    case 7: audioFiles.unshift('saba'); break;
    case 8: audioFiles.unshift('nane'); break;
    case 9: audioFiles.unshift('tisa'); break;
  }

  /* Tens */
  if (isNullOrUndefined(tens)) {
    return audioFiles;
  } 

  if (ones > 0) {
    audioFiles.unshift('na');
  }

  switch (tens) {
    case 0: break;
    case 1: audioFiles.unshift('kumi'); break;
    case 2: audioFiles.unshift('ishirini'); break;
    case 3: audioFiles.unshift('thelathini'); break;
    case 4: audioFiles.unshift('arobaini'); break;
    case 5: audioFiles.unshift('hamsini'); break;
    case 6: audioFiles.unshift('sitini'); break;
    case 7: audioFiles.unshift('sabini'); break;
    case 8: audioFiles.unshift('themanini'); break;
    case 9: audioFiles.unshift('tisini'); break;
  }
  
  /* Hundreds */
  const hundreds = digits[2];
  if (isNullOrUndefined(hundreds)) {
    return audioFiles;
  }

  switch (hundreds) {
    case 0: break;
    case 1: audioFiles.unshift('moja');  audioFiles.unshift('mia'); break;
    case 2: audioFiles.unshift('mbili'); audioFiles.unshift('mia'); break;
    case 3: audioFiles.unshift('tatu');  audioFiles.unshift('mia'); break;
    case 4: audioFiles.unshift('nne');   audioFiles.unshift('mia'); break;
    case 5: audioFiles.unshift('tano');  audioFiles.unshift('mia'); break;
    case 6: audioFiles.unshift('sita');  audioFiles.unshift('mia'); break;
    case 7: audioFiles.unshift('saba');  audioFiles.unshift('mia'); break;
    case 8: audioFiles.unshift('nane');  audioFiles.unshift('mia'); break;
    case 9: audioFiles.unshift('tisa');  audioFiles.unshift('mia'); break;
  }
  
  /* Thousands */
  const thousands = digits[3];
  //lookahead
  const tenThousands = digits[4];
  if (!isNullOrUndefined(tenThousands)) {
    switch (thousands) {
      case 0: break;
      case 1: audioFiles.unshift('elfu'); audioFiles.unshift('moja');   break;
      case 2: audioFiles.unshift('elfu'); audioFiles.unshift('mbili');   break;
      case 3: audioFiles.unshift('elfu'); audioFiles.unshift('tatu'); break;
      case 4: audioFiles.unshift('elfu'); audioFiles.unshift('nne');  break;
      case 5: audioFiles.unshift('elfu'); audioFiles.unshift('tano');  break;
      case 6: audioFiles.unshift('elfu'); audioFiles.unshift('sita');   break;
      case 7: audioFiles.unshift('elfu'); audioFiles.unshift('saba'); break;
      case 8: audioFiles.unshift('elfu'); audioFiles.unshift('nane'); break;
      case 9: audioFiles.unshift('elfu'); audioFiles.unshift('tisa');  break;
    }
  } else {
    //No nextDigit
    switch (thousands) {
      case 0: break;
      case 1: audioFiles.unshift('moja');  audioFiles.unshift('elfu'); break;
      case 2: audioFiles.unshift('mbili'); audioFiles.unshift('elfu'); break;
      case 3: audioFiles.unshift('tatu');  audioFiles.unshift('elfu'); break;
      case 4: audioFiles.unshift('nne');   audioFiles.unshift('elfu'); break;
      case 5: audioFiles.unshift('tano');  audioFiles.unshift('elfu'); break;
      case 6: audioFiles.unshift('sita');  audioFiles.unshift('elfu'); break;
      case 7: audioFiles.unshift('saba');  audioFiles.unshift('elfu'); break;
      case 8: audioFiles.unshift('nane');  audioFiles.unshift('elfu'); break;
      case 9: audioFiles.unshift('tisa');  audioFiles.unshift('elfu'); break;
    }
  }

  /* Ten Thousands */
  if (isNullOrUndefined(tenThousands)) {
    return audioFiles;
  }

  if (thousands > 0) {
    audioFiles.unshift('na');
  }

  switch (tenThousands) {
    case 0: break;
    case 1: audioFiles.unshift('kumi'); break;
    case 2: audioFiles.unshift('ishirini'); break;
    case 3: audioFiles.unshift('thelathini'); break;
    case 4: audioFiles.unshift('arobaini'); break;
    case 5: audioFiles.unshift('hamsini'); break;
    case 6: audioFiles.unshift('sitini'); break;
    case 7: audioFiles.unshift('sabini'); break;
    case 8: audioFiles.unshift('themanini'); break;
    case 9: audioFiles.unshift('tisini'); break;
  }

  /* Hundred thousands */
  const hundredThousands = digits[5];
  if (isNullOrUndefined(hundredThousands)) {
    return audioFiles;
  }

  switch (hundredThousands) {
    case 0: break;
    case 1: audioFiles.unshift('moja');  audioFiles.unshift('mia'); break;
    case 2: audioFiles.unshift('mbili'); audioFiles.unshift('mia'); break;
    case 3: audioFiles.unshift('tatu');  audioFiles.unshift('mia'); break;
    case 4: audioFiles.unshift('nne');   audioFiles.unshift('mia'); break;
    case 5: audioFiles.unshift('tano');  audioFiles.unshift('mia'); break;
    case 6: audioFiles.unshift('sita');  audioFiles.unshift('mia'); break;
    case 7: audioFiles.unshift('saba');  audioFiles.unshift('mia'); break;
    case 8: audioFiles.unshift('nane');  audioFiles.unshift('mia'); break;
    case 9: audioFiles.unshift('tisa');  audioFiles.unshift('mia'); break;
  }

  /* Millions */
  const millions = digits[6];
  //lookahead
  const tenMillions = digits[7];
  if (!isNullOrUndefined(tenMillions)) {
    switch (millions) {
      case 0: break;
      case 1: audioFiles.unshift('millioni'); audioFiles.unshift('moja');   break;
      case 2: audioFiles.unshift('millioni'); audioFiles.unshift('mbili');   break;
      case 3: audioFiles.unshift('millioni'); audioFiles.unshift('tatu'); break;
      case 4: audioFiles.unshift('millioni'); audioFiles.unshift('nne');  break;
      case 5: audioFiles.unshift('millioni'); audioFiles.unshift('tano');  break;
      case 6: audioFiles.unshift('millioni'); audioFiles.unshift('sita');   break;
      case 7: audioFiles.unshift('millioni'); audioFiles.unshift('saba'); break;
      case 8: audioFiles.unshift('millioni'); audioFiles.unshift('nane'); break;
      case 9: audioFiles.unshift('millioni'); audioFiles.unshift('tisa');  break;
    }
  } else {
    //No nextDigit
    switch (millions) {
      case 0: break;
      case 1: audioFiles.unshift('moja');  audioFiles.unshift('millioni'); break;
      case 2: audioFiles.unshift('mbili'); audioFiles.unshift('millioni'); break;
      case 3: audioFiles.unshift('tatu');  audioFiles.unshift('millioni'); break;
      case 4: audioFiles.unshift('nne');   audioFiles.unshift('millioni'); break;
      case 5: audioFiles.unshift('tano');  audioFiles.unshift('millioni'); break;
      case 6: audioFiles.unshift('sita');  audioFiles.unshift('millioni'); break;
      case 7: audioFiles.unshift('saba');  audioFiles.unshift('millioni'); break;
      case 8: audioFiles.unshift('nane');  audioFiles.unshift('millioni'); break;
      case 9: audioFiles.unshift('tisa');  audioFiles.unshift('millioni'); break;
    } 
  }

  /* Ten Millions */
  if (isNullOrUndefined(tenMillions)) {
    return audioFiles;
  }

  if (millions > 0) {
    audioFiles.unshift('na');
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
    case 1: audioFiles.unshift('moja');  audioFiles.unshift('mia'); break;
    case 2: audioFiles.unshift('mbili'); audioFiles.unshift('mia'); break;
    case 3: audioFiles.unshift('tatu');  audioFiles.unshift('mia'); break;
    case 4: audioFiles.unshift('nne');   audioFiles.unshift('mia'); break;
    case 5: audioFiles.unshift('tano');  audioFiles.unshift('mia'); break;
    case 6: audioFiles.unshift('sita');  audioFiles.unshift('mia'); break;
    case 7: audioFiles.unshift('saba');  audioFiles.unshift('mia'); break;
    case 8: audioFiles.unshift('nane');  audioFiles.unshift('mia'); break;
    case 9: audioFiles.unshift('tisa');  audioFiles.unshift('mia'); break;
  }

  return audioFiles;
}

export default {
  numberBuilder
}