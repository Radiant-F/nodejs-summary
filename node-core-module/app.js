// menulis file secara synchronous
// const fs = require("fs");
// try {
//   fs.writeFileSync("test.txt", "file txt baru banget");
// } catch (error) {
//   console.log(error);
// }

// menulis file secara asynchronous
// fs.writeFile("data/test.txt", "file data asynchronous", (err) =>
//   console.log(err)
// );

// membaca file synchronous
// const data = fs.readFileSync("data/test.txt", "utf-8");
// console.log(data);

// membaca file asynchronous
// fs.readFile("./data/test.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// Readline
// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// rl.question(`Masukan nama Anda: `, (nama) => {
//   rl.question(`Masukan noHp Anda: `, (noHp) => {
//     const contact = { nama, noHp };
//     const file = fs.readFileSync("data/contacts.json", "utf8");
//     const contacts = JSON.parse(file);
//     contacts.push(contact);
//     fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
//     console.log(
//       `Kontak dengan nama ${nama} dan nomor ${noHp}, telah disimpan.`
//     );
//     rl.close();
//   });
// });
