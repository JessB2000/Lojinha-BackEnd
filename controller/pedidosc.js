const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const pedidos = require('../service/pedidos');

router.get('/', pedidos.getAllPedidos);

router.post('/', pedidos.postAllPedidos);

router.get('/:id_pedidos', pedidos.getPedido);

router.put('/:id_pedidos', pedidos.putPedido);

router.delete('/:id_pedidos', pedidos.deleteAllPedidos);

module.exports = router;