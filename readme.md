# DFSTalk
### DFSTalk is an Text-to-Speech Library for converting numbers and dates into multi-lingual audio

## Motivation

This service was born out of a need to convert currency amounts _"eg. 120,329 Shillings"_ into intelligible audio in Swahili for IVR messages to rural Tanzanians. When we talked to some developers from Jumo, we realised that this was a shared need, and thought this would be a great partnership opportunity. 

We figured that this libary could be very useful for others working in to develop IVR applications for financial inclusion in Africa and around the world, and thus decided to release it publicly under an Open Source license. The hope for this project is that others can add their own languages (no matter how specific) and benefit financial inclusion projects around the world.

_TODO: Talk about the relationship between IVR and Financial Inclusion_


## Example

DFS Talk is able to convert complicated numbers into audio by stitching together individual audio files.

### English:
- 2976 with an Australian Male Accent [link](./docs/audio/en_AU_male_2976.mp3)
- 576 with an Australian Male Accent [link](./docs/audio/en_AU_male_577.mp3)

### Swahili:
_(coming soon!)_


## [API](https://vessels-tech.github.io/dfstalk/docs/index.html)

_This is a draft api, and is currently under review before wider implementation_

We use OpenApi (formerly Swagger) to specify the api, which can be found [here](./swagger.yaml).  

Browse the Swagger UI Editor [here](https://vessels-tech.github.io/dfstalk/docs/index.html)

__Supported Languages__

| Language | Code | Description |
| --- | --- | --- |
| English | en_AU_male | Male English with Australian accent (courtesy of [yours truly](https://twitter.com/lewdaly)) |
| Swahili | sw_TZ_male (coming soon) | Male Swahili with Tanzanian accent |
| Swahili | sw_KE_male (coming soon) | Male Swahili with Kenyan accent |


### Authentication

Authentication is performed using Basic Auth.

Include an auth header: `Authorization: Basic <base64Encode('username:password')>`

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
- [Jumo](https://www.jumo.world/)

