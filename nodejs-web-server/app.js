const http = require("http");
const port = 3000;
const fs = require("fs");

const renderHTML = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.write("File not found");
    } else {
      res.write(data);
    }
    res.end();
  });
};

http
  .createServer((req, res) => {
    const url = req.url;
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    switch (url) {
      case "/about":
        renderHTML("./about.html", res);
        break;
      case "/contact":
        renderHTML("./contact.html", res);
        break;
      default:
        renderHTML("./index.html", res);
        break;
    }
  })
  .listen(port, () => {
    console.log(`Server is listening on port ${port}..`);
  });
