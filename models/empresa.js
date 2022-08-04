const mongoose = require('mongoose');

let empresaSchema = new mongoose.Schema({
    rut : {
        type: String
    },
    nombre : {
        type: String
    },
    direccion: {
        type: String
    },
    telefono: {
        type: String
    }
});

module.exports = mongoose.model('Empresas', empresaSchema);

