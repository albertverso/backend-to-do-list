const verificando = (req, res) => {
    return res.status(200).json({message: 'API funcionando corretamente'});
  }

module.exports = verificando