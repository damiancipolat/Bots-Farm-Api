const puppeteer = require('puppeteer');
const config    = require('../config/config.json');
const logger    = require('../../lib/logger.js');

let contentStore = [];
let stepNumber   = 0;

//Save in the buffer all the content, after will be used to extract the captcha.
const registerDownload = (page)=>{

  contentStore = [];

  page.on('response', async (response) => {
    
    logger.info('Bot > STEP '+stepNumber+' - Buffering '+response.url());
    contentStore.push(response);

  });

}

//Navigate to the web and wait until is loaded.
const gotoPage = async (scope,stepNum)=>{

  //Set number of step.
  stepNumber = stepNum;

  try{

    page = scope.buffer['browser'].page;

    let {url,id,timeoutVal} = config.steps.page;

    //Download the valuable content in the buffer.
    logger.info('Bot > STEP '+stepNumber+' - Ready to Download content.');
    registerDownload(page);

    //Navigate url.
    logger.info('Bot > STEP '+stepNumber+' - Navigate url: '+url);
    await page.goto(url);
    
    logger.info('Bot > STEP '+stepNumber+' - Waiting for body.');
    await page.waitForSelector(id, { timeout: timeoutVal });

    logger.info('Bot > STEP '+stepNumber+' - Page loaded ok.');

    //Include buffer data.
    scope.buffer['page'] = {
      stat   : 'ok',
      buffer : contentStore
    };

    return scope;

  } catch(error){
    console.log(error);
    logger.info('Bot > STEP '+stepNumber+' - ERROR.');
    throw {stat:'fail',data:error};

  }

}

module.exports = gotoPage;