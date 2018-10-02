const puppeteer = require('puppeteer');
const config    = require('../config/config.json');
const logger    = require('../../lib/logger.js');

const keys = {
  inactiveId : '#ctl00_cphMain_imgalta',
  actualId   : '#ctl00_cphMain_rptAltas_ctl01_trData>td:nth-child(2)',
  jobLog     : "[id*='ctl00_cphMain_rptBajas_ctl']>td:nth-child(2)"
}

//Extract the actual situation.
const extractActual = async (page)=>{

  let status = {};

  logger.info('Bot > STEP '+stepNumber+' - Checking actual job status');
  
  //Check if there are an active job.
  const inactive = await page.evaluate((keys) => document.querySelector(keys.inactiveId),keys);

  if (inactive!=null)
    status.active = false;
  else {

    status.active = true;

    logger.info('Bot > STEP '+stepNumber+' - Extract start job date');

    //Get the start date from the actual job.
    status.startDate = await page.evaluate((keys) => document.querySelector(keys.actualId).textContent,keys);

  }

  return status;

}

//Extract the job history.
const extractHistory = async (page)=>{

  logger.info('Bot > STEP '+stepNumber+' - Extract job log');

  //Get all the job log
  const history = await page.evaluate((keys) => [...document.querySelectorAll(keys.jobLog)].map((elem,i) => {

    return {
      job  : (i+1),
      date : elem.textContent
    };

  }),keys);

  return history;

}

//Fill the form with the captcha and the cuil.
const extractData = async (scope,stepNum)=>{

  //Set number of step.
  stepNumber = stepNum;

  try{

    //Get the captcha from the scope.
    let page = scope.buffer['browser'].page;
    
    //Get actual job status. 
    let actualStatus = await extractActual(page);

    //Get the jon history.
    let jobHistory   = await extractHistory(page);

    //Include buffer data.
    scope.buffer['data'] = {
      stat    : 'ok',
      status  : actualStatus,
      history : jobHistory
    };

    return scope;

  } catch(error){

    logger.info('Bot > STEP '+stepNumber+' - ERROR.');
    throw {stat:'fail',data:error};

  }

}

module.exports = extractData;