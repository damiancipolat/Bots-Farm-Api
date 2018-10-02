## BOTS API
This platform is loaded with fully functional bots and ready to be deployed.

### Bot Afip en blanco:
- **Web**: https://serviciosweb.afip.gob.ar/tramites_con_clave_fiscal/treb/app/indexBasica.aspx
- **Detail**: this bot simulate a query of CUIL and extract the job history of one person.
- **Path**: "/botBlanco/"
- **Patterns**: The bot uses the Middleware pattern to handle the bots steps in the path example: "/botBlanco/steps/"

### Diagram:
This diagram show the project arquitecture, is based in microservice architecture.

![N|Solid](https://github.com/damiancipolat/Bots-farm-platform/blob/master/doc/diagram-bot.png?raw=true)

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

## Run:
```sh
cd bots-api/
npm start
```
