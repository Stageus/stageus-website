const path = require('path');
const router = require('express').Router();
const { Client } = require('pg');

// 페이지 출력 api
router.post('', (req, res) => {

    // request AJAX data
    let nameValue = req.body.nameValue;
    let contactValue = req.body.contactValue;
    let jobValue = req.body.jobValue;
    let optionValue = req.body.optionValue;
    let subjectValue = req.body.subjectValue;

    // Init response data
    const result = {
        "success" : false
    };

    // Cal timestamp
    const today = new Date();
    const utc = today.getTime() + (today.getTimezoneOffset() * 60 * 1000);
    const krTime = 9 * 60 * 60 * 1000;
    const newTime = new Date(utc + krTime);

    // Init psql account
    const pg = new Client({
        user: "ubuntu",
        host: "localhost",
        database: "stageus",
        password: "stageus0104",
        prot: 5432
    })
    const query = "INSERT INTO homepage.register(name, contact, job, option, subject, register_date) VALUES($1, $2, $3, $4, $5, $6);";
    const values = [nameValue, contactValue, jobValue, optionValue, subjectValue, newTime.toISOString()];

    pg.connect((err) => {
        if (err) {
            console.log(err);
        }
    });
    pg.query(query, values, (err, res2) => {
        if (!err) {
            result.success = true
            res.send(result);
        } else {
            console.log(err);
        }
        pg.end();
    })
});

module.exports = router;