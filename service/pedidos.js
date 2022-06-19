const mysql = require('../mysql').pool

//retorna todos os pedidos
exports.getAllPedidos = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM pedidos',
            (error, resultado, fields) => {
                conn.release();
                if (error) {
                    res.status(500).send({
                        error: error,
                        response: null
                    });
                };
                return res.status(200).send({ response: resultado })
            }
        )
    })
};

//insere um pedido
exports.postAllPedidos = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO pedidos (entrega) VALUES (?)', [req.body.entrega],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    console.log(error);
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                };
                res.status(201).send({
                    mensagem: 'Pedido inserido com sucesso',
                    id_pedidos: resultado,
                })
            }
        )
    })
}

// retorna um pedido específico
exports.getPedido = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM pedidos WHERE id = ?;', [req.params.id_pedidos],
            (error, resultado, fields) => {
                conn.release();
                if (error) {
                    res.status(500).send({
                        error: error,
                        response: null
                    });
                };
                return res.status(200).send({ response: resultado })
            }
        )
    })
};
//rota atualizar um pedido
exports.putPedido = (req, res, next) => {
        mysql.getConnection((error, conn) => {
            if (error) { return res.status(500).send({ error: error }) }
            conn.query(
                'UPDATE pedidos SET entrega = ? WHERE id = ?', [req.body.entrega, req.params.id_pedidos],
                (error, resultado, field) => {
                    conn.release();
                    if (error) {
                        console.log(error);
                        return res.status(500).send({
                            error: error,
                            response: null
                        });
                    };
                    res.status(201).send({
                        mensagem: 'Pedido atualizado com sucesso',
                        id_pedidos: resultado,
                    })
                }
            )
        })
    }
    //rota deletar um pedido
exports.deleteAllPedidos = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'DELETE FROM pedidos WHERE id = ?', [req.params.id_pedidos],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    console.log(error);
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                };
                res.status(202).send({
                    mensagem: 'Pedido deletado com sucesso'
                })
            }
        )
    })
}