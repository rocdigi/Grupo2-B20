const bcrypt = require('bcryptjs');
const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Person = require('../models/person');


//const personGet = async (req,res)=>{
 //   const {limit =5, page= 1 }= req.query;
  //  const query = {status:true}
  //  const skip = limit* (page -1);
  //  const persons = await Person.find(query)
  //                          .skip(skip).
  //                          limit(limit)

  //  const totalPersons = await Person.countDocuments(query);
 //res.json({
 //   persons,
   // totalPersons})
 //}

   const personGet = async (req, res) => {
      const { limit = 5, page = 1 } = req.query;
      const query = { estado: true }
      const skip = limit * (page - 1);

   const [ persons, totalPersons ] = await Promise.all([
                                    Person.find(query)
                                        .skip(Number(skip))
                                        .limit(limit),
                                    Person.countDocuments(query)
                                ])

    res.json({
        persons,
        totalPersons
    })
   }

const personOneGet= async (req, res) => {
    const {id}= req.params;
    const {_id, ...data} = req.body;
    const person = await Person.findById(id);
     
                           
    res.json({person});
}
 
 const personLogin = async (req = request, res = response) => {
   const { email, clave } = req.body;
   try{
      
      const person = await Person.findOne({ email });      
      if(!person){
          return res.status(400).json({ msg: "Email o contraseña erronea", field: "email" })
      }

      if(!person.estado){
          return res.status(400).json({ msg: "Cuenta inactiva comuniquese con atención al cliente" })
      }
      const validatePassword = bcrypt.compareSync(clave, person.clave);
      
      if(!validatePassword){
          return res.status(400).json({ msg: "Email o contraseña erronea", field: "password" })
      }
      
      const token = jwt.sign(person.toJSON(), process.env.SECRECTKEY, {
          expiresIn: "10h"
          
      })
     
      res.json({
          person,
          token
      })

  }
  catch(err){
      res.status(500).json({
          msg: "Contactese con el administrador"
      })
  }

}

 const personPost  = async (req,res) => {
        
    const {nombre, email, clave, estado, rol} = req.body 
   
    const person = new Person({nombre, email, clave, estado, rol});

    const salt = bcrypt.genSaltSync();
    person.clave = bcrypt.hashSync(clave, salt);

    await person.save();

    res.json({person});

   }



 const personPut = async (req,res) => {
    const {id}= req.params;
    const {_id, clave, ...data} = req.body;
    if(clave){
        const salt = bcrypt.genSaltSync();
        data.clave = bcrypt.hashSync(clave, salt);
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
   personLogin,
   personPut,
   personDel,
   personOneGet,
   personGet
 }