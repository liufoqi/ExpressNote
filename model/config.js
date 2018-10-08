const mongoose =require('mongoose')
mongoose.connect('mongodb://localhost/demoNote',{ useNewUrlParser: true })
const db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function () {
  console.log('connected successful!')
})
module.exports=db;
