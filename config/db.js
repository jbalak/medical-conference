const mongoose = require('mongoose')
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

module.exports = () => {
    mongoose.connect('mongodb://localhost/MedicalConferences')
        .then(() => {
            console.log('conneced to db')
        })
        .catch(e => {
            console.log(e.message);
        })
}