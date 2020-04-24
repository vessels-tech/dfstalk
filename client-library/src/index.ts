import fetch from 'node-fetch';
import { createHash } from 'crypto';

interface Credentials {
  username: string;
  password: string;
}

type VoiceType = 'male' | 'female';

interface SayResult { url: string, expiry: Date }
interface CachedSayResult extends SayResult { cachedTime: Date }

export class DFSTalk {
  protected url: string = 'https://us-central1-dfs-talk.cloudfunctions.net/number';
  protected defaultLanguage: string | undefined;
  protected credentials: Credentials;
  protected static availableLanguages: { [host: string]: { [language: string]: boolean} } = {};
  protected static audioCache: { [host: string ]: { [key: string]: CachedSayResult } } = {};
  protected format: string;

  /**
   * create a new instance of DFSTalk client library
   * @param {string} config.url url to instance of dfstalk
   * @param {string} config.language default language to use
   * @param {object} config.credentials credentials to use
   */
  constructor(config: {
    url?: string,
    language?: string,
    credentials: Credentials,
    format?: 'mp3' | 'asterisk_sln'
  }) {
    this.url = config.url || this.url;
    this.defaultLanguage = config.language;
    this.credentials = config.credentials;
    this.format = config.format || 'mp3';
  }

  /**
   * say
   * generate an audio file for a given number
   * @param {number} number the number to say
   * @param {string} language to say number in
   * @param {string} voiceType type of voice to use
   */
  async say(
    number: number,
    language?: string,
    voiceType?: VoiceType
  ): Promise<SayResult> {
    language = language || this.defaultLanguage;
    voiceType = voiceType || 'male';
    if (typeof language === 'undefined') {
      throw new Error('Language must be defined in the constructor or passed as a parameter');
    }

    const languageString = `${language}_${voiceType}`;
    const languageExists = await this.checkIfLanguageExists(languageString);
    if (!languageExists) {
      throw new Error(`requested language (${languageString}) does not exist`);
    }

    if (!DFSTalk.audioCache[this.url]) {
      DFSTalk.audioCache[this.url] = {};
    }

    const cacheKey = this.getCacheKey(number, language, voiceType);
    if (DFSTalk.audioCache[this.url][cacheKey]) {
      const cachedEntry = DFSTalk.audioCache[this.url][cacheKey];
      const milliSecondsSinceCached = Date.now() - cachedEntry.cachedTime.getTime();
      const timeTillExpiry = cachedEntry.expiry.getTime() - milliSecondsSinceCached;

      if (timeTillExpiry > 0) {
        return cachedEntry;
      }
    }

    const url = `${this.url}/number`;
    const fetchResult = await fetch(url, {
      headers: {
        ...this.getAuthorizationHeader(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        language: languageString,
        number,
        format: this.format
      }),
      method: 'POST'
    });

    const jsonResult = await fetchResult.json();
    const response = {
      url: jsonResult.url,
      expiry: new Date(Date.now() + (jsonResult.expiry * 1000))
    };

    DFSTalk.audioCache[this.url][cacheKey] = {
      ...response,
      cachedTime: new Date()
    };

    return response;
  }

  protected getCacheKey(number: number, language: string, voiceType: string) {
    const creds = `${this.credentials.username}_${this.credentials.password}`;
    const key = `${creds}_${number}_${language}_${voiceType}`;

    return createHash('md5').update(key).digest('hex');
  }

  /**
   * getAvailableLanguages
   * @description Gets the available language codes for the number audio generator
   * @returns {Promise<string>} list of available languages
   */
  async getAvailableLanguages(): Promise<string[]> {
    const url = `${this.url}/number/languages`;
    const fetchResult = await fetch(url, { headers: { ...this.getAuthorizationHeader() } });
    const jsonResult = await fetchResult.json();

    this.updateAvailableLanguages(jsonResult);

    return jsonResult;
  }

  private authHeader: string | undefined;
  protected getAuthorizationHeader(): { Authorization: string } {
    if (typeof this.authHeader === 'undefined') {
      const textToEncode = `${this.credentials.username}:${this.credentials.password}`;
      this.authHeader = Buffer.from(textToEncode).toString('base64');
    }

    return { Authorization: `Basic ${this.authHeader}` };
  }

  protected async updateAvailableLanguages(languages: string[]): Promise<void>;
  protected async updateAvailableLanguages(): Promise<void>;
  protected async updateAvailableLanguages(languages?: string[]): Promise<void> {
    const host = this.url;

    const availableLanguages = typeof languages === 'undefined'
      ? await this.getAvailableLanguages()
      : languages;

    DFSTalk.availableLanguages[host] = {};
    for (const language of availableLanguages) {
      DFSTalk.availableLanguages[host][language] = true;
    }
  }

  protected async checkIfLanguageExists(languageString: string): Promise<boolean>;
  protected async checkIfLanguageExists(language: string, voice: VoiceType): Promise<boolean>;
  protected async checkIfLanguageExists(languageCode: string, voice?: VoiceType): Promise<boolean> {
    const languageString = typeof voice === 'undefined' ? languageCode : `${languageCode}_${voice}`;
    const host = this.url;
    if (typeof DFSTalk.availableLanguages[host] === 'undefined') {
      await this.updateAvailableLanguages();
    }

    return DFSTalk.availableLanguages[host][languageString];
  }
}
