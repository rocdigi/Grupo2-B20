const bcrypt = require('bcryptjs');
const Person = require('../models/person');

const personGet = async (req,res)=>{
    const {limit =5, page= 1 }= req.query;
    const query = {status:true}
    const skip = limit* (page -1);
    const persons = await Person.find(query)
                            .skip(skip).
                            limit(limit)

    const totalPersons = await Person.countDocuments(query);
 res.json({
    persons,
    totalPersons})
 }
 
 const personPost  = async (req,res) => {
        
    const {nombre, email, clave, estado, rol} = req.body 
   
    const person = new Person({nombre, email, clave, estado, rol});

    const salt = bcrypt.genSaltSync();
    person.password = bcrypt.hashSync(clave, salt);

    await person.save();

    res.json({person});
 }

 const personPut = async (req,res) => {
    const {id}= req.params;
    const {_id, clave, ...data} = req.body;
    if(clave){
        const salt = bcrypt.genSaltSync();
        data.password = bcrypt.hashSync(clave, salt);
    }

    const person = await Person.findByIdAndUpdate(id, data,
       {
        new : true
       });
    res.json(person)
        
 }
 
 
 const personDel  = async (req,res) => {    
   const {id} = req.params
   //eliminacion fisica del resgitroo, se pierde integridad de los datos de la BD
   // const user= await User.findByIdAndDelete(id);

   const persons= await Person.findByIdAndUpdate(id, {estado: false});
   res.json(persons);
 }
 
 module.exports={     
   personPost,
     personPut,
     personDel,
     personGet
 }