const puppeteer = require('puppeteer');
const config    = require('../config/config.json');
const logger    = require('../../lib/logger.js');
const lib       = require('../../lib/lib.js');

let stepNumber = 0;

//Get the browser.
const getBrowser = (useProxy,isHeadless)=>{

  let argsBrowser = [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--start-maximized'
  ];

  //If proxy is active.
  if (useProxy){

    //Get the proxy rotating.
    let proxy = lib.getProxy();

    //Show proxy.
    logger.info('Bot > STEP '+stepNumber+' - Using proxy '+proxy.url+':'+proxy.port);

    //Include the proxy in the list.
    argsBrowser.push('--proxy-server='+proxy.url+':'+proxy.port);

  }

  return puppeteer.launch({
    headless : isHeadless,
    args     : argsBrowser
  });

}

//Create and open the web
const openBrowser = async (scope,stepNum)=>{

  //Set number of step.
  stepNumber = stepNum;

  try{

    //throw new Error('1');

    let {proxy,headless} = config.steps.browser;

    //Creating browser.
    logger.info('Bot > STEP '+stepNumber+' - Creating browser.');

    let browser = await getBrowser(proxy,headless);

    //Get a new page.
    logger.info('Bot > STEP '+stepNumber+' - Open new page.');

    const page = await browser.newPage();

    //Include buffer data.
    scope.buffer['browser'] = {
      stat    : 'ok',      
      browser : browser,
      page    : page
    };

    return scope;

  } catch(error){

    logger.info('Bot > STEP '+stepNumber+' - ERROR.');
    throw {stat:'fail',data:error};

  }

}

module.exports = openBrowser;