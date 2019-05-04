import { SomeResult, makeSuccess, makeError } from "../utils/AppProviderTypes";
import { bucketName, projectId } from "../env";

const { Storage } = require('@google-cloud/storage');

const tempFirebaseToken = '1111222233334444'; //This isn't too precious, our files are public anyway

export const getBucketClient = () => {
  // Creates a client
  const gcs = new Storage({ projectId });
  const bucket = gcs.bucket(bucketName);

  return bucket;
}

export const generateUrl = (urlPrefix: string, path: string, firebaseToken: string) => {
  //eg: https://www.googleapis.com/download/storage/v1/b/tz-phone-book.appspot.com/o/tz_audio%2F015a_Voicebook_Swahili.mp3?alt=media&token=1536715274666696
  return `${urlPrefix}${encodeURIComponent(path)}?alt=media&token=${firebaseToken}`;
} 


export function uploadPublicFile(localFilename: string, expiry: number): Promise<SomeResult<string>> {
  //TODO: figure out expiry
  const destination = `generated/${localFilename.replace('/tmp/', '')}`;
  const bucket = getBucketClient();

  return bucket.upload(localFilename, {
    destination,
    public: true,
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: tempFirebaseToken
      }
    }
  })
  .then((sn: any) => {
    // makeSuccess(`http://storage.googleapis.com/${bucketName}/${destination}`)
    const urlPrefix = `https://www.googleapis.com/download/storage/v1/b/${bucketName}/o/`;
    const downloadUrl = generateUrl(urlPrefix, destination, tempFirebaseToken);


    return makeSuccess(downloadUrl);
  })
  .catch((err: Error) => {
    return makeError(err.message)
  });
}
