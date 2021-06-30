const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/users.controller');
const authenticateToken = require('../middlewares/authenticateToken');
const { route } = require('./upload.route');

// router.get('/get',usercontroller.get);
// router.post('/post',usercontroller.post);
router.get('/',usercontroller.get);
router.post('/',usercontroller.post);
router.post('/login', usercontroller.login);
router.get('/generateSecretKey',usercontroller.generateSecretKey);
router.get('/fakeLogin',usercontroller.fakeLogin);
router.get('/async_await',authenticateToken,usercontroller.async_await);
router.get('/Test', usercontroller.Test);

module.exports = router;