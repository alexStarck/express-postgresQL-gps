const Router = require('express').Router;
const router = new Router()
const gpsController = require('../controller/gps.controller')


router.post('/gps/create', gpsController.createGpsByUser)
router.post('/gps/users', gpsController.getGpsByUser)


module.exports = router