const path = require('path');
const router = require('express').Router();
const { Client } = require('pg');

router.post('/', async (req, res) => {

    // request AJAX data
    const nameValue = req.body.nameValue;
    const contactValue = req.body.contactValue;
    const jobValue = req.body.jobValue;
    const optionValue = req.body.optionValue;
    const subjectValue = req.body.subjectValue;
    const generationValue = req.body.generationValue;   // 나중에 DB에서 가져오는 걸로 변경 요망 (Javascript Injection)
    const durationValue = req.body.durationValue;   // 나중에 DB에서 가져오는 걸로 변경 요망 (Javascript Injection)

    // Init response data
    const result = {
        "success" : false
    };

    // 강제로 빈 값을 입력했을 때 예외 처리
    if (nameValue == "" || contactValue == "" || jobValue == "" || optionValue == "" || subjectValue == "") {
        console.log("EmptyValueError: ", err);
    } else {

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

        const err = await pg.connect();
        if (err) {
            console.log("DBServerConnectionError: ", err);
        } else {
            const sql = "INSERT INTO homepage.register(name, contact, job, option, register_date, generation, duration, memo, subject) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);";
            const values = [
                nameValue, contactValue, jobValue, optionValue, newTime.toISOString(), 
                generationValue, durationValue, "", subjectValue
            ];

            let err2, res2 = await pg.query(sql, values);
            if (!err2) {
                result.success = true
            } else {
                console.log("SQLSyntaxError: ", err);
            }
            await pg.end();
        }
        await res.send(result);
    }
});

router.get('/', async (req, res) => {

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

    const err = await pg.connect();
    if (err) {
        console.log("DBServerConnectionError: ", err);
    } else {
        const sql = "select * from homepage.register ORDER BY seq DESC";
        
        let err2, res2 = await pg.query(sql);
        if (!err2) {

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
        } else {
            console.log("SQLSyntaxError: ", err);
        }
        await pg.end();
    }
    await res.send(result);
});

router.delete('/', async (req, res) => {

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

    const err = await pg.connect()
    if (err) {
        console.log("DBServerConnectionError: ", err);
    } else {
        const sql = "DELETE FROM homepage.register WHERE seq = $1;";
        const values = [seqValue];

        let err2, res2 = await pg.query(sql, values);
        if (!err2) {
            result.success = true
        } else {
            console.log("SQLSyntaxError: ", err);
        }
        await pg.end();
    }
    await res.send(result);
});

router.put('/', async (req, res) => {

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

    const err = await pg.connect();
    if (err) {
        console.log("DBServerConnectionError: ", err);
    } else {
        const sql = "UPDATE homepage.register set name=$1, contact=$2, job=$3, option=$4, generation=$5, subject=$6, duration=$7, memo=$8 WHERE seq = $9;";
        const values = [
            nameValue, contactValue, jobValue, optionValue, generationValue, subjectValue, durationValue, memoValue, seqValue
        ];

        let err2, res2 = await pg.query(sql, values);
        if (!err2) {
            result.success = true
        } else {
            console.log("SQLSyntaxError: ", err);
        }
        await pg.end();
    }
    await res.send(result);
});

module.exports = router;