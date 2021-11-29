const { Schema, model, Mongoose } = require('mongoose');

const OpAnswerSchema =  Schema({
    descripcion:{
        type: String,
        required: [true, 'Error db: la descripcion de las respuestas es requerido']
    },
    pregunta: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    estado:{
        type: Boolean,
        
    }
    
});

OpAnswerSchema.methods.toJSON = function(){
    const { _id, __v, ...opAnswer } = this.toObject();
    opAnswer.opAnswerId = _id;
    return opAnswer;
}

module.exports = model('OpAnswer', OpAnswerSchema)