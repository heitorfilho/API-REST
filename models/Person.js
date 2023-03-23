const mongoose = require('mongoose');

// Criar a collection person no banco
const Person = mongoose.model('Person', {
    name: String,
    salary: Number,
    approved: Boolean,
});

module.exports = Person;