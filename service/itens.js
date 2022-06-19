const mysql = require('../mysql').pool

//retorna todos os itens
exports.getAllItens = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `SELECT prd.id, i.quantidade, prd.preco, prd.url, prd.titulo, prd.cor, prd.marca
             FROM items_pedidos i 
             join produtos prd on i.id_produtos=prd.id
             WHERE i.id_pedidos=1`,
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

//insere um item
exports.postAllItens = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO items_pedidos (id_pedidos, id_produtos, quantidade) VALUES (?,?,?)', [1, req.body.id_produtos, req.body.quantidade],
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
                    mensagem: 'Item inserido com sucesso',
                    id_pedidos: resultado,
                })
            }
        )
    })
}

// retorna um item específico
exports.getItem = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM items_pedidos WHERE id_pedidos = ? AND id_produtos;', [1, req.params.id_produtos],
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
//rota atualizar um item
exports.putItem = (req, res, next) => {
        mysql.getConnection((error, conn) => {
            if (error) { return res.status(500).send({ error: error }) }
            conn.query(
                'UPDATE items_pedidos SET quantidade = ? WHERE id_pedidos = ? AND id_produtos = ?', [req.body.quantidade, 1, req.params.id_produtos],
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
                        mensagem: 'Item atualizado com sucesso',
                        id_pedidos: resultado,
                    })
                }
            )
        })
    }
    //rota deletar um item
exports.deleteAllItens = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'DELETE FROM items_pedidos WHERE id_pedidos = ? AND id_produtos = ?', [1, req.params.id_produtos],
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
                    mensagem: 'Item deletado com sucesso'
                })
            }
        )
    })
}