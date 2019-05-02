import { SomeResult, makeError, makeSuccess, ResultType } from "./utils/AppProviderTypes";
const atob = require('atob');



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
    res.status(401).send('Unauthenticated');
    return;
  }

  const { username, password } = authHeaderResult.result;
  console.log("username and pwd")

  return verifyUsernameAndPassword(username, password)
  .then(result => {

    if (result.type === ResultType.ERROR) {
      res.status(403).send('Unauthorized');
      return;
    }

    req.user = result.result;
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

  const authHeaderString = req.header.authorization.replace('Basic ');
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

  //TODO: implement call to Firebase!
  return Promise.resolve(makeSuccess('1'));
}