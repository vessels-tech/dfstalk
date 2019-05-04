/**
 * RateLimit.ts
 * 
 * Simple rate limit, based on: https://redislabs.com/redis-best-practices/basic-rate-limiting/
 * 
 * 1. find current minute
 * 2. set last minute to []
 * 3. get array for current minute.
 * 
 *   if currentMinuteArray.length > 20, deny
 *   else append a 1 to currentMinuteArray and save
 *   approve request
*/

import { firestore } from '../api/FirebaseAdmin';

const maxRequestsPerMinute = 20;

/**
 * Middleware to rate limit using Cloud Firestore
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export const rateLimit = async (req: any, res: any, next: any) => {
  const userId = req.uid;
  const date = new Date();
  const minute = date.getMinutes();  
  let thisMinuteArray: number[] = [];

  //Clear all other minutes
  const clearCache: any = getEmptyMinuteArraysExcept(minute);
  return firestore.collection('quota').doc(userId).get()
  .then(ds => {
    const data = ds.data();
    if (data && data[minute]) {
      thisMinuteArray = data[minute];
    }

    //Exceeded rate limit!
    if (thisMinuteArray.length >= maxRequestsPerMinute) {
      //Reset the lastMinute first, then reject the request
      return firestore.collection('quota').doc(userId).set(clearCache, { merge: true })
      .then(() => {
        res.status(429).send('Rate Limit Exceeded');
        return Promise.reject(null); //Return a promise to appease typescript
      })
    }

    //Continue the request, don't wait for firebase
    next();

    //Increment the counter
    thisMinuteArray.push(1);
    clearCache[minute] = thisMinuteArray;
    return firestore.collection('quota').doc(userId).set(clearCache, { merge: true })
  })
}

function getEmptyMinuteArraysExcept(minute: number): any {
  const data: any = {};

  for (let i = 0; i <= 59; i++) {
    data[i] = [];
  }

  delete data[minute];

  return data;
}
