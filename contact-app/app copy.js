const { tulisPertanyaan, simpanContact } = require("./contacts");

const main = async () => {
  const nama = await tulisPertanyaan("Masukan nama Anda: ");
  const email = await tulisPertanyaan("Masukan email Anda: ");
  const noHp = await tulisPertanyaan("Masukan noHp Anda: ");

  simpanContact(nama, email, noHp);
};

main();
