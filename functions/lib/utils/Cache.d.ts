interface CachedResult<T> {
    result: T;
    expiry: Date;
    cachedTime: Date;
}
export declare function tryCacheElse<T>(key: string, expiry: Date, alt: () => Promise<T>): Promise<CachedResult<T>>;
export {};
