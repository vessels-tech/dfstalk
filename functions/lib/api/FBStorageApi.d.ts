import { SomeResult } from "../utils/AppProviderTypes";
export declare function uploadPublicFile(localFilename: string, expiry: number): Promise<SomeResult<string>>;
export declare const generateUrl: (urlPrefix: string, path: string, firebaseToken: string) => string;
