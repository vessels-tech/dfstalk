![dfstalk_logo](./public/logo.png)

### DFSTalk is a Text-to-Speech Library for converting numbers and dates into multi-lingual audio

## Motivation

This service was born out of a need to convert currency amounts _"eg. 120,329 Shillings"_ and other numbers _"eg. 23.45 kilograms"_ into intelligible audio in Swahili for IVR messages to rural Tanzanians. When we talked to some developers from [Jumo](https://www.jumo.world/), we realised that this was a shared need, and thought this would be a great partnership opportunity. 

We figured that this libary could be very useful for others working in to develop IVR applications for financial inclusion in Africa and around the world, and thus decided to release it publicly under an Open Source license. The hope for this project is that others can add their own languages and benefit financial inclusion projects around the world.


### Wait. IVR and Financial Inclusion?

Yes. That's right.

Since 2017 we have been working along with [Teller](textteller.com) and [Ker-twang](http://ker-twang.com/) on building more inclusive financial services across a number of countries and markets. We learned that many people recieve text messages from mobile money operators or cash disbursement programmes. For low-income people with poor literacy or poor eyesight, reading text messages with numbers on a screen isn't a great experience.

We've been crafting IVR (Interactive Voice Response) experiences that aim to engage these very people, and thus needed a way to read out numbers to them in their own native language. We believe that this library can be a small piece in enabling organizations around the world to better engage their customers over voice.


## Example

DFS Talk is able to convert complicated numbers into audio by stitching together individual audio files. There's no magic going on here with complex speech synthesis; we are just appending different words until it makes a number.

Below are some examples of numbers that have been converted to audio:

### English:
- [2976 with an Australian Male Accent.](./docs/audio/en_AU_male_2976.mp3?raw=true)
- [576 with an Australian Male Accent](./docs/audio/en_AU_male_577.mp3?raw=true)

### Swahili:
_(coming soon!)_


## [API](https://vessels-tech.github.io/dfstalk/docs/index.html)

_This is a draft api, and is currently under review before wider implementation_

The API is specified in YAML using the OpenApi v2 spec. You can find the api spec at [./swagger.yaml](./swagger.yaml). You can also browse the api with the Swagger UI Editor [here](https://vessels-tech.github.io/dfstalk/docs/index.html)

__Supported Languages__

| Language | Code | Description |
| --- | --- | --- |
| English | en_AU_male | Male English with Australian accent (courtesy of [yours truly](https://twitter.com/lewdaly)) |
| Swahili | sw_TZ_male (coming soon) | Male Swahili with Tanzanian accent |
| Swahili | sw_KE_male (coming soon) | Male Swahili with Kenyan accent |


### Authentication

Authentication is performed using Basic Auth. Simply include an auth header: `Authorization: Basic <base64Encode('username:password')>` in your requests.

For example, where username=email@example.com and password=password
Auth header value is:  
  `Basic ZW1haWxAZXhhbXBsZS5jb206cGFzc3dvcmQ=`

e.g.:
```bash
curl -X POST "https://us-central1-dfs-talk.cloudfunctions.net/number/" \
  -H "accept: application/json" \
  -H "authorization: Basic ZW1haWxAZXhhbXBsZS5jb206cGFzc3dvcmQ=" \
  -H "Content-Type: application/json" \
  -d "{ \"language\": \"en_AU_male\", \"number\": 1032}"
```


### Endpoints

Below is a summary of the key endpoints to use the library. You can browse the full API [here](https://vessels-tech.github.io/dfstalk/docs/index.html).

#### `POST /number`

Generates audio for a given number and language code.

Request Format:
```js
{
  "language": "<supported language code>",
  "number": integer
}
```

Response Format:

```js
{
  "expiry": "" //<time in seconds>,
  "url": ""    //<url of the generated audio. Will be deleted after the expiry time>
}
```

##### For example:

```bash
curl -X POST "https://us-central1-dfs-talk.cloudfunctions.net/number/" \
  -H "accept: application/json" \
  -H "authorization: Basic ZW1haWxAZXhhbXBsZS5jb206cGFzc3dvcmQ=" \
  -H "Content-Type: application/json" \
  -d "{ \"language\": \"en_AU_male\", \"number\": 239572}"
```

Response:
```json
{
  "expiry": 86400,
  "url": "https://www.googleapis.com/download/storage/v1/b/dfs-talk.appspot.com/o/generated%2Fee19ce03-5a41-4e90-a113-dfc043c57d4e.mp3?alt=media&token=1111222233334444"
}
```

#### `POST /date/`

_coming soon!_


## Public Access

We have a live deployment that is currently in private Alpha testing, and not yet ready for the public. To request access, get in touch with us at: lewis [at] vesselstech [dot] com.


## Adding a new Language

If you would like to contribute a new language or audio for a given language, please get in touch with us at: lewis [at] vesselstech [dot] com.

The process will change for each language, but follow these rough steps:
- Determine which unique words for a language need to be recorded. For example, in English this means all numbers from 0-20, all tens (10, 20, 30), hundred, thousand, and a few more such as 'minus', 'point' and 'and'.
- Write a function in Javascript that takes a digit within a given number and returns a word or words. Eg. 119 in English is converted into "one", "hundred", "nineteen" 
- Record the audio each word, and add to `functions/audio/<language_code>/`


## License

DFSTalk is licensed under a GNU GPL v3.0 license. See the LICENSE file for more info.

Copyright (c) 2019 Vessels Tech

## Contributors

- [Vessels Tech](https://vesselstech.com)
- [Teller](https://textteller.com)
- [Ker-twang](http://ker-twang.com/)


## Funders

All of this work is made possible with generous funding from [DFSLab](https://dfslab.net/).

<img src="./docs/img/dfs_logo.jpg" width="200">

