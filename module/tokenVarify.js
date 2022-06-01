const jwt = require('jsonwebtoken');

const tokenVerify = (jwtToken) => {

    // JWT Secret Key
    const secretKey = process.env.SECRET_KEY
    
    // JWT Token
    let token = ""
    if (typeof jwtToken === "string") {
        token = jwtToken
    } else {
        token = ""
    }
    console.log("token", token)

    // Init response data
    const result = {
        "success": false,
        "message": null
    }

    try {
        jwt.verify(token, secretKey)
        result.success = true;
        result.message = "TokenVerifySuccess"
    } catch (err) {
        if (err.name == "TokenExpiredError") {
            result.message = "TokenExpiredError"
            console.log("TokenExpiredError: ", err);
        } else {
            result.message = "InvalidToken"
            console.log("InvalidToken: ", err);
        }
    } finally {
        return result.success
    }
}

module.exports = tokenVerify