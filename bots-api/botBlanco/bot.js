//Include puppeter.
const puppeteer = require('puppeteer');

//Include custom modules.
const logger    = require('../lib/logger.js');
const steps     = require('./steps/index.js');
const lib       = require('../lib/lib.js');
const helper    = require('./helper.js');

//Create the context for the middleware.
let context = {
  buffer :[]
}

//Run the bot
const run = async (payload)=>{

  //Insert the the cuil from the payload into the content buffer.
  context.buffer['input'] = {
    cuil : payload.cuil
  };

  //Run the middleware and retrieve the result.
  let result = await lib.middleware(context,[
    steps.openBrowser,
    steps.getPage,
    steps.getImage,
    steps.getCaptcha,
    steps.fillForm,
    steps.extractData,
    steps.closeBrowser
  ]);

  //Parse the data.
  result = helper.parse(result);

  //Save the log in the bd.
  let idLog = await helper.log(result);

  return {
    id   : idLog,
    data : result
  };

}

module.exports.run = run;