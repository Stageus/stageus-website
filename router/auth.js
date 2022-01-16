const secretKey = "THISISOURSTAGE-STAGEUS";
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { Client } = require('pg');

// Insert register api
router.post('/', async (req, res) => {

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
    const err = await pg.connect()

    if (err) {
        console.log("DBServerConnectionError: ", err);
        result.message = "데이터베이스 서버와의 연결에 문제가 있습니다."
    } else {
        const sql = "select * from homepage.account WHERE id=$1 and pw=$2;";
        const values = [idValue, pwValue];
        let err2, res2 = await pg.query(sql, values);

        if (!err2) {
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
        } else {
            console.log("SQLSyntaxError: ", err);
            result.message = "데이터베이스 서버와의 통신 과정 중에 오류가 발생했습니다."
        }
        await pg.end();
    }
    await res.send(result);
});

// Insert register api
router.post('/varify', (req, res) => {

    // Init response data
    const result = {
        "success" : false,
        "message": ""
    };

    try {
        jwt.verify(req.headers.auth, secretKey);
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