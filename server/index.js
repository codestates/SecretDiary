require("dotenv").config();
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const controllers = require("./controllers");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000","http://localhost:4000",
    "https://localhost:4000","https://localhost:3000"],
    credentials: true,
    methods: ["GET","POST","OPTIONS"],
  })
);

app.use(cookieParser());
app.post("/login", controllers.login);
app.post("/signup", controllers.signup);
app.get("/accesstokenrequest", controllers.accessTokenRequest);
app.get("/refreshtokenrequest", controllers.refreshTokenRequest);


const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

let server;
// if(fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")){

//   const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
//   const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
//   const credentials = { key: privateKey, cert: certificate };

//   server = https.createServer(credentials, app);
  // server.listen(HTTPS_PORT, () => console.log("server runnning"));

// } else {
  server = app.listen(HTTPS_PORT, () => console.log("HTTP"))
// }
module.exports = server;




