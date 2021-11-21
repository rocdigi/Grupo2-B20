const { Schema, model, Mongoose } = require('mongoose');

const VoteSchema =  Schema({
    fechaVoto:{
        type: String,
        required: [true, 'Error db: El nombre de usuario es requerido']
    },
    horaVoto: {
        type: String,
        required: [true, 'Error db: El email de usuario es requerido'],
        unique: true
    },
    persona: {
        type: Schema.Types.ObjectId,
        ref: 'Person'
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }
});

VoteSchema.methods.toJSON = function(){
    const { _id, __v, ...vote } = this.toObject();
    vote.voteId = _id;
    return vote;
}

module.exports = model('Vote', VoteSchema)