import { SomeResult } from "../utils/AppProviderTypes";
export declare const getBucketClient: () => any;
export declare const generateUrl: (urlPrefix: string, path: string, firebaseToken: string) => string;
export declare function uploadPublicFile(localFilename: string, expiry: number): Promise<SomeResult<string>>;
