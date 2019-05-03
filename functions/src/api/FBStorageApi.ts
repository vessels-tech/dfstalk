import { SomeResult, makeSuccess, makeError } from "../utils/AppProviderTypes";
import { bucketName, projectId } from "../env";

// import Storage from '@google-cloud/storage';

// // const Storage = require('@google-cloud/storage');
// const gcs = Storage({projectId});
// const bucket = gcs.bucket(bucketName);

const { Storage } = require('@google-cloud/storage');

// Creates a client
const gcs = new Storage({ projectId });
const bucket = gcs.bucket(bucketName);
const firebaseToken = '1111222233334444'; //This isn't too precious, our files are public anyway


export function uploadPublicFile(localFilename: string, expiry: number): Promise<SomeResult<string>> {
  //TODO: figure out expiry and public url

  const destination = `generated/${localFilename.replace('/tmp/', '')}`;

  return bucket.upload(localFilename, {
    destination,
    public: true,
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: '1111222233334444'
      }
    }
    // metadata: {
    //   contentType: readingsFile.mimetype,
    // },
  })
  .then((sn: any) => {
    // makeSuccess(`http://storage.googleapis.com/${bucketName}/${destination}`)
    const urlPrefix = `https://www.googleapis.com/download/storage/v1/b/${bucketName}/o/`;
    const downloadUrl = generateUrl(urlPrefix, destination, firebaseToken);


    return makeSuccess(downloadUrl);
  })
  .catch((err: Error) => {
    return makeError(err.message)
  });

}



export const generateUrl = (urlPrefix: string, path: string, firebaseToken: string) => {
  //eg: https://www.googleapis.com/download/storage/v1/b/tz-phone-book.appspot.com/o/tz_audio%2F015a_Voicebook_Swahili.mp3?alt=media&token=1536715274666696
  return `${urlPrefix}${encodeURIComponent(path)}?alt=media&token=${firebaseToken}`;
} 