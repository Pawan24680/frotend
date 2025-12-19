const { Schema , model} = require('../connection');

const mySchema = new Schema ({
    name:String,
    email:{type:String , unique:" true"},
    password: {type : String , require : true},


 }, {timestamps : true,});

 module.exports = model('user', mySchema);

