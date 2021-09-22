const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { body, validationResult, check } = require("express-validator");
const methodOverride = require("method-override");

// flash
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

require("./utils/db");
const Contact = require("./model/contact");

const app = express();
const port = 3000;

// setup method override
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// konfigurasi flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.listen(port, () => {
  console.log(`Mongo Contact App | Listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "Muhammad",
      email: "muhammad@gmail.com",
    },
    {
      nama: "Fadilah",
      email: "fadilah@gmail.com",
    },
    {
      nama: "Radiant",
      email: "radiant@gmail.com",
    },
  ];
  res.render("index", {
    title: "Halaman Utama",
    nama: "M Radiant",
    mahasiswa,
    layout: "layouts/main-layout",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Halaman About",
    layout: "layouts/main-layout",
  });
});

app.get("/contact", async (req, res) => {
  //   Contact.find().then((contact) => {
  //     res.send(contact);
  //   });
  const contacts = await Contact.find();
  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main-layout",
    contacts,
    msg: req.flash("msg"),
  });
});

// halaman form tambah data kontak
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Halaman Tambah Contact",
    layout: "layouts/main-layout",
  });
});

// proses data data kontak
app.post(
  "/contact",
  // parsing dengan middleware url encoded
  [
    body("nama").custom(async (value) => {
      const duplikat = await Contact.findOne({ nama: value });
      if (duplikat) {
        throw new Error("Nama kontak sudah digunakan!");
      }
      return true;
    }),
    check("email", "Email tidak valid!").isEmail(),
    check("nohp", "Nomor HP tidak valid!").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add-contact", {
        title: "Form Tambah Kontak",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    } else {
      Contact.insertMany(req.body, (error, result) => {
        req.flash("msg", "Data kontak berhasil ditambahkan!");
        res.redirect("/contact");
      });
    }
  }
);

// proses delete kontak
// app.get("/contact/delete/:nama", async (req, res) => {
//   const contact = await Contact.findOne({ nama: req.params.nama });
//   if (!contact) {
//     res.status(404);
//     res.send("<h1>404</h1>");
//   } else {
//     Contact.deleteOne({ _id: contact._id }).then((result) => {
//       req.flash("msg", "Data kontak berhasil dihapus!");
//       res.redirect("/contact");
//     });
//   }
// });
app.delete("/contact", (req, res) => {
  Contact.deleteOne({ nama: req.body.nama }).then((result) => {
    req.flash("msg", "Data kontak berhasil dihapus!");
    res.redirect("/contact");
  });
});

// form ubah data contact
app.get("/contact/edit/:nama", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });
  res.render("edit-contact", {
    title: "Ubah Data Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

// proses ubah data
app.put(
  "/contact",
  // parsing dengan middleware url encoded
  [
    body("nama").custom(async (value, { req }) => {
      const duplikat = await Contact.findOne({ nama: value });
      if (value !== req.body.oldNama && duplikat) {
        throw new Error("Nama kontak sudah digunakan!");
      }
      return true;
    }),
    check("email", "Email tidak valid!").isEmail(),
    check("nohp", "Nomor HP tidak valid!").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("edit-contact", {
        title: "Ubah Data Kontak",
        layout: "layouts/main-layout",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            email: req.body.email,
            nohp: req.body.nohp,
          },
        }
      ).then((result) => {
        req.flash("msg", "Data kontak berhasil diubah!");
        res.redirect("/contact");
      });
    }
  }
);

// halaman detail kontak
app.get("/contact/:nama", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });
  res.render("detail", {
    title: "Halaman Detail Contact",
    layout: "layouts/main-layout",
    contact,
  });
});
