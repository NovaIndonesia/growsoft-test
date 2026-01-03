const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 443;

// Middleware untuk parsing body
app.use(express.text({ type: "*/*" }));

// Fungsi untuk membaca server_data.php
function readServerData() {
  const serverDataPath = path.join(__dirname, "htdocs", "growtopia", "server_data.php");
  try {
    const data = fs.readFileSync(serverDataPath, "utf8");
    const lines = data.split("\n");
    const serverData = {};
    lines.forEach((line) => {
      const [key, value] = line.split("|");
      if (key && value) {
        serverData[key.trim()] = value.trim();
      }
    });
    return serverData;
  } catch (error) {
    console.error("Error reading server_data.php:", error);
    return null;
  }
}

// Route untuk server_data.php
app.post("/growtopia/server_data.php", (req, res) => {
  const clientIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  console.log(`Request to /growtopia/server_data.php from IP: ${clientIP}`);

  const serverData = readServerData();
  if (serverData) {
    res.set("Content-Type", "text/plain");
    let response = "";
    for (const [key, value] of Object.entries(serverData)) {
      response += `${key}|${value}\n`;
    }
    response += "RTENDMARKERBS1001";
    res.send(response);
  } else {
    res.status(500).send("Internal Server Error");
  }
});

// Route untuk file cache
app.get("/cache/*", (req, res) => {
  const filePath = path.join(__dirname, "htdocs", req.url);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).send("File not found");
      return;
    }
    res.sendFile(filePath);
  });
});

// Route untuk file statis lainnya
app.use(express.static(path.join(__dirname, "htdocs")));

// Route default
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
