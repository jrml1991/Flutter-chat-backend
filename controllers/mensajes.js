const Mensaje = require('../models/mensaje');

const obtenerChat = async (req, resp)=>{
    const miId = req.uid;
    const mensajesDe = req.params.de;  

    const last30 = await Mensaje.find({
        $or: [{de: miId, para: mensajesDe},
            {de: mensajesDe, para: miId}
            ]
    })
    .sort({createdAt: 'desc'})
    .limit(30)
    ;

    console.log('desde last30');

    resp.json({
        ok:true,
        mensajes: last30
    });
  
}

module.exports = {
    obtenerChat
}  