const { Schema, model, Mongoose } = require('mongoose');

const QuestionSchema =  Schema({
    titulo:{
        type: String,
        required: [true, 'Error db: El titulo de la pregunta es requerido']
    },
    descripcion: {
        type: String,
        required: [true, 'Er ror db: la descripcion de Pregunta es requerido'],        
    },
    fecha: {
        type: Date,
        default: Date.now()
    },
    estado: {
        type: Boolean,
        required: [true, 'Error db: El estado de pregunta es requerido'],
        default: true
    },
    tipoPregunta:{
        type: String,
        required: [true, 'Error db: El tipo de pregunta es requerido']
    }
   
});

QuestionSchema.methods.toJSON = function(){
    const { _id,  ...question } = this.toObject();
    question.questionId = _id;   
    return question;
}

module.exports = model('Question', QuestionSchema)