const env      = process.env.NODE_ENV || 'development';
const winston  = require('winston');
const fs       = require('fs');
const config   = require('../config/config.json');

const timeStampFormat= ()=>{
  return (new Date()).toLocaleTimeString();
}

const wConsole = new (winston.transports.Console)({
  timestamp : timeStampFormat,
  colorize  : true,
});

const wFile = new (winston.transports.File)({
  filename    : config.log,
  timestamp   : timeStampFormat,
  datePattern : 'yyyy-MM-dd',
  prepend     : true,      
  level       : env === 'development' ? 'debug' : 'info'
});

module.exports = new (winston.Logger)({transports: [wConsole,wFile]});