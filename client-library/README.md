# DFSTalk - Client Library

## Usage

### Installing
```bash
npm install dfstalk-client
```

### Basic Usage
```typescript
import { DFSTalk } from 'dfstalk-client';

async function main() {
  const client = new DFSTalk({
    credentials: {
      username: 'username',
      password: 'password'
    }
  });

  try {
    const response = await client.say(12, 'en_AU', 'male');
    console.log(`Url: ${response.url}, Expiry: ${response.expiry}`)
  } catch (e) {
    // handle errors
  }
}

main();
```

## API

### DFSTalk
```typescript
const client = new DFSTalk({
  url: 'optional - path to self hosted server',
  language: 'optional - default language to return',
  credentials: {
    username: 'username',
    password: 'password'
  }
});
```

### Say
```typescript
const client = new DFSTalk({credentials: { username: 'username', password: 'password' }});
const response = await client.say(103, 'en_AU', 'male');
console.log(response)
// { Url: 'path-to-file', Expiry: Date }
```

### getAvailableLanguages
```typescript
const client = new DFSTalk({credentials: { username: 'username', password: 'password' }});
const response = await client.getAvailableLanguages();
console.log(response)
// ['en_AU_male', 'en_AU_female', ...]
```
