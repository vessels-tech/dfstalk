import { isNullOrUndefined } from "util";
import { getNextAndLastDigit } from "../utils/NumberUtils";
import { NumberPlaceEnum } from "../api/NumberBuilder";


/**
 * Better implementation of fileForNumberAndPlace
 * 
 * Reference for Swahili: https://www.reddit.com/r/swahili/comments/22cc5f/numbers_in_swahilixpost_from_rlearnswahili/
 * Maybe we can reverse engineer this tool: http://www.bantu-languages.com/cgi-bin/perl/dico/sw_number.cgi
 * 
 * todo: I think this approach will need to lump together digits in lots of threes...
 * 
 * 
 * @param digit 
 * @param place 
 * @param originalNumber 
 */
const V1_1_fileForNumberAndPlace = (digit: number, place: number, originalNumber: number, group: NumberPlaceEnum): string[] => {
  console.log(`V1_1_fileForNumberAndPlace, digit: ${digit}, place: ${place}, original: ${originalNumber}`);

  const {nextDigit, lastDigit} = getNextAndLastDigit(originalNumber, place);

  console.log("next and last:", nextDigit, lastDigit);

  if (place === 0) {
    const root = [];
    //In Swahili, na is always added between tens and unit digits. 
    if (!isNullOrUndefined(nextDigit)) {
      switch (group) {
        //This kind of breaks, since the elfu will be added in the wrong place sometimes.
        case NumberPlaceEnum.Millions: root.push('millioni'); break;
        case NumberPlaceEnum.Thousands: root.push('elfu'); break;
        case NumberPlaceEnum.Zeros: root.push('na'); break;
      }

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
    let root: string[] = [];
    if (digit === 0) {
      return root;
    }
    
    root.push('mia');
    // root = root.concat(V1_1_fileForNumberAndPlace(digit, 0, originalNumber));
    root = root.concat(V1_1_fileForNumberAndPlace(digit, 0, Math.floor(originalNumber / 100), group));
    return root;
  }

  if (place === 3) {
    //Thousands, recurse!
    let root = [];
    root.push('elfu');
    root = root.concat(V1_1_fileForNumberAndPlace(digit, 0, Math.floor(originalNumber / 1000), group));
    return root;
  }

  if (place === 4) {
    //Ten Thousands, just use the tens
    let root = [];
    root.push('kumi');
    root = root.concat(V1_1_fileForNumberAndPlace(digit, 0, Math.floor(originalNumber), group));
    return root;
  }

  if (place === 5) {
    //Hundred Thousands, just use the hundreds
    const root = V1_1_fileForNumberAndPlace(digit, 2, originalNumber, group);
    return root;
  }

  if (place === 6) {
    //Millions,
    const root = V1_1_fileForNumberAndPlace(digit, 0, originalNumber, group);

    root.push('million');
    return root;
  }

  if (place === 7) {
    //10-millions,
    const root = V1_1_fileForNumberAndPlace(digit, 1, originalNumber, group);

    return root;
  }

  return [];
}


/**
 * Combine multiple arrays, for millions, thousands and zeros.
 * 
 * TODO: generalize for broader numbers
 * @returns Array<string> - combined arrays
 */
function glueFiles(filesArrays: Array<Array<string>>): Array<string> {
  const [audioFilesMillions, audioFilesThousands, audioFilesZeros] = filesArrays;
  let audioFiles: string[] = [];

  if (audioFilesMillions.length > 0) {
    audioFiles = audioFiles.concat(audioFilesMillions);
    audioFiles.push('milioni');
  }

  if (audioFilesThousands.length > 0) {
    audioFiles = audioFiles.concat(audioFilesThousands);

    //Don't add the elfu if there is no 000s, this is already taken care of for us
    //Hmm this doesn't generalize well. We want to glue the elfu in some cases, but not all.
    //Maybe if there is a `na` present, then we know to add the elfu?
    // if (audioFilesZeros.length > 0) {
    //   audioFiles.push('elfu');
    // }
  }

  if (audioFilesZeros.length > 0) {
    audioFiles = audioFiles.concat(audioFilesZeros);
  }

  return audioFiles;
}


export default {
  builder: V1_1_fileForNumberAndPlace,
  glue: glueFiles,
}


