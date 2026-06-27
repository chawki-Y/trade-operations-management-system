const express = require("express");
const {
  postAiCopilotLog,
  listAiCopilotLogs
} = require("../controllers/aiCopilotLogController");

const router = express.Router();

router.post("/", postAiCopilotLog);
router.get("/", listAiCopilotLogs);

module.exports = router;
