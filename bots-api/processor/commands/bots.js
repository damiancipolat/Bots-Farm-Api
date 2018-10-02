const botBcraPadron = require('../../botBcra/bot.js');
const botAfipBlanco = require('../../botBlanco/bot.js');

//Extract data from afip en blanco.
const afipBlanco = async (cuil)=>{

  try {

    return await botAfipBlanco.run(data64);

  } catch(err){
    throw new Error(err);
  }

}

//Extract data from bcra padron.
const bcraPadron = async (cuil)=>{

  try {

    return await botBcraPadron.run(cuil);

  } catch(err){
    throw new Error(err);
  }

}

module.exports.afipBlanco = afipBlanco;
module.exports.bcraPadron = bcraPadron;
