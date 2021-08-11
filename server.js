const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');

const app = express();   // express 등록
const httpPort = process.env.PORT || 8000;
const httpsPort = process.env.PORT || 8443;
const options = {
    key: fs.readFileSync(path.join(__dirname, '../sslKeys/stageus.co.kr_20210611J992.key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../sslKeys/stageus.co.kr_20210611J992.crt.pem')),
    ca: fs.readFileSync(path.join(__dirname, '../sslKeys/stageus.co.kr_20210611J992.ca-bundle.pem')),
};

app.use(express.static(path.join(__dirname, 'public')));

// HTTP to HTTPS Redirect
app.get('*', (req, res, next) => {

    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    console.log(protocol);

    if (protocol == 'https') {
        next();
    }
    else {
        let from = protocol + "://" + req.hostname + req.url; 
        let to = "https://" + req.hostname + req.url; 

        console.log(from + "->" + to); 
        res.redirect(to);
    }
});

// Load robots.txt
app.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(__dirname, 'robots.txt'));
});

// Load sitemap.xml
app.get('/sitemap.xml', (req, res) => {
    res.sendFile(path.join(__dirname, 'sitemap.xml'));
});

// Main Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// "스테이지어스" Page
app.get('/introduce', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/introduce.html'));
});

// "스테이지어스" Page
app.get('/curriculum', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/curriculum.html'));
});

// "스테이지어스" Page
app.get('/results', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/results.html'));
});

// "스테이지어스" Page
app.get('/faq', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/faq.html'));
});

// header-footer template
app.get('/testTemplate', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/header-footer-template.html'));
});

// If user access wrong page we will return this.
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'wrong.html'));
});

// Run HTTPS Server
https.createServer(options, app).listen(httpsPort, (req, res) => {
    console.log("HTTP Server Started : Port " + httpsPort);
});

// Run HTTP Server
app.listen(httpPort, (req, res) => {
    console.log("HTTPS Server Started : Port " + httpPort);
});