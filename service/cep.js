const axios = require('axios');
exports.getCep = async(req, res, next) => {

    axios.get(`https://viacep.com.br/ws/${req.params.cep}/json/`)
        .then(response => res.status(200).send({ response: response.data }))
        .catch(error => {
            console.log(error)
            res.status(500).send({
                error: error,
                response: null
            });
        })

};