const express = require('express');
const router  = express.Router();

//Custom modules.
const messages  = require('../../processor/manager/messages.js');
const validator = require('../validator.js');

//Receive the request to crawl the site afip blanco.
router.post('/afipBlanco',(req,res)=>{

  let master = global.master;

  //Validate request.
  if (validator.hasCuil(req.body)){

    console.log('> Afip en blanco - BOT request');

    //Send to the worker the message and payload.  
    master.sendToWorker(res,messages.baseMsg('bot-afip-blanco',req.body));

  } else {

    console.log('> Invalid request');
    res.status(400).json({error:"Bad parameter."});

  } 

});

//Reiceve the request to crawl the bcra site.
router.post('/bcra',(req,res)=>{

  let master = global.master;

  //Validate request.
  if (validator.hasCuil(req.body)){

    console.log('> BCRA - BOT requests');

    //Send to the worker the message and payload.  
    master.sendToWorker(res,messages.baseMsg('bot-bcra-padron',req.body));

  } else {

    console.log('> Invalid requet');
    res.status(400).json({error:"Bad parameter."});

  }

});

module.exports = router;