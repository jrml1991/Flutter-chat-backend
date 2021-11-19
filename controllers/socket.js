const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');

const usuarioConectado = async (uid='')=> {
    const usuario = await Usuario.findById(uid);
    usuario.online = true;

    //gravamos en la base de Datos
    await usuario.save();

    return usuario;
}

const usuarioDesconectado = async (uid='')=> {
    const usuario = await Usuario.findById(uid);
    usuario.online = false;

    //gravamos en la base de Datos
    await usuario.save();

    return usuario;
}

const grabarMensaje = async (payload)=> {
    /*
        payload{
            de:'',
            para:'',
            texto:''
        }
    */
    try {
        const mensaje = new Mensaje(payload);
        await mensaje.save();

        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}