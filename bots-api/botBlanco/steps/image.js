const puppeteer = require('puppeteer');
const fs        = require('fs');
const moment    = require('moment');
const config    = require('../config/config.json');
const logger    = require('../../lib/logger.js');

let stepNumber  = 0;

//Get the image and return it as base64
const getImageCaptcha = async (scope,stepNum)=>{

  //Set number of step.
  stepNumber = stepNum;

  try {

    //Get the buffer from the last step.
    let buffer = scope.buffer['page'].buffer;
    let page   = scope.buffer['browser'].page;

    logger.info('Bot > STEP '+stepNumber+' - Finding captcha content.');

    //Find into the buffer the captcha, looking for the url.
    let imgCaptcha = buffer.filter((content)=>content.url().indexOf(config.steps.image.match)>0);

    if (imgCaptcha.length>0){

      logger.info('Bot > STEP '+stepNumber+' - Captcha founded, decoding.');

      let dataImg = imgCaptcha[0];

      logger.info('Bot > STEP '+stepNumber+' - Captcha decoded to base64 success.!');

      let value   = await dataImg.buffer();
      let base64  = new Buffer(value).toString('base64');

      logger.info('Bot > STEP '+stepNumber+' - Clearing buffer and events from Step 2.');

      scope.buffer['page'].buffer = null;
      page.on('response',()=>{});

      //Include buffer data.
      scope.buffer['image'] = {
        stat : 'ok',        
        url  : dataImg.url(),
        data : base64
      };

      return scope;        

    } else{

      logger.info('Bot > STEP '+stepNumber+' - ERROR DOM NOT FOUND.');
      throw {stat:'fail',data:'Dom not found'};

    }

  } catch(error){

    logger.info('Bot > STEP '+stepNumber+' - ERROR.');
    throw {stat:'fail',data:error};

  }

}

module.exports = getImageCaptcha;