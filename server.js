const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');

const app = express();   // express 등록
const httpPort = process.env.PORT || 8000;
const httpsPort = process.env.PORT || 8443;
const options = {
    key: fs.readFileSync(path.join(__dirname, '../keys/stageus.co.kr_20210611J992.key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../keys/stageus.co.kr_20210611J992.crt.pem')),
    ca: fs.readFileSync(path.join(__dirname, '../keys/stageus.co.kr_20210611J992.ca-bundle.pem')),
};

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'img')));
app.use(express.static(path.join(__dirname, 'files')));
app.use(express.static(path.join(__dirname, 'fonts')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 서버 실행
https.createServer(options, app).listen(httpsPort, (req, res) => {
    console.log("HTTP Server Started : Port " + httpsPort);
});

app.listen(httpPort, (req, res) => {
    console.log("HTTPS Server Started : Port " + httpPort);
});
