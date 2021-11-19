const { comprobarJWT } = require('../helpers/jwt.js');
const {io} = require('../index.js');
const {usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controllers/socket');

//Mensajes de sockets "on"(escuchar), "emit"(transmitir/hablar)
io.on('connection', client => {
    console.log("Cliente Conectado");
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    //verificar autenticacion
    if(valido!=true){
        return client.disconnect();
    }

    //cliente autenticado
    usuarioConectado(uid);

    //ingresar al usuario en una sala en particular, utilizamos el uid como identificador unico
    client.join(uid);

    //escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', async (payload) => { 
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', payload);
     });

    client.on('disconnect', () => { 
        console.log("Cliente Desconectado");
        usuarioDesconectado(uid);
     });
     
});
