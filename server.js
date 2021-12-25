const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');

const httpPort = process.env.PORT || 8000;
const httpsPort = process.env.PORT || 8443;

const options = {
    key: fs.readFileSync(path.join(__dirname, '../sslKeys/stageus.co.kr_20210611J992.key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../sslKeys/stageus.co.kr_20210611J992.crt.pem')),
    ca: fs.readFileSync(path.join(__dirname, '../sslKeys/stageus.co.kr_20210611J992.ca-bundle.pem')),
};

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// =======================================================================================

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

// =======================================================================================

// Main Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// "소개" Page
app.get('/education', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/file/education.pdf'));
});

// "커리큘럼" Page
app.get('/curriculum', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/file/curriculum.pdf'));
});

// "FAQ" Page
app.get('/faq', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/faq.html'));
});

// "환불 약관" Page
app.get('/refund', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/refund.html'));
});

// "설치 가이드" Page
app.get('/guide', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/guide.html'));
});

// "팀원 신청서" Page
app.get('/7265676973746572', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/register.html'));
});

// "관리자" Page
app.get('/6d656d6265724c697374', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/management.html'));
});

// =======================================================================================

// 신청서 API
const register = require('./router/register');
app.use('/register', register);

// 관리자 인증 API
const auth = require("./router/auth");
app.use('/auth', auth);

// =======================================================================================

// Wrong REST Request API
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/wrong.html'));
});

// HTTPS Server listen API
https.createServer(options, app).listen(httpsPort, (req, res) => {
    console.log("HTTP Server Started : Port " + httpsPort);
});

// HTTP Server listen API
app.listen(httpPort, (req, res) => {
    console.log("HTTPS Server Started : Port " + httpPort);
});