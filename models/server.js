const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {
    
    constructor(){
        this.app = express();
        this.port = 3000;
        this.personsPath = '/api/persons';
        this.questionsPath = '/api/questions';
        //this.answersPath = '/api/answers';
       // this.votesPath = '/api/votes';
        this.opAnswersPath = '/api/opAnswers';

        this.initDB();
        this.middlewares();
        this.routers(); 
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

    routers(){
        this.app.use(this.personsPath, require('../routers/r-person'));
        this.app.use(this.questionsPath, require('../routers/r-question'));
        //this.app.use(this.answersPath, require('../routers/r-answer'));
       // this.app.use(this.votesPath, require('../routers/r-vote'));
        this.app.use(this.opAnswersPath, require('../routers/r-opAnswer'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${ this.port }`)
          })
    }
}

module.exports = Server