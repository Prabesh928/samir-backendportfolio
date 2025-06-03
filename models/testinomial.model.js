const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: String,
  post: String,
  text: String,
  photoUrl: String,
});
let testomodel = mongoose.model('Testimonial', testimonialSchema);
module.exports = testomodel;