const router = require('express').Router();
const dbControl = require("../module/dbControl")

router.get('/', async (req, res) => {

    const queryResult = await dbControl(
        "select * from homepage.register ORDER BY seq DESC",
        []
    )

    const rowList = queryResult.list
    const list = []
     
    rowList.forEach((elem, index) => {
        list.push([
            elem.name, elem.contact, elem.job, elem.option, elem.generation,
            elem.subject, elem.duration, elem.register_date, elem.memo, elem.seq
        ])
    })
    queryResult.list = list

    res.send(queryResult);
});

router.post('/', async (req, res) => {

    // request AJAX data
    const nameValue = req.body.nameValue
    const contactValue = req.body.contactValue
    const jobValue = req.body.jobValue
    const optionValue = req.body.optionValue
    const subjectValue = req.body.subjectValue
    const generationValue = req.body.generationValue   // 나중에 DB에서 가져오는 걸로 변경 요망 (Javascript Injection)
    const durationValue = req.body.durationValue   // 나중에 DB에서 가져오는 걸로 변경 요망 (Javascript Injection)

    // Cal timestamp
    const today = new Date()
    const utc = today.getTime() + (today.getTimezoneOffset() * 60 * 1000)
    const krTime = 9 * 60 * 60 * 1000
    const newTime = new Date(utc + krTime)

    // 강제로 빈 값을 입력했을 때 예외 처리
    if (nameValue == "" || contactValue == "" || jobValue == "" || optionValue == "" || subjectValue == "") {
        console.log("EmptyValueError: ", err)
    } else {
        const queryResult = await dbControl(
            "INSERT INTO homepage.register(name, contact, job, option, register_date, generation, duration, memo, subject) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)",
            [nameValue, contactValue, jobValue, optionValue, newTime.toISOString(), generationValue, durationValue, "", subjectValue]
        )

        res.send(queryResult)
    }
});

router.put('/', async (req, res) => {

    // Auth 예외 처리
    if (!req.session.user) res.redirect("/")

    // request AJAX data
    const nameValue = req.body.nameValue
    const contactValue = req.body.contactValue
    const jobValue = req.body.jobValue
    const optionValue = req.body.optionValue
    const subjectValue = req.body.subjectValue
    const generationValue = req.body.generationValue
    const durationValue = req.body.durationValue
    const memoValue = req.body.memoValue
    const seqValue = req.body.seqValue

    const queryResult = await dbControl(
        "UPDATE homepage.register set name=$1, contact=$2, job=$3, option=$4, generation=$5, subject=$6, duration=$7, memo=$8 WHERE seq = $9",
        [nameValue, contactValue, jobValue, optionValue, generationValue, subjectValue, durationValue, memoValue, seqValue]
    )

    res.send(queryResult)
});

router.delete('/', async (req, res) => {

    // Auth 예외 처리
    if (!req.session.user) res.redirect("/")

    // request AJAX data
    const seqValue = req.body.seqValue;

    const queryResult = await dbControl(
        "DELETE FROM homepage.register WHERE seq = $1",
        [seqValue]
    )

    res.send(queryResult)
});

module.exports = router;