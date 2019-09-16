const router = require('express').Router();
const handle = require('../handlers');
const authenticate = require('../middlewares/auth');

router.post('/addmessage',authenticate,handle.addmessage);
router.get('/getmessages',authenticate,handle.getmessages);

module.exports = router;