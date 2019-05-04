import { auth } from '../api/FirebaseClient';
import { SomeResult, makeError, makeSuccess, ResultType } from "../utils/AppProviderTypes";
const atob = require('atob');
const btoa = require('btoa');

/**
 * Middleware to validate a user's username and password in Basic Auth header
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export const validateBasicAuth = async (req: any, res: any, next: any) => {

  const authHeaderResult = getAuthHeader(req);
  if (authHeaderResult.type === ResultType.ERROR) {
    console.log("authentication error:", authHeaderResult.message);
    res.status(401).send('Unauthenticated');
    return;
  }

  const { username, password } = authHeaderResult.result;

  return verifyUsernameAndPassword(username, password)
  .then(result => {
    if (result.type === ResultType.ERROR) {
      res.status(403).send('Unauthorized');
      return;
    }

    req.uid = result.result;
    return next();
  });
}


/**
 * Simple Basic auth header parser
 * 
 */
function getAuthHeader(req: any): SomeResult<{username: string, password: string}> {

  if (!req.headers || !req.headers.authorization || !req.headers.authorization.startsWith('Basic ')) {
    return makeError("No Headers or Authorization header");
  }

  const authHeaderString = req.headers.authorization.replace('Basic ', '');
  const [username, password] = atob(authHeaderString).split(':');
  if (!username || !password) {
    return makeError("No username or password found in Basic auth header")
  }

  return makeSuccess({
    username,
    password
  });
}


/**
 * Verify the Username and Password with Firebase
 * 
 * Ideally we would use access tokens, or api-keys, but firebase
 * doesn't support long-living access tokens for this purpose.
 * 
 * @returns ID token, wrapped in SomeResult and Promise
 */
async function verifyUsernameAndPassword(username: string, password: string): Promise<SomeResult<string>> {

  return auth.signInWithEmailAndPassword(username, password)
  .then(() => {
    //TODO: Get the user's id here
    //This is just a base64 encoded username
    return makeSuccess<string>(btoa(username));
  })
  .catch((error: Error) => {
    return makeError<string>(error.message);
  });  
}