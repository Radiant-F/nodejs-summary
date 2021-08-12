const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 3000;
const { loadContact, findContact } = require("./utils/contacs");

app.set("view engine", "ejs");
app.use(expressLayouts); // third-party middleware
app.use(express.static("public")); // built-in middleware

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
  });
});

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
