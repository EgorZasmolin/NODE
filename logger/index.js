const winston = require("winston");

const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint()
  ),
  transports: [
    new winston.transport.File({ filename: "error.log", level: "error" }),
    new winston.transport.Console({ format: winston.format.simple() }),
  ],
});

module.exports = logger;
