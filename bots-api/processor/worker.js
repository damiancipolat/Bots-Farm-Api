const cluster    = require('cluster');
const processObj = require('process');

//Include custom modules.
const lib  = require('../lib/lib.js');

//Include commands.
const bots = require('./commands/bots.js');

//Worker process.
class Worker{

  run(){

    console.log('> worker STARTED',processObj.pid);  
    process.on('message',this.onMasterMsg);

  }

  //Send msg to master.
  sendToMaster(id,type,result){
    
    process.send(lib.toMaster(msg.id,'response',result));

  }

  //When receive the data.
  onMasterMsg(msg){

    //Process bot request.
    if (msg.type=='bot-afip-blanco'){

      //Handle async.
      bots.afipBlanco(msg.payload.cuil)
        .then((result) => process.send(lib.toMaster(msg.id,'response',result)))
        .catch((err)   => {
          
          console.log('> Request ERROR:',err);

          err = {error:"Server internal error"};

          process.send(lib.toMaster(msg.id,'response-error',err));

        });

    }

    //Process bot request.
    if (msg.type=='bot-bcra-padron'){

      //Handle async.
      bots.bcraPadron(msg.payload.cuil)
        .then((result) => process.send(lib.toMaster(msg.id,'response',result)))
        .catch((err)   => {

          console.log('> Request ERROR:',err);

          err = {error:"Server internal error"};

          process.send(lib.toMaster(msg.id,'response-error',err));

        });

    }    


  }  

}

module.exports = new Worker();