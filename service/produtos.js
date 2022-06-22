const mysql = require('../mysql').pool

//retorna todos os produtos
exports.getAllProdutos = (req, res, next) => {
    var pesquisa = ''
    if (req.query.pesquisa)
        pesquisa = req.query.pesquisa;

    var limite = 10
    if (req.query.limit)
        limite = parseInt(req.query.limit);

    var offset = 0;
    if (req.query.page) {
        const page = parseInt(req.query.page);
        offset = (page * limite) - limite;
    }

    // fim primeira parte da paginação 
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `SELECT * FROM produtos
             WHERE titulo LIKE ?
             LIMIT ? OFFSET ?`, ['%' + pesquisa + '%', limite, offset],
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

//insere um produto
exports.postAllProdutos = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO produtos (preco, url, titulo, descricao, marca, cor, categoria, subcategoria) VALUES (?,?,?,?,?,?,?,?)', [req.body.preco, req.body.url, req.body.titulo, req.body.descricao, req.body.marca, req.body.cor, req.body.categoria, req.body.subcategoria],
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
                    mensagem: 'Produto inserido com sucesso',
                    id_produto: resultado,
                })
            }
        )
    })
}

// retorna um produto específico
exports.getProduto = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM produtos WHERE id = ?;', [req.params.id_produtos],
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
//rota atualizar um produto
exports.putProduto = (req, res, next) => {
        mysql.getConnection((error, conn) => {
            if (error) { return res.status(500).send({ error: error }) }
            conn.query(
                'UPDATE produtos SET url = ?, titulo = ? , descricao = ?, marca = ?, cor = ?, categoria = ?, subcategoria = ?, preco = ? WHERE id = ?', [req.body.url, req.body.titulo, req.body.descricao, req.body.marca, req.body.cor, req.body.categoria, req.body.subcategoria, req.body.preco, req.params.id_produtos],
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
                        mensagem: 'Produto atualizado com sucesso',
                        id_produto: resultado,
                    })
                }
            )
        })
    }
    //rota deletar um produto
exports.deleteAllProdutos = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'DELETE FROM produtos WHERE id = ?', [req.params.id_produtos],
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
                    mensagem: 'Produto deletado com sucesso'
                })
            }
        )
    })
}