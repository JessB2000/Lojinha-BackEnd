const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const produtos = require('../service/produtos');

router.get('/', produtos.getAllProdutos);

router.post('/', produtos.postAllProdutos);

router.get('/total', produtos.getTotal);

router.get('/:id_produtos', produtos.getProduto);

router.put('/:id_produtos', produtos.putProduto);

router.delete('/:id_produtos', produtos.deleteAllProdutos);

module.exports = router;