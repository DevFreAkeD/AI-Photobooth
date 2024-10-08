const express = require("express");
var moment = require("moment");
var Path = require("path");
var appStartTime = moment();
var fs = require("fs");
const chokidar = require("chokidar");
const exec = require("child_process").exec;
const app = express();
const port = 9000;
const { Server } = require("socket.io");
const file = "users.db";
var exists = fs.existsSync(file);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);
const fetch = require("node-fetch");
const axios = require("axios");
const FormData = require("form-data");
const outputfolder = "./public/output";
const localfolder = __dirname + "/public/WatcherFolder";

// const printer = require('printer');

if (!fs.existsSync(localfolder)) {
  fs.mkdirSync(localfolder, { recursive: true });
}
if (!fs.existsSync(outputfolder)) {
  fs.mkdirSync(outputfolder, { recursive: true });
}
//Initializin  DB Table
db.serialize(function () {
  if (!exists) {
    db.run(
      "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY, name TEXT,email TEXT,gender TEXT,image_path TEXT,image_name TEXT, datetime TEXT,t TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
    );
  }
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

//API
app.post("/api/user", (req, res) => {
  const { name, email, gender } = req.body;
  db.run(
    "INSERT INTO user (name,email,gender,datetime) VALUES ('" +
      name +
      "','" +
      email +
      "','" +
      gender +
      "','" +
      moment(new Date()).format("DD/MM/YYYY hh:mm:ss") +
      "' )",
    (result, error) => {
      if (error) {
        res.send({ statusCode: 400, message: "Error at inserting user" });
      } else {
        res.send({ statusCode: 200, message: "Successfully Inserted" });
      }
    }
  );
});

app.get("/register", function (req, res) {
  res.sendFile(__dirname + "/" + "public/register.html");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/" + "public/index.html");
});
app.get("/preview", function (req, res) {
  res.sendFile(__dirname + "/" + "public/preview.html");
});
app.get("/ledwall", function (req, res) {
  res.sendFile(__dirname + "/" + "public/ledWall.html");
});
let server = app.listen(port, () => {
  console.log("server listen on port: ", port);
});
//Socket.io
let socket = new Server(server);
let recordingPage = socket.of("/recording");
let previewPage = socket.of("/preview");
const fileArray = [];

recordingPage.on("connection", (client) => {
  console.log("connecting with Register page");
  client.on("sendFileToServer", () => {
    console.log(".................here");
    db.all(
      "SELECT * FROM user WHERE id = (SELECT MAX(id) FROM user)",
      async (err, data) => {
        if (!err) {
          const form = new FormData();

          form.append(
            "video",
            fs.readFileSync(
              `${__dirname}/public/WatcherFolder/${data[0].image_name}`
            ),
            {
              filename: `${data[0].image_name}`,
            }
          );
          const request_config = {
            method: "post",
            url: "https://commonservertwo.collab.exchange/PhotoSharingServerapi/files/upload-video",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            data: form,
          };
          const response = await fetch(request_config.url, {
            method: "POST",
            body: form,
          });
          const fetchResp = await response.json();

          // const res = await axios.post(request_config);
          console.log("response--------", fetchResp);
          if (fetchResp) {
            recordingPage.emit("qrCode", fetchResp.result);
          }
        }
      }
    );
  });
  client.on("showPreviewInitial", () => {
    previewPage.emit("showPreviewInitial", fileArray);
  });
});

previewPage.on("connection", (client) => {
  console.log("connecting with Preview page");
});

//=============================================
//FILE-WATCHER=================================
//=============================================
var watcher = chokidar.watch(localfolder, {
  ignored: /^\./,
  persistent: true,
});
watcher.on("add", function (path) {
  fs.stat(path, function (err, fileStats) {
    // console.log("path", path);
    // console.log("file state", fileStats)
    if (path) {
      var fileDate = moment(fileStats.birthtime);
      if (fileDate.isAfter(appStartTime)) {
        let filename = path.split("\\").pop();
        let extension = Path.extname(path);
        let filenameq = Path.basename(path, extension);
        console.log(path, filenameq);
        // console.log(filename);
        if (filename) {
          db.run(
            `UPDATE user set image_path = '/public/WatcherFolder/${filename}', image_name = '${filename}' WHERE id = (SELECT MAX(id) FROM user)`,
            (result, err) => {
              if (err) {
                console.log("error", err);
              } else {
                console.log(result);
              }
            }
          );

          fileArray.push(`${filenameq}.mp4`);

          setTimeout(() => {
            previewPage.emit("fileName", filename);
            previewPage.emit("showPreviewInitial", fileArray);
          }, 7000);
        }
      }
    }
  });
});