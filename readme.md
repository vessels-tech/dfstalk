# DFSTalk
### DFSTalk is an Open Source Library and Service for converting numbers and dates into multi-lingual audio


## Motivation

This service was born out of a need to convert currency amounts "eg. 120,329 Shillings" into intelligible audio in Swahili for IVR messages to rural Tanzanians. When we talked to some developers from Jumo, we realised that this was a shared need, and thought this would be a great partnership opportunity. 

We figured that this libary could be very useful for others working in to develop IVR applications for financial inclusion in Africa and around the world, and thus decided to release it publicly under an Open Source license. The hope for this project is that others can add their own languages (no matter how specific) and benefit financial inclusion projects around the world.

_TODO: Talk about the relationship between IVR and Financial Inclusion_

## [API](https://vessels-tech.github.io/dfstalk/docs/index.html)

_This is a draft api, and is currently under review before implementation_

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


## Adding a new Language

_todo_

## License

_todo_

## Contributors

- [Vessels Tech](https://vesselstech.com)
- [Jumo](https://www.jumo.world/)

