const validator = require("validator");
const chalk = require("chalk");

// console.log(validator.isEmail("radiant@gmail.com"));
// console.log(validator.isMobilePhone("088123123123", "id-ID"));
// console.log(validator.isNumeric("088123123123"));

console.log(chalk.italic.black.bgBlue("Hello World!"));
const pesan = chalk`lorem ipsum {bgRed.black.strikethrough dolor} sit amet {bgGreen.italic.black something} something..`;
console.log(pesan);
