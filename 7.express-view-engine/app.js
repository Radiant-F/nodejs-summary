const express = require("express");
const app = express();
const port = 3000;
const expressLayouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.use(expressLayouts);

app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "Muhammad",
      email: "muhammad@gmail.com",
    },
    {
      nama: "Radiant",
      email: "radiant@gmail.com",
    },
    {
      nama: "Fadilah",
      email: "fadilah@gmail.com",
    },
  ];
  res.render("index", { nama: "Radiant", title: "Belajar Node.js", mahasiswa });
});

app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layout",
    title: "Halaman About",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    layout: "layouts/main-layout",
    title: "Halaman Kontak",
  });
});

app.get("/product/:id", (req, res) => {
  res.send(
    `Produk: ID ${req.params.id} <br> Kategori ID: ${req.query.category}`
  );
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("404");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// const http = require("http");
// const port = 3000;
// const fs = require("fs");

// const renderHTML = (path, res) => {
//   fs.readFile(path, (err, data) => {
//     if (err) {
//       res.writeHead(404);
//       res.write("File not found");
//     } else {
//       res.write(data);
//     }
//     res.end();
//   });
// };

// http
//   .createServer((req, res) => {
//     const url = req.url;
//     res.writeHead(200, {
//       "Content-Type": "text/html",
//     });
//     switch (url) {
//       case "/about":
//         renderHTML("./about.html", res);
//         break;
//       case "/contact":
//         renderHTML("./contact.html", res);
//         break;
//       default:
//         renderHTML("./index.html", res);
//         break;
//     }
//   })
//   .listen(port, () => {
//     console.log(`Server is listening on port ${port}..`);
//   });
