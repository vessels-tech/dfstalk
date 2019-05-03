import * as functions from 'firebase-functions';


//TODO: move these back to utils, for some reason TS doesn't like them being here.
function getBoolean(value: any) {
  switch (value) {
    case true:
    case "true":
    case 1:
    case "1":
    case "on":
    case "yes":
      return true;
    default:
      return false;
  }
}

// function asList(value: string): string[] {
//   return value.split(',');
// }

const envConfig = functions.config();

export const verboseLog = getBoolean(envConfig.config.verbose_log);
export const apiKey = envConfig.config.api_key;
export const bucketName = envConfig.config.bucket_name;
export const projectId = envConfig.config.project_id;
