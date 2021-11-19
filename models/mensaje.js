const {Schema, model} = require('mongoose');

const MensajeSchema = Schema({
    de: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,        
    },
    para: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,   
    },
    mensaje: {
        type: String,
        required: true,   
    },
},{
    timestamps:true
});

//sobrescribiendo el metodo
MensajeSchema.method('toJSON', function(){
    const { __v, _id, ...object}//excluyo las primeras 3 propiedas y ...(lo restante) lo inserto en object
                                         = this.toObject();
    return object;
});

//para importar es necesario exportar explicitamente
module.exports = model('Mensaje',MensajeSchema);
