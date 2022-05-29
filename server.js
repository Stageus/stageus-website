const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');

const httpPort = process.env.PORT || 80;
const httpsPort = process.env.PORT || 443;

const SSLOptions = {
    key: fs.readFileSync(path.join(__dirname, '../sslKeys/stageus.co.kr_20210611J992.key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../sslKeys/stageus.co.kr_20210611J992.crt.pem')),
    ca: fs.readFileSync(path.join(__dirname, '../sslKeys/stageus.co.kr_20210611J992.ca-bundle.pem')),
};

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// =======================================================================================

// Redirect from HTTP to HTTPS 
app.get('*', (req, res, next) => {

    const protocol = req.headers['x-forwarded-proto'] || req.protocol;

    if (protocol == 'https') {
        next();
    }
    else {
        let from = protocol + "://" + req.hostname + req.url; 
        let to = "https://" + req.hostname + req.url; 

        res.redirect(to);
    }
});

// =======================================================================================

// Pages Middleware API
const pagesApi = require('./router/pages');
app.use('/', pagesApi);

// Register Middleware API
const accountApi = require('./router/account');
app.use('/account', accountApi);

// Admin Auth Middleware API
const authApi = require("./router/auth");
app.use('/auth', authApi);

// Wrong Page
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/wrong.html'));
});

// =======================================================================================

// HTTPS Server listen API
https.createServer(SSLOptions, app).listen(httpsPort, (req, res) => {
    console.log("HTTP Server Started : Port " + httpsPort);
});

// HTTP Server listen API
app.listen(httpPort, (req, res) => {
    console.log("HTTPS Server Started : Port " + httpPort);
});
