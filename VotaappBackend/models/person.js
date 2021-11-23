const { Schema, model, Mongoose } = require('mongoose');

const PersonSchema =  Schema({
    nombre:{
        type: String,
        required: [true, 'Error db: El nombre de a persona  es requerido']
    },
    email: {
        type: String,
        required: [true, 'Error db: El email de usuario es requerido'],
        unique: true
    },
    clave: {
        type: String,
        required: [true, 'Error db: El contraseña de usuario es requerido']
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    },
    rol:{
        type: String,
        required: true
    },
    vote:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Vote'
        }
    ]
});

PersonSchema.methods.toJSON = function(){
    const { _id, __v, clave, ...data } = this.toObject();
    data.personId = _id;
    return data;
}

module.exports = model('Person', PersonSchema)