import { SomeResult, makeError, makeSuccess } from "../utils/AppProviderTypes";
// const audioconcat = require('audioconcat');
const uuidv4 = require('uuid/v4');

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const FfmpegCommand = require('fluent-ffmpeg')
FfmpegCommand.setFfmpegPath(ffmpegPath)

export type AudioFileFormat = {
  samplingFrequency?: number,
  channels?: number,
  codec?: string,
  format?: string
  extension: string
};

const AudioFileFormatFfmpegMapping = {
  samplingFrequency: '-ar',
  channels: '-ac',
  codec: '-acodec',
  format: '-f'
}

export const FileBuilderFormats: {
  MP3: AudioFileFormat
  ASTERISK_SLN: AudioFileFormat
  [format: string]: AudioFileFormat
} = {
  MP3: {
    extension: 'mp3',
    codec: 'copy'
  },
  ASTERISK_SLN: {
    samplingFrequency: 8000,
    channels: 1,
    codec: 'pcm_s16le',
    format: 's16le',
    extension: 'sln'
  }
}

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

  public static async createFile(
    audioFiles: string[],
    language: string,
    format: AudioFileFormat = FileBuilderFormats.MP3
  ): Promise<SomeResult<string>> {
    const audioDir = `${__dirname}/../../src/audio/${language}`;
    return concatAudioPromise(audioDir, audioFiles, format);
  }
}

function concatAudioPromise(
  basePath: string,
  audioFiles: string[],
  format: AudioFileFormat = FileBuilderFormats.MP3
): Promise<SomeResult<any>> {
  const filesWithPath = audioFiles.map(f => `${basePath}/${f}.mp3`);
  const filename = uuidv4();
  const fullFile = `/tmp/${filename}.${format.extension}`;

  return new Promise((resolve, reject) => {
    const outputOptions: string[] = [];
    for (const option of Object.keys(format)) {
      const outputOptionParam = (AudioFileFormatFfmpegMapping as any)[option];
      const outputOptionValue = (format as any)[option];

      if (outputOptionParam && outputOptionValue) {
        outputOptions.push(`${outputOptionParam} ${outputOptionValue}`)
      }
    }

    const filter = 'concat:' + filesWithPath.join('|')
    const renderer = FfmpegCommand()
      .input(filter)
      .outputOptions(outputOptions)

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