const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const itens = require('../service/itens');

router.get('/', itens.getAllItens);

router.post('/', itens.postAllItens);

router.get('/:id_produtos', itens.getItem);

router.put('/:id_produtos', itens.putItem);

router.delete('/:id_produtos', itens.deleteAllItens);

module.exports = router;