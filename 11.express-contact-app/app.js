const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const app = express();
const port = 3000;
const {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
  deleteContact,
  updateContact,
} = require("./utils/contacs");
const { body, validationResult, check } = require("express-validator");

app.set("view engine", "ejs");
app.use(expressLayouts); // third-party middleware
app.use(express.static("public")); // built-in middleware
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

app.get("/contact", (req, res) => {
  const contacts = loadContact();
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

// proses data kontak
app.post(
  "/contact",
  // parsing dengan middleware url encoded
  [
    body("nama").custom((value) => {
      const duplikat = cekDuplikat(value);
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
      // return res.status(400).json({ errors: errors.array() });
      res.render("add-contact", {
        title: "Form Tambah Kontak",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      // kirim flash message
      req.flash("msg", "Data kontak berhasil ditambahkan!");
      res.redirect("/contact");
    }
  }
);

// proses delete kontak
app.get("/contact/delete/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  // jika contact tidak ada
  if (!contact) {
    res.status(404);
    res.send("<h1>404</h1>");
  } else {
    deleteContact(req.params.nama);
    req.flash("msg", "Data kontak berhasil dihapus!");
    res.redirect("/contact");
  }
});

// form ubah data contact
app.get("/contact/edit/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  res.render("edit-contact", {
    title: "Ubah Data Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

// proses ubah data
app.post(
  "/contact/update",
  // parsing dengan middleware url encoded
  [
    body("nama").custom((value, { req }) => {
      const duplikat = cekDuplikat(value);
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
      // return res.status(400).json({ errors: errors.array() });
      res.render("edit-contact", {
        title: "Ubah Data Kontak",
        layout: "layouts/main-layout",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      updateContact(req.body);
      // kirim flash message
      req.flash("msg", "Data kontak berhasil diubah!");
      res.redirect("/contact");
    }
  }
);

// halaman detail kontak
app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  res.render("detail", {
    title: "Halaman Detail Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

app.use((req, res) => {
  res.status(404);
  res.send("404");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
