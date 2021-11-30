const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.personsPath = '/api/persons';
        this.questionsPath = '/api/questions';
        //this.answersPath = '/api/answers';
       // this.votesPath = '/api/votes';
        this.opAnswersPath = '/api/opAnswers';

        this.initDB();
        this.middlewares();
        this.routes(); 
    }

    async initDB(){
        await dbConnection();
    }

    middlewares(){ 
        //Funciones intermedias que se ejecutan antes de llegar al controlador
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.static('public') );
    }

    routes(){
        this.app.use(this.personsPath, require('../routes/person.routes'));
        this.app.use(this.questionsPath, require('../routes/question.routes'));
        //this.app.use(this.answersPath, require('../routes/answer.routes'));
       // this.app.use(this.votesPath, require('../routes/vote.routes'));
        this.app.use(this.opAnswersPath, require('../routes/opAnswer.routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${ this.port }`)
          })
    }
}

module.exports = Server