const puppeteer = require('puppeteer');
const logger    = require('../../lib/logger.js');

let stepNumber  = 0;

//Close the browser.
const close = async (scope,stepNum)=>{

  //Set number of step.
  stepNumber = stepNum;

  try{

    browser = scope.buffer['browser'].browser;

    //Navigate url.
    logger.info('Bot > STEP '+stepNumber+' - Closing browser');
    
    browser.close();

  } catch(error){
    
    logger.info('Bot > STEP '+stepNumber+' - ERROR.');
    throw {stat:'fail',data:error};

  }

}

module.exports = close;