//Include MongoDB client.
const mongoCli = require('mongodb').MongoClient;

//Enable connection.
const connect = (dbUrl)=>{

  return new Promise((resolve,reject)=>{

    try{

      //Try to connect to mongodb.
      mongoCli.connect(dbUrl, (err, conex)=>{

        if (err)
          reject(err);
        else
          resolve(conex);

      });

    } catch(error){

      reject(err);

    }

  });

}

//Save a log in the bd.
const saveLog = (bdConex,bdName,scope)=>{

  return new Promise((resolve,reject)=>{

    //Select db.
    let dbo = bdConex.db(bdName);

    //Insert the tweet.
    dbo.collection("logs").insertOne(scope, (err, res)=> {

      if (err)
        reject(err);
      else
        resolve(res);

    });

  });

}

module.exports.connect = connect;
module.exports.saveLog = saveLog;