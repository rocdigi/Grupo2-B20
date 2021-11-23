const { Schema, model, Mongoose } = require('mongoose');

const AnswerSchema =  Schema({
    respuesta:{
        type: String,
        required: [true, 'Error db: la Respuesta seleccionada es requerido']
    },
    seleccion: {
        type: Boolean,
        required: [true, 'Error db: el valor de la Respuesta seleccionada es requerido'],
        unique: true
    },
    opAnswer: {
        type: Schema.Types.ObjectId,
        ref: 'OpAnswer'
    }  
});

AnswerSchema.methods.toJSON = function(){
    const { _id, __v, ...answer } = this.toObject();
    answer.answerId = _id;
    return answer;
}

module.exports = model('Answer', AnswerSchema)