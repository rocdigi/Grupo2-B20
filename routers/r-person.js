const  { Router } = require ('express');
const { ckeck, check } = require('express-validator');

const { emailExits, personByIDExists  } = require('../helpers/req-validation')
const { validateData } = require('../middlewars')

const router = Router(); 

const { 
        personPost, 
        personPut,
        personGet,
        personDel        
      } = require('../controllers/c-persons');
  
  router.get('/', personGet)
  
  router.post('/',[
        check('nombre', 'El  nombre es requerido').not().isEmpty(),
        check('clave', 'la Contraseña no debe tener menos de 6 digiyod').isLength({min:5}),
        check('email', 'El correo').isEmail(),
        check('email').custom(emailExits),
        check('rol').isIn(['Admin', 'Votante']),
        validateData 
         
    ], personPost);

    router.put('/:id',[
      
      check('nombre', 'El  nombre es requerido').not().isEmpty(),
      check('email', 'El correo').isEmail(),
      check('email').custom(emailExits),
      check('id', 'No es un ID valido').isMongoId(),
      check('id', 'No esun ID valido').custom(personByIDExists),
      check('rol').isIn(['Admin',  'Votante']),
     validateData 
       
  ], personPut);
  

  router.delete('/:id'
  , personDel);    

  module.exports = router;