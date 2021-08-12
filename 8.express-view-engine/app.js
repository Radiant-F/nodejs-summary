const express = require("express");
const morgan = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

// third-party middleware
app.use(morgan("dev"));
app.use(expressLayouts);

// built-in middleware
app.use(express.static("public"));

// application-level middleware
app.use((res, req, next) => {
  console.log("Time: ", Date.now());
  next();
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

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main-layout",
  });
});

app.use((req, res) => {
  res.status(404);
  res.send("404");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
