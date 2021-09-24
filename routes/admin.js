var express = require('express');
var router = express.Router();
const rootUserAuth = require('../controllers/adminAuthController'); 

/* GET users listing. */
router.post('/login',rootUserAuth.rootLogin);


module.exports = router;
