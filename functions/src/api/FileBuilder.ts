import { SomeResult, makeError, makeSuccess } from "../utils/AppProviderTypes";
// const audioconcat = require('audioconcat');
const uuidv4 = require('uuid/v4');

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const FfmpegCommand = require('fluent-ffmpeg')
FfmpegCommand.setFfmpegPath(ffmpegPath)


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
    const audioDir = `${__dirname}/../../src/audio/en_AU_male`;
    return concatAudioPromise(audioDir, audioFiles);
  }
}

function concatAudioPromise(basePath: string, audioFiles: string[]): Promise<SomeResult<any>> {
  const filesWithPath = audioFiles.map(f => `${basePath}/${f}.mp3`);
  const filename = uuidv4();
  const fullFile = `/tmp/${filename}.mp3`;

  return new Promise((resolve, reject) => {

    const filter = 'concat:' + filesWithPath.join('|')
    const renderer = FfmpegCommand()
      .input(filter)
      .outputOptions('-acodec copy')

    renderer.save(fullFile)
      .on('error', function (err: any, stdout: any, stderr: any) {
        console.error('Error:', err)
        console.error('ffmpeg stderr:', stderr)

        return resolve(makeError(err));

      })
      .on('end', () => {
        return resolve(makeSuccess(fullFile));
      })
  });
}


export default FileBuilder;