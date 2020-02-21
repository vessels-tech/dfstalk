import { firestore } from '../api/FirebaseAdmin';

interface CachedResult<T> {
  result: T,
  expiry: Date,
  cachedTime: Date
}

export async function tryCacheElse<T>(key: string, expiry: Date, alt: () => Promise<T>): Promise<CachedResult<T>> {
  try {
    const cachedDocument: CachedResult<T> = (await firestore.collection('cache').doc(key).get()).data() as any;
    if (cachedDocument && cachedDocument.expiry) {
      const expiryDate: Date = (cachedDocument.expiry as any).toDate();
      if (expiryDate > new Date()) {
        console.log('hit cache');
        return {
          result: cachedDocument.result,
          expiry: (cachedDocument.expiry as any).toDate(),
          cachedTime: (cachedDocument.cachedTime as any).toDate()
        };
      }
    }

    console.log('missed cache')
  } catch(e) {
    console.log('failed to retrieve from cache')
    console.error(e)
  }

  const liveResult = await alt();
  const response = {
    result: liveResult,
    cachedTime: new Date(),
    expiry
  };

  try {
    await firestore.collection('cache').doc(key).set(response);
  } catch (e) {
    console.log('failed to save to cache');
  }

  return response
}
