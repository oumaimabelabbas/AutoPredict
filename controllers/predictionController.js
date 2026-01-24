const Prediction = require('../models/PredictionModel')

exports.predict_history = async (req, res) => {
  const { prediction } = req.body;
  const userEmail = req.user.email;
  // Vérification
  if (!prediction) {
    return res.status(400).json({ error: "Données manquantes" });
  }
  try {
    const newPrediction = new Prediction({ userEmail, prediction });
    await newPrediction.save();
    res.json({ success: true, message: "Prédiction sauvegardée !" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}


exports.get_predict_history = async(req,res)=>{
  const userEmail = req.user.email; 
  try {
    const history = await Prediction.find({ userEmail }).sort({ createdAt: -1 }); // du plus récent au plus ancien
    res.json({ success: true, history });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}