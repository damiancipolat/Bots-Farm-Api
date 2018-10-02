const logger  = require('./logger.js');
const proxys  = require('../config/proxy.js');
const moment  = require('moment');

//Get random proxy.
const getProxy = ()=>{

  let ix = Math.floor(Math.random()*proxys.length);

  return proxys[ix];

}

//Middleware pattern, loop into functions.y proba
const middleware = async (scope,functions)=>{

  for (let i=0;i<=functions.length-1;i++){
    
    let step = (i+1);

    try{

      let result = await functions[i](scope,step);
      scope      = result;

    } catch(err){
      
      logger.info('Bot > Fail in step',step);

      //Save the error in scope.
      scope.error = {
        detail : 'Fail in step n°'+step,
        stack  : (err.stack||err)
      }  

      break;

    }

  }

  return scope;

}

const getRandomInt = (min, max)=>{

  return Math.floor(Math.random() * (max - min + 1) + min);

}

const getMsgId = ()=>{

  let num       = getRandomInt(0,100);
  let timestamp = moment().format('YYYYMMDDhhmmssSSS');

  return 'MSG-'+timestamp+'-'+num;

}

const toChildren = (idWorker,typeData,payloadData)=>{
  
  return {
    id      : getMsgId(),
    type    : typeData, 
    payload : payloadData,
    origin  : idWorker
  };

}

const toMaster = (replyId,typeData,payloadData)=>{

  return {
    replyTo : replyId,
    type    : typeData, 
    payload : payloadData
  };

}

module.exports.middleware   = middleware;
module.exports.getProxy     = getProxy;
module.exports.toChildren   = toChildren;
module.exports.toMaster     = toMaster;
module.exports.getRandomInt = getRandomInt;