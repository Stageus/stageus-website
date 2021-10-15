const path = require('path');
const router = require('express').Router();
const { Client } = require('pg');

// Insert register api
router.post('', (req, res) => {

    // request AJAX data
    let idValue = req.body.idValue;
    let pwValue = req.body.pwValue;

    console.log(idValue);
    console.log(pwValue);


    // Init response data
    const result = {
        "success" : false
    };

    if (idValue == "stageus" && pwValue == "stageus0104") {
        result.success = true;
    }

    res.send(result);
});

module.exports = router;