const Question = require('../models/question');

const questionGet = async (req,res)=>{
    const {_id, ...data} = req.body;
     const questions = await Question.find();
                           
     res.json({questions});
 }

 const questionQuery = async (req,res)=>{
   const {id}= req.params;
   const {_id, ...data} = req.body;
    const question = await Question.findById(id);
    
                          
    res.json({question});
}
 
 
 const questionPost  = async (req,res) => {
         
    const {titulo, descripcion, fecha, estado, tipoPregunta} = req.body 
    
    const question = new Question({titulo, descripcion, fecha, estado, tipoPregunta});

    await question.save();
    res.json({question});
 }

 const questionPut = async (req,res) => {
    const {id}= req.params;
    const {_id, ...data} = req.body;
   
    const question = await Question.findByIdAndUpdate(id, data,
       {
        new : true
       });
       
    res.json(question)
        
 }
 
 
 const questionDel  = async (req,res) => {    
   const {id} = req.params
   //eliminacion fisica del resgitroo, se pierde integridad de los datos de la BD
   // const question= await Question.findByIdAndDelete(id);
   const question= await Question.findByIdAndUpdate(id, {estado: false});
   res.json(question);
 }
 
 module.exports={     
    questionPost,
    questionPut,
    questionDel,
    questionQuery,
    questionGet
 }