const express = require("express");
const {
  getOperationalSummary,
  investigateTrade
} = require("../controllers/operationsController");

const router = express.Router();

router.get("/summary", getOperationalSummary);
router.get("/investigate/:tradeId", investigateTrade);

module.exports = router;
