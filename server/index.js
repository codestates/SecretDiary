require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const controllers = require('./controllers');
const fs = require('fs');
const https = require('https');
const { sequelize } = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [
      'https://localhost:3000',
      'https://localhost:4000',
      'http://localhost:3000',
      'http://localhost:4000',
      'http://secretdiary-part6.s3-website.ap-northeast-2.amazonaws.com',
      'https://secretdiary-part6.s3-website.ap-northeast-2.amazonaws.com',
      'https://server.secretdiary.org',
      'https://client.secretdiary.org',
      'api-elb.hyodee.link',
      /\.hyodee\.link$/,
    ],
    credentials: true,
    methods: ['GET', 'POST'],
  })
);

app.use(cookieParser());
app.get('/', (req, res) => {
  console.log('health check');
  res.send('health check');
});

// app.post('/signup', (req, res) => {
//   console.log('req.body');
//   res.send('signup test');
// });

app.post('/signup', controllers.signup);
app.post('/login', controllers.login);
app.post('/logout', controllers.logout)

app.get('/login', (req, res) => {
  console.log('req.body');
  res.send('login test');
});



// app.get('/accesstokenrequest', controllers.accessTokenRequest);
// app.get('/refreshtokenrequest', controllers.refreshTokenRequest);

const HTTPS_PORT = process.env.HTTPS_PORT || 80;

let server;
if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
  const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
  const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log('HTTPS'));
} else {
  server = app.listen(HTTPS_PORT, () => console.log('HTTP'));
}

module.exports = server;
