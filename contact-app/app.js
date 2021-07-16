const yargs = require("yargs");
const {
  simpanContact,
  listContact,
  detailContact,
  deleteContact,
} = require("./contacts");
yargs
  .command({
    command: "add",
    describe: "Menambah kontak baru",
    builder: {
      nama: {
        describe: "Nama Lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      noHP: {
        describe: "Nomor Handphone",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      simpanContact(argv.nama, argv.email, argv.noHP);
    },
  })
  .demandCommand();

// menampilkan semua nama & no hp daftar kontak
yargs.command({
  command: "list",
  describe: "Menampilkan semua nama dan no HP kontak",
  handler() {
    listContact();
  },
});

// menampilkan semua nama & no hp daftar kontak
yargs.command({
  command: "list",
  describe: "Menampilkan semua nama dan no HP kontak",
  handler() {
    listContact();
  },
});

// menampilkan semua nama & no hp daftar kontak
yargs.command({
  command: "detail",
  describe: "Menampilkan detail sebuah kontak berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    detailContact(argv.nama);
  },
});

// menghapus sebuah kontak berdasarkan nama
yargs.command({
  command: "delete",
  describe: "Menghapus sebuah kontak berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    deleteContact(argv.nama);
  },
});

yargs.parse();
