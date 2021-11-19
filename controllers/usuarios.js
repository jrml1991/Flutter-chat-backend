const { response } = require("express");
const Usuario = require('../models/usuario');

const getUsuarios = async (req, resp= response)=>{
    const desde = Number(req.query.desde)||0;  //implementa paginacion

    const usuarios = await Usuario
        .find({_id: {$ne: req.uid}})//ne = not exists, con esto quitamos el usuario que hace la peticion de la lista de usuarios
        .sort('-online')
        .skip(desde)
        .limit(20)
        ;

    resp.json({
        ok:true,
        usuarios
    });
}

module.exports = {
    getUsuarios
}  