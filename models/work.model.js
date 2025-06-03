const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  workName: String,
  workLocation: String,
  workDetails: String,
  workDate: String,
  imageUrl: String,
});
let workmodel =  mongoose.model('Work', workSchema);
module.exports =workmodel
