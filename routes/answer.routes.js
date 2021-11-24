/*const  { Router } = require ('express');
const { ckeck, check } = require('express-validator');

const {  answerByIDExists,  opAnswerByIDExists } = require('../helpers/req-validation')
const { validateData } = require('../middlewars')

const router = Router(); 

const { 
        answerPost, 
        answerPut,
        answerGet,
        answerDel    
      } = require('../controllers/c-answer');

  
  router.get('/', answerGet)
  
  router.post('/',[
        check('respuesta', 'La respuesta es requerido').not().isEmpty(),
        check('seleccion', 'La seleccion es requerido').not().isEmpty(),
        check('opAnswer', 'No es un ID valido de OpAnswer').custom(opAnswerByIDExists),
        validateData 
         
    ], answerPost);

    router.put('/:id',[
      
        check('respuesta', 'La respuesta es requerido').not().isEmpty(),
        check('seleccion', 'La seleccion es requerido').not().isEmpty(),
        check('opAnswer', 'No es un ID valido de OpAnswer').custom(opAnswerByIDExists),
        check('id', 'No es un ID valido').isMongoId(),
        check('id', 'No esun ID valido').custom(answerByIDExists),     
      validateData 
       
  ], answerPut);
  
  
  router.delete('/:id'
  , answerDel);    

  module.exports = router;*/
