//Bd module.
const db     = require('../lib/db.js');

//Load configs.
const config = require('../config/config.json');
const botCfg = require('./config/config.json');

//Parse and clean structure.
const parse = (scope)=>{

  let final = {};
  
  //Set bot name.
  final.botName = botCfg.bot.name;

  if (!scope.error){

    let buffer = scope.buffer;

    if (buffer['input'])
      final.input = buffer['input'];

    if (buffer['browser'])
      final.browser = buffer['browser'].stat;

    if (buffer['page'])
      final.page = buffer['page'].stat;

    if (buffer['captcha'])
      final.captcha = buffer['captcha'];

    if (buffer['extract'])
      final.extract = buffer['extract'];

    if (buffer['form'])
      final.form = buffer['form'];

    if (buffer['data'])
      final.data = buffer['data'];

  } else
      final.error = scope.error;

  return final;

}

//Save in the bd the scope and context.
const saveLog = async (scope)=>{

  //Create conection.
  let conex  = await db.connect(config.db.url);

  //Save in bd,
  let result = await db.saveLog(conex,config.db.name,scope);

  conex.close();

  return result.insertedId;

}

module.exports.parse = parse;
module.exports.log   = saveLog;