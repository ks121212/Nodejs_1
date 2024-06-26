const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const outputFolder = "./output"; //Folder name where files will be stored

//To check whether folder is alreadt there, if not create a new folder
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

const PORT = 3001;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Api Started Successfully" });
});

app.get("/createFile", (req, res) => {
  const currentTime = new Date();
  const year = currentTime.getFullYear().toString();
  const month = (currentTime.getMonth() + 1).toString();
  const date = currentTime.getDate().toString();
  const hrs = currentTime.getHours().toString();
  const mins = currentTime.getMinutes().toString();
  const secs = currentTime.getSeconds().toString();

  const dateTimeForFileName = `${year}-${month}-${date}-${hrs}-${mins}-${secs}.txt`;

  const filePath = path.join(outputFolder, dateTimeForFileName);

  fs.writeFile(filePath, currentTime.toISOString(), (err) => {
    if (err) {
      res.status(500).send(`Error creating file: ${err}`);
      return;
    }

    res.send(`File created successfully at: ${filePath}`);
  });
});

app.get("/getFiles", (req, res) => {
  fs.readdir(outputFolder, (err, files) => {
    if (err) {
      res.status(500).send(`Error reading files: ${err}`);
      return;
    }
    console.log("List of files:", files);
    const textFiles = files.filter((file) => path.extname(file) === ".txt");

    res.json(textFiles);
  });
});

app.listen(PORT, () => {
  console.log("Server is running on PORT", PORT);
});