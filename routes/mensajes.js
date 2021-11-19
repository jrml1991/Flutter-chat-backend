/*
    Path: /api/mensajes
*/

const {Router}= require('express');
const { obtenerChat } = require('../controllers/mensajes');
const { getUsuarios } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar_jwt');

const router = Router();


//validarJWT
router.get('/:de',validarJWT, obtenerChat);


module.exports = router;
