const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.get("/growtopia/server_data.php", (req, res) => {
  const filePath = path.join(__dirname, "htdocs", "growtopia", "server_data.php");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(404).send("server_data.php not found");
    }

    // Set header agar konten ditampilkan di browser
    res.status(200);
    res.setHeader("Content-Type", "text/html; charset=utf-8"); // Ubah ke text/html jika isi file HTML/PHP
    res.setHeader("Content-Disposition", "inline");
    res.send(data);
  });
});

// Tolak semua request lain
app.use((req, res) => {
  res.status(403).send("403 Forbidden");
});

// Jalankan di port 80 (HTTP)
app.listen(80, () => {
  console.log("Server running on port 80");
});
