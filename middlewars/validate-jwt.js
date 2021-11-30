const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Person = require('../models/person');

const valideJWT = async (req = request, res = response, next) => {
    const token = req.header("token-b20");
console.log('TOKEN' + token)
    if(!token){
        return res.status(401).json({
            msg: "Se requiere autenticación"
        })
    }

    try{
        const { personId } = jwt.verify(token, process.env.SECRECTKEY);

        const person = await Person.findById(personId);
        //console.log("valido token" + person);
        if(!person){
            return res.status(401).json({
                msg: "El token no es valido - Id no valido"
            })
        }
        if(!person.estado){
            return res.status(401).json({
                msg: "El token no es valido - User no activo"
            })
        }

        req.person = person;
        next();
    }
    catch(err){
        res.status(401).json({ msg: "El token no es valido" });
    }
}

module.exports = {
    valideJWT
}