const router = require('express').Router();
const jwt = require('jsonwebtoken');
const dbControl = require("../module/dbControl")
require('dotenv').config()

// Insert register api
router.post('/', async (req, res) => {

    // request AJAX data
    let idValue = req.body.idValue
    let pwValue = req.body.pwValue

    // JWT Secret Key
    const secretKey = process.env.SECRET_KEY

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

    // JWT Secret Key
    const secretKey = process.env.SECRET_KEY

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
    } finally {
        res.send(result);
    }
});

module.exports = router;