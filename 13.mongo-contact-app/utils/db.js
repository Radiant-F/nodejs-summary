const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/cobadatabase");

// Menyimpan data dari skema
// const contact1 = new Contact({
//   nama: "Santri Wati",
//   nohp: "0884561235897",
//   email: "santriwati@gmail.com",
// });

// contact1.save().then((contact) => console.log(contact));
