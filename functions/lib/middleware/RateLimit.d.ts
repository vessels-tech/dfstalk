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
/**
 * Middleware to rate limit using Cloud Firestore
 *
 * @param req
 * @param res
 * @param next
 */
export declare const rateLimit: (req: any, res: any, next: any) => Promise<FirebaseFirestore.WriteResult>;
