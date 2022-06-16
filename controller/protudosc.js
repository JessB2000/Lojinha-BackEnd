const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const produtos = require('../service/produtos');

router.get('/', produtos.getAllProdutos);

router.post('/', produtos.postAllProdutos);

router.get('/:id_produtos', produtos.getProduto);

router.put('/:id_produtos', produtos.putProduto);

router.delete('/', produtos.deleteAllProdutos);

module.exports = router;