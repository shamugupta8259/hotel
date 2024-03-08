const express = require('express')
const router = express.Router()

const {welcomePage, aboutPage} = require('../controllers/home_controller')
router.route('/').get(welcomePage)
router.route('/about').get(aboutPage)

module.exports = router