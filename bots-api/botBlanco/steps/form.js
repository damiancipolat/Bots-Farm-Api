const puppeteer = require('puppeteer');
const config    = require('../config/config.json');
const logger    = require('../../lib/logger.js');

//Html fields names.
const htmlKeys = {
  inputCuil    : '#txtCuil',
  inputCaptcha : '#txtCodigo',
  btnContinue  : '#btnIngresar',
  imgContinue  : '#ctl00_cphMain_imgConsTrab'
}

//Fill the form with the captcha and the cuil.
const fillForm = async (scope,stepNum)=>{

  //Set number of step.
  stepNumber = stepNum;

  try{

    //Get the page.
    let page = scope.buffer['browser'].page;

    //Get the cuil from the input.
    let cuil = scope.buffer['input'].cuil;

    //Get the captcha from the scope.
    let captcha = scope.buffer['captcha'].result;

    //Fill the inputs.
    logger.info('Bot > STEP '+stepNumber+' - Filling form with catcha & cuil.');
    
    //Make click in the textbox.
    await page.click(htmlKeys.inputCuil);

    //Type the captcha.
    await page.keyboard.type(cuil);

    //Click in document input.
    await page.click(htmlKeys.inputCaptcha);

    //Type DNI.
    await page.keyboard.type(captcha);

    //Make click in send.
    await page.click(htmlKeys.btnContinue);

    //Wait until the page finish loading.
    await page.waitForSelector(htmlKeys.imgContinue, { timeout: config.steps.form.timeout });

    //Include buffer data.
    scope.buffer['form'] = {
      stat   : 'ok'
    };

    return scope;

  } catch(error){

    logger.info('Bot > STEP '+stepNumber+' - ERROR.');
    throw {stat:'fail',data:error};

  }

}

module.exports = fillForm;