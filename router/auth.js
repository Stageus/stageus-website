const secretKey = "THISISOURSTAGE-STAGEUS";
const router = require('express').Router();
const jwt = require('jsonwebtoken');

// Insert register api
router.post('/', (req, res) => {

    // request AJAX data
    let idValue = req.body.idValue;
    let pwValue = req.body.pwValue;

    // Init response data
    const result = {
        "success": true,
        "message": "",
        "token": null
    }

    if (idValue == "stageus" && pwValue == "stageus0104") {

        const jwtToken = jwt.sign(
            {
                id: idValue
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