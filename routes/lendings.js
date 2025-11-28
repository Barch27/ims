
const lendingController = require('../controllers/lendingController');


const express = require('express');

const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();


router.get('/', 
    authenticate, 
    authorize(['STORE_MANAGER','ADMIN']), 
    lendingController.getAllLendings);

router.post('/lend', 
    authenticate, 
    authorize(['STORE_MANAGER','ADMIN']), 
    lendingController.lend);


module.exports = router;
