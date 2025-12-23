const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// ❌ JANGAN pakai express.static kalau ga perlu
// app.use(express.static("public"));

app.get("/growtopia/server_data.php", (req, res) => {
  const filePath = path.join(
    __dirname,
    "htdocs",
    "growtopia",
    "server_data.php"
  );

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(404).send("server_data.php not found");
    }

    // 🔑 INI KUNCI BIAR GA KE-DOWNLOAD
    res.status(200);
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Content-Disposition", "inline"); // ⬅️ PENTING
    res.send(data);
  });
});

// selain itu tolak
app.use((req, res) => {
  res.status(403).send("403 Forbidden");
});

app.listen(443, () => {
  console.log("Server running on port 80");
});
