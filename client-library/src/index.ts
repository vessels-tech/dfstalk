import fetch from 'node-fetch';

interface Credentials {
  username: string;
  password: string;
}

export class DFSTalk {
  protected url: string = 'https://us-central1-dfs-talk.cloudfunctions.net';
  protected defaultLanguage: string | undefined;
  protected credentials: Credentials;

  /**
   * create a new instance of DFSTalk client library
   * @param {string} config.url url to instance of dfstalk
   * @param {string} config.language default language to use
   * @param {object} config.credentials credentials to use
   */
  constructor(config: {
    url?: string,
    language?: string,
    credentials: Credentials
  }) {
    this.url = config.url || this.url;
    this.defaultLanguage = config.language;
    this.credentials = config.credentials;
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
    voiceType?: 'male' | 'female'
  ): Promise<{ url: string, expiry: Date }> {
    language = language || this.defaultLanguage;
    voiceType = voiceType || 'male';
    if (typeof language === 'undefined') {
      throw new Error('Language must be defined in the constructor or passed as a parameter');
    }

    const url = `${this.url}/number`;
    const fetchResult = await fetch(url, {
      headers: { ...this.getAuthorizationHeader() },
      body: JSON.stringify({
        language: `${language}_${voiceType}`,
        number
      })
    });

    const jsonResult = await fetchResult.json();
    return {
      url: jsonResult.url,
      expiry: new Date(Date.now() + (jsonResult.expiry * 1000))
    };
  }

  /**
   * getAvailableLanguages
   * @description Gets the available language codes for the number audio generator
   * @returns {Promise<string>} list of available languages
   */
  async getAvailableLanguages(): Promise<string[]> {
    const url = `${this.url}/number/languages`;
    const fetchResult = await fetch(url, { headers: { ...this.getAuthorizationHeader() } });
    return fetchResult.json();
  }

  private authHeader: string | undefined;
  protected getAuthorizationHeader(): { Authorization: string } {
    if (typeof this.authHeader === 'undefined') {
      const textToEncode = `${this.credentials.username}:${this.credentials.password}`;
      this.authHeader = Buffer.from(textToEncode).toString('base64');
    }

    return { Authorization: this.authHeader };
  }
}
