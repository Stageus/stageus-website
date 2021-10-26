const path = require('path');
const router = require('express').Router();
const { Client } = require('pg');

// Insert register api
router.post('/', (req, res) => {

    // request AJAX data
    const nameValue = req.body.nameValue;
    const contactValue = req.body.contactValue;
    const jobValue = req.body.jobValue;
    const optionValue = req.body.optionValue;
    const subjectValue = req.body.subjectValue;
    const generationValue = req.body.generationValue;
    const durationValue = req.body.durationValue;

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
    const query = "INSERT INTO homepage.register(name, contact, job, option, register_date, generation, duration, memo, subject) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);";
    const values = [
        nameValue, contactValue, jobValue, optionValue, newTime.toISOString(), 
        generationValue, durationValue, "", subjectValue
    ];

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

// Select register api
router.get('/', (req, res) => {

    // Init response data
    const result = {
        "list" : []
    };

    // Init psql account
    const pg = new Client({
        user: "ubuntu",
        host: "localhost",
        database: "stageus",
        password: "stageus0104",
        prot: 5432
    })
    const query = "select * from homepage.register ORDER BY seq";

    pg.connect((err) => {
        if (err) {
            console.log(err);
        }
    });
    pg.query(query, (err, res2) => {
        if (!err) {

            const rowList = res2.rows;

            rowList.forEach((elem, index) => {
                const row = [
                    res2.rows[index].name,
                    res2.rows[index].contact,
                    res2.rows[index].job,
                    res2.rows[index].option,
                    res2.rows[index].generation,
                    res2.rows[index].subject,
                    res2.rows[index].duration,
                    res2.rows[index].register_date,
                    res2.rows[index].memo,
                    res2.rows[index].seq
                ];
                result.list.push(row);
            })

            res.send(result);

        } else {
            console.log(err);
        }
        pg.end();
    })
});

router.delete('/', (req, res) => {

    // request AJAX data
    const seqValue = req.body.seqValue;

    // Init response data
    const result = {
        "success" : false
    };

    // Init psql account
    const pg = new Client({
        user: "ubuntu",
        host: "localhost",
        database: "stageus",
        password: "stageus0104",
        prot: 5432
    })
    const query = "DELETE FROM homepage.register WHERE seq = $1;";
    const values = [seqValue];

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

router.put('/', (req, res) => {

    // request AJAX data
    const nameValue = req.body.nameValue;
    const contactValue = req.body.contactValue;
    const jobValue = req.body.jobValue;
    const optionValue = req.body.optionValue;
    const subjectValue = req.body.subjectValue;
    const generationValue = req.body.generationValue;
    const durationValue = req.body.durationValue;
    const memoValue = req.body.memoValue;
    const seqValue = req.body.seqValue;

    // Init response data
    const result = {
        "success" : false
    };

    // Init psql account
    const pg = new Client({
        user: "ubuntu",
        host: "localhost",
        database: "stageus",
        password: "stageus0104",
        prot: 5432
    })
    const query = "UPDATE homepage.register set name=$1, contact=$2, job=$3, option=$4, generation=$5, subject=$6, duration=$7, memo=$8 WHERE seq = $9;";
    const values = [
        nameValue, contactValue, jobValue, optionValue, generationValue, subjectValue, durationValue, memoValue, seqValue
    ];

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