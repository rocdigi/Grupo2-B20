const  { Router } = require ('express');
const { ckeck, check } = require('express-validator');

const {  answerByIDExists,  opAnswerByIDExists } = require('../helpers/req-validation')
const { validateData } = require('../middlewars')

const router = Router(); 

const { 
        opAnswerPost,
        opAnswerPut,
        opAnswerDel,
        opAnswerGet    
      } = require('../controllers/c-opAnswers');
 
  
  router.get('/', opAnswerGet)
  
  router.post('/',[
        check('descripcion', 'La descripcion de la respuesta es requerido').not().isEmpty(),
        check('pregunta', 'No es un ID valido de la pregunta').isMongoId(),
        check('pregunta', 'No es un ID valido de Pregunta').custom(answerByIDExists),     
        validateData 
         
    ], opAnswerPost);

    router.put('/:id',[
      
        check('descripcion', 'La descripcion de la respuesta es requerido').not().isEmpty(),
        check('pregunta', 'No es un ID valido de la pregunta').isMongoId(),
        check('pregunta', 'No es un ID valido de Pregunta').custom(answerByIDExists),   
        check('id', 'No es un ID valido').isMongoId(),
        check('id', 'No es un ID valido').custom(opAnswerByIDExists),     
      validateData 
       
  ], opAnswerPut);
  
  
  router.delete('/:id'
        ,opAnswerDel );    

  module.exports = router;
