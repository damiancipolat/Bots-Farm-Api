## Configuration
- Proxy list, edit the file /config/proxy.js with new proxys IP's.

```js
module.exports = [
  {
    url  : '179.185.199.195',
    port : 8080
  },
  {
    url  : '190.165.172.109',
    port : 31476
  },
  {
    url  : '189.81.86.117',
    port : 8080
  },
  {
    url  : '191.37.132.169',
    port : 8080
  }
];
```
- Go to /config/config.json

```js
{
  "server":{
    "ip"   : "127.0.0.1",
    "port" : 9090
  },
  "workers" : {
    "number"    : 4,
    "planifier" : "random"
  },
  "db":{
      "url"  : "MONGODB-URL-SERVER",
      "name" : "botlogs"    
  },
  "log":"./results.log"
}

```

## Install:
```sh
cd bots-api/
npm install
```

## run:
```sh
cd bots-api/
npm start
```
