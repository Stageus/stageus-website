const router = require('express').Router();
const { Client } = require('pg');

// Insert register api
router.post('/', (req, res) => {

    console.log("api call");

    // request AJAX data
    let idValue = req.body.idValue;
    let pwValue = req.body.pwValue;

    // Init response data
    const result = {
        "success": false,
    }

    if (idValue == "stageus" && pwValue == "1234") {
        //result.success = true;
        res.send(result);
    } else {
        //result.success = true;
        res.send(result);
    }
});

router.get('/', (req, res) => {

    console.log("get api call");

    // Init response data
    const result = {
        "data": null
    }

    // Init psql account
    const pg = new Client({
        user: "ubuntu",
        host: "localhost",
        database: "stageus",
        password: "stageus0104",
        prot: 5432
    })
    const query = "select * from homepage.account;";

    pg.connect((err) => {

        if (err) {
            console.log(err);
        }
    });
    pg.query(query, (err, res2) => {

        if (!err) {
            const rowList = res2.rows;
            result.data = rowList;
            res.send(result);
        } else {
            console.log(err);
        }
        pg.end();
    })
});

module.exports = router;