
const OpAnswer = require('../models/opAnswer');
const Question = require('../models/question');

const opAnswerGet = async (req,res)=>{
    const {_id, ...data} = req.body;
     const opAnswers = await OpAnswer.findById('_id');
                           
     res.json({opAnswers});
 }
 
 const opAnswerPost  = async (req,res) => {
        
    const {descripcion, pregunta} = req.body 
    pregunta = await Question.findById(pregunta);

    if(!pregunta){
        return new Error ("Pregunta not found");
    }   
    const opAnswer = new OpAnswer({descripcion,pregunta});

    res.json({opAnswer});
 }

 const opAnswerPut = async (req,res) => {
    const {id}= req.params;
    const {_id, pregunta, ...data} = req.body;
    pregunta = await Question.findById(pregunta);

    if(!pregunta){
        return new Error ("Pregunta not found");
    }   
    data.pregunta = pregunta;
    const opAnswer = await opAnswer.findByIdAndUpdate(id, data,
       {
        new : true
       });
    res.json(opAnswer)
        
 }
 
 
 const opAnswerDel  = async (req,res) => {    
   const {id} = req.params
   //eliminacion fisica del resgitroo, se pierde integridad de los datos de la BD
    const opAnswers= await OpAnswer.findByIdAndDelete(id);
   //const opAnswers= await Person.findByIdAndUpdate(id, {status: false});
   res.json(opAnswers);
 }
 
 module.exports={     
     opAnswerPost,
     opAnswerPut,
     opAnswerDel,
     opAnswerGet
 }