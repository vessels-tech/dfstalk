import { SomeResult, makeError, makeSuccess } from "../utils/AppProviderTypes";
const audioconcat = require('audioconcat')


/**
 * FileBuilder stitches together files for a given language
 */

class FileBuilder {

  /**
   * Create a single file from a list of audio file names and language
   * 
   * @param audioFiles 
   * @param language 
   * 
   * @returns Promise<SomeResult> containing the local url of the file
   */

  public static async createFile(audioFiles: string[], language: string): Promise<SomeResult<string>> {

    const files = [
      'one',
      'two',
      'three',
    ];
    return concatAudioPromise('../audio/en_AU_male/', files);

    // return Promise.resolve(makeError("OH NO"));
  }

}

function concatAudioPromise(basePath: string, audioFiles: string[]): Promise<SomeResult<any>> {

  const filesWithPath = audioFiles.map(f => `${basePath}/${f}.mp3`);
  console.log('filesWithPath are', filesWithPath);

  return new Promise((resolve, reject) => {

    audioconcat(filesWithPath)
    .concat('/tmp/all.mp3')
    .on('start', function (command: any) {
      console.log('ffmpeg process started:', command)
    })
    .on('error', function (err: any, stdout: any, stderr: any) {
      console.error('Error:', err)
      console.error('ffmpeg stderr:', stderr)

      return resolve(makeError(err));

    })
    .on('end', function (output: any) {
      console.error('Audio created in:', output);

      return resolve(makeSuccess(output));
    })
  })
}


export default FileBuilder;