const { Schema, model } = require('mongoose');

const PersonSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Error db: El nombre de usuario es requerido']
    },
    email: {
        type: String,
        required: [true, 'Error db: El email de usuario es requerido'],
        unique: true
    },
    clave: {
        type: String,
        required: [true, 'Error db: La contraseña de usuario es requerida']
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    },
    rol: {
        type: String,
        required: true
    },
    vote: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Vote'
        }
    ]
});

PersonSchema.methods.toJSON = function () {
    const { _id, __v, password, ...Person } = this.toObject();
    Person.PersonId = _id;
    return Person;
}

module.exports = model('Person', PersonSchema)
