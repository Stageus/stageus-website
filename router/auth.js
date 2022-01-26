const secretKey = "THISISOURSTAGE-STAGEUS";

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const pg = require('pg');

const dbControl = require("../module/dbControl")

// Insert register api
router.post('/', async (req, res) => {

    // request AJAX data
    let idValue = req.body.idValue
    let pwValue = req.body.pwValue

    const queryResult = await dbControl(
        "select * from homepage.account WHERE id=$1 and pw=$2",
        [idValue, pwValue]
    )

    // Init response data
    const result = {
        "success": false,
        "message": "",
        "token": null
    }

    if (queryResult.list.length > 0) {
        const jwtToken = jwt.sign(
            {
                id: idValue,
                role: queryResult.list[0].role,
                name: queryResult.list[0].name
            }, 
            secretKey,
            {
                expiresIn: "30d",
                issuer: "stageus"
            }
        )
        result.success = queryResult.success;
        result.message = queryResult.message;
        result.token = jwtToken;
    }
            
    res.send(result);
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
    } catch (err) {
        if (err.name == "TokenExpiredError") {
            result.message = "TokenExpiredError"
            console.log("TokenExpiredError: ", err);
        } else {
            result.message = "InvalidToken"
            console.log("InvalidToken: ", err);
        }
    }
    res.send(result);
});

module.exports = router;