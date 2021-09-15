var express = require('express');
var router = express.Router();

const user = require('../controllers/v1/user');

router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});

router.get('/v1/user', user.list);
router.get('/v1/user/:id', user.getById);
router.post('/v1/user', user.store);
router.put('/v1/user/:id', user.update);
router.delete('/v1/user/:id', user.deletes);

module.exports = router;