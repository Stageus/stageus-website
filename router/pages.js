const router = require('express').Router()
const path = require('path');
const tokenVerify = require("../module/tokenVarify")

// Main Page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})

// "교육" Page
router.get('/education', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/file/education.pdf'))
})

// "커리큘럼" Page
router.get('/curriculum', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/file/curriculum.pdf'))
})

// "FAQ" Page
router.get('/faq', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/faq.html'))
})

// "설치 가이드" Page
router.get('/guide', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/guide.html'))
})

// "환불 약관" Page
router.get('/refund', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/refund.html'))
})

// "팀원 신청서" Page
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/register.html'))
})

// "관리자" Page
router.get('/management', (req, res) => {

    if(req.session.user) {
        console.log(req.sessionID)
        res.sendFile(path.join(__dirname, '../html/management.html'))
    } else {
        res.redirect("/")
    }
})

module.exports = router