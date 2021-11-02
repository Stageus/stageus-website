const secretKey = "THISISOURSTAGE-STAGEUS";
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { Client } = require('pg');

// Insert register api
router.post('/', (req, res) => {

    // request AJAX data
    let idValue = req.body.idValue;
    let pwValue = req.body.pwValue;

    // Init response data
    const result = {
        "success": false,
        "message": "",
        "token": null
    }

    // Init psql account
    const pg = new Client({
        user: "ubuntu",
        host: "localhost",
        database: "stageus",
        password: "stageus0104",
        prot: 5432
    })
    const query = "select * from homepage.account WHERE id=$1 and pw=$2;";
    const values = [idValue, pwValue];

    pg.connect((err) => {

        if (err) {
            console.log(err);
        }
    });
    pg.query(query, values, (err, res2) => {

        if (!err) {

            const rowList = res2.rows;

            if (rowList.length > 0) {
                const jwtToken = jwt.sign(
                    {
                        id: idValue,
                        role: rowList[0].role,
                        name: rowList[0].name
                    }, 
                    secretKey,
                    {
                        expiresIn: "30d",
                        issuer: "stageus"
                    }
                )
                result.success = true;
                result.token = jwtToken;
            } else {
                result.message = "회원 정보가 잘못되었습니다."
            }

            res.send(result);

        } else {
            console.log(err);
        }
        pg.end();
    })
});

// Insert register api
router.post('/varify', (req, res) => {

    // Init response data
    const result = {
        "success" : false,
        "message": ""
    };

    try {
        req.decoded = jwt.verify(req.headers.auth, secretKey);
        result.success = true;
    }
    catch(error) {
        if (error.name == "TokenExpiredError") {
            result.message = "만료된 로그인 토큰 입니다."
        } else {
            result.message = "유효하지 않은 로그인 토큰 입니다."
        }
    }
    res.send(result);
});

module.exports = router;