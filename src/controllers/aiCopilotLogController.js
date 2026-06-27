const {
  createAiCopilotLog,
  getAiCopilotLogs
} = require("../services/aiCopilotLogService");

async function postAiCopilotLog(req, res) {
  const {
    question,
    intent,
    answer,
    data_source_endpoint: dataSourceEndpoint,
    row_count: rowCount,
    error
  } = req.body;

  if (!question || typeof question !== "string" || !question.trim()) {
    return res.status(400).json({ message: "question is required" });
  }

  if (rowCount !== undefined && (!Number.isInteger(rowCount) || rowCount < 0)) {
    return res.status(400).json({ message: "row_count must be a non-negative integer" });
  }

  try {
    const log = await createAiCopilotLog({
      question: question.trim(),
      intent,
      answer,
      dataSourceEndpoint,
      rowCount,
      error
    });
    return res.status(201).json(log);
  } catch (serviceError) {
    return res.status(500).json({
      message: "Failed to create AI Copilot log",
      error: serviceError.message
    });
  }
}

async function listAiCopilotLogs(req, res) {
  const requestedLimit = Number.parseInt(req.query.limit, 10);
  const limit = Number.isInteger(requestedLimit)
    ? Math.min(Math.max(requestedLimit, 1), 100)
    : 50;

  try {
    const logs = await getAiCopilotLogs(limit);
    return res.json(logs);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve AI Copilot logs",
      error: error.message
    });
  }
}

module.exports = {
  postAiCopilotLog,
  listAiCopilotLogs
};
