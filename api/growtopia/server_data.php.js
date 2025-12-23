import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "growtopia",
      "server_data.php"
    );

    const content = fs.readFileSync(filePath, "utf8");

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.status(200).send(content);
  } catch (err) {
    res.status(500).send("server_data error");
  }
}
