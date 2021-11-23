const mongoose = require('mongoose');

const dbConnection = async () => {
    await mongoose.connect('mongodb://localhost:27017/votaapp')
    .then(() => console.log("Instancia DB OKey"))
    .catch(err => {
        console.log(`Error de coneccion a la Db ${err}`);
        throw new Error('No se puede conectar a la DB');
});
} 


module.exports={
    dbConnection
}