const router = require('express').Router();
const dbControl = require("../module/dbControl")
require('dotenv').config()

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

        req.session.user = {
            id: idValue,
            role: queryResult.list[0].role,
            name: queryResult.list[0].name
        }
  
        result.success = queryResult.success;
        result.message = queryResult.message;
    } 
    else {
        result.message = "로그인 정보가 올바르지 않습니다."
    }
            
    res.send(result);
});

router.post("/logout", async (req, res) => {

    req.session.destroy(() => {
        res.redirect('/');
    });
})

module.exports = router;