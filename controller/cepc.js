const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const cep = require('../service/cep');

router.get('/:cep', cep.getCep);

module.exports = router;