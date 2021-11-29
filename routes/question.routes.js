const  { Router } = require ('express');
const { ckeck, check } = require('express-validator');

const { questionByIDExists } = require('../helpers/req-validation')
const { validateData } = require('../middlewars')

const router = Router(); 

const { 
        questionPost, 
        questionPut,
        questionDel,
        questionQuery,
        questionGet      
      } = require('../controllers/questions.controller');
  
  router.get('/', questionGet)

  router.get('/:id', questionQuery)
  
  router.post('/'   ,[   
    check('titulo', 'El  titulo es requerido').not().isEmpty(),
    //check('fecha', 'La fecha cno es cirrecta').isDate,      
    check('tipoPregunta').isIn(['Seleccion Multiple', 'True or False'])
     //validateData
   ] , questionPost);

    router.put('/:id',[
      
    check('titulo', 'El  tintulo es requerido').not().isEmpty(),
    check('tipoPregunta').isIn(['Seleccion Multiple', 'True or False', 'Quiz']),
    check('id', 'No es un ID valido').isMongoId(),
    check('id', 'No esun ID valido').custom(questionByIDExists),
      
     validateData 
       
  ], questionPut);
  

  router.delete('/:id'
  , questionDel);    

  module.exports = router;