const Person = require('../models/person');
const Answer = require('../models/answer');
const OpAnswer = require('../models/opAnswer');
const Question = require('../models/question');
const Vote = require('../models/vote');




const emailExits = async (email = '') => {
    const person = await Person.findOne({email});
    if(person){
        throw new Error(`Este Correo ${email} ya esta registrado`);
        
    }
}

const personByIDExists = async (_id = '') => {
    const person = await Person.findOne({_id});
    if(!person){
        throw new Error(`Este id ${_id} de Person no existe`);
        
    }
}
const answerByIDExists = async (_id = '') => {
    const answer = await Answer.findOne({_id});
    if(!answer){
        throw new Error(`Este id ${_id} de Answer de no existe`);
        
    }
}

const opAnswerByIDExists = async (_id = '') => {
    const opAnswer = await OpAnswer.findOne({_id});
    if(!opAnswer){
        throw new Error(`Este id ${_id} de Opciones de Answer  no existe`);
        
    }
}
const questionByIDExists = async (_id = '') => {
    const question = await Question.findOne({_id});
    if(!question){
        throw new Error(`Este id ${_id} de question  no existe`);
        
    }
}

const voteByIDExists = async (_id = '') => {
    const vote = await Vote.findOne({_id});
    if(!vote){
        throw new Error(`Este id ${_id} de Vote  no existe`);
        
    }
}

module.exports = {
    emailExits,
    personByIDExists,
    answerByIDExists,
    opAnswerByIDExists,
    questionByIDExists,
    voteByIDExists
}