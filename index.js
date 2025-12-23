const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// FULL BYPASS – CUMA ROUTE INI
app.all("/growtopia/server_data.php", (req, res) => {
  const filePath = path.join(__dirname, "htdocs", "growtopia", "server_data.php");

  fs.readFile(filePath, "utf8", (err, content) => {
    if (err) {
      return res.status(404).send("server_data.php not found");
    }

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end(content);
  });
});

// DEFAULT: TOLAK SEMUA
app.use((req, res) => {
  res.status(403).send("403 Forbidden");
});

// LISTEN (GANTI PORT SESUAI MAU LU)
app.listen(443, () => {
  console.log("Express running on port 80");
});
