const {Schema, model, Mongoose } = require('mongoose');

const AnswerSchema = Schema({
    respuesta:{
        type: String,
        required: [true, "Error db: la Respuesta seleccionada es requerida"]
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

AnswerSchema.methods.toJSNON = function(){
    const { _id, _v, ...answer } = this.Object();
    answer.answerId = _id;
    return answer;
}

module.exports = model('Answer', AnswerSchema)