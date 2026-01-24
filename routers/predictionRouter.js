const express = require("express");
const router = express.Router();
const identifier = require("../middlewares/identification");
const predictionController = require("../controllers/predictionController");

router.post('/',identifier,predictionController.predict_history);
router.get('/',identifier,predictionController.get_predict_history)
module.exports=router;