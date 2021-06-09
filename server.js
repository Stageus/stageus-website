const express = require('express');
const path = require('path');
const app = express();   // express 등록
const port = 8000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'img')));
app.use(express.static(path.join(__dirname, 'files')));
app.use(express.static(path.join(__dirname, 'fonts')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 서버 실행
app.listen(port, (req, res) => {
    console.log("Server Started : Port " + port);
});
