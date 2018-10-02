const puppeteer   = require('puppeteer');
const request     = require('request');
const querystring = require('querystring');

const config = require('../config/config.json');
const logger = require('../../lib/logger.js');

let stepNumber = 0;

//Send captcha to the api.
const sendCaptcha = (data64) => {

  return new Promise((resolve,reject)=>{

    let {api,timeoutVal} = config.steps.captcha;

    let form = {
      img: data64
    };

    let formData      = querystring.stringify(form);
    let contentLength = formData.length;    

    //Create post structure.
    let reqPost = {
      url     : api,
      method  : 'POST',
      headers : {
        'Content-Length': contentLength,
        'Content-Type'  : 'application/x-www-form-urlencoded'
      },
      body    : formData,
      timeout : timeoutVal
    }

    //Make post request.
    request.post(reqPost, (error, response)=>{
      
      if (error)
        reject(error);
      else
        resolve(response);

    });
    
  });

}

//Send the captcha to the api.
const resolveCaptcha = async (scope,stepNum)=>{

  //Set number of step.
  stepNumber = stepNum;

  try{

    let captcha = scope.buffer['image'].data;

    //Navigate url.
    logger.info('Bot > STEP '+stepNumber+' - Sending captcha to anticaptcha API.');

    //Send the request.
    let result = await sendCaptcha(captcha);

    //Get the response.
    result = JSON.parse(result.body);

    //If fail the request.
    if (!result.response.hasOwnProperty('error')){

      logger.info('Bot > STEP '+stepNumber+' - Captcha is ['+result.response+'] recognition success.');

      //Include buffer data.
      scope.buffer['captcha'] = {
        stat   : 'ok',
        result : result.response
      };

      return scope;

    } else {

      logger.info('Bot > STEP '+stepNumber+' - ERROR in api response.');
      throw {stat:'fail',data: result.response.error};

    }

  } catch(error){
    
    logger.info('Bot > STEP '+stepNumber+' - ERROR.');
    throw {stat:'fail',data:error};

  }

}

module.exports = resolveCaptcha;