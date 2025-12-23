const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// 🔑 Gunakan express.static untuk melayani file statis dari folder htdocs
app.use(express.static(path.join(__dirname, "htdocs")));

// Route khusus untuk /growtopia/server_data.php (jika masih ingin dikustom)
app.get("/growtopia/server_data.php", (req, res) => {
  const filePath = path.join(__dirname, "htdocs", "growtopia", "server_data.php");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(404).send("server_data.php not found");
    }

    res.status(200);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Content-Disposition", "inline");
    res.send(data);
  });
});

// Route untuk root ("/") agar menampilkan index.html (jika ada)
app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "htdocs", "index.html");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(404).send("index.html not found");
    }

    res.status(200);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(data);
  });
});

// Jalankan server di port 80
app.listen(443, () => {
  console.log("Server running on port 80");
});
