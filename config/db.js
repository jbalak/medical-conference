const mongoose = require('mongoose')
module.exports = () => {
    mongoose.connect('mongodb://localhost/MedicalConferences', { useNewUrlParser: true })
        .then(() => {
            console.log('conneced to db')
        })
        .catch(e => {
            console.log(e.message);
        })
}