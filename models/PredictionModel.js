const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({
  userEmail: String,
  prediction: Object,
}, { timestamps: true }); 

module.exports = mongoose.model("Prediction", predictionSchema);
