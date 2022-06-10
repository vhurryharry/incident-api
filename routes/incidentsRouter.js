const { Router } = require("express");
const { getIncidentsFromCache } = require("../services/incidents");

const incidentsRouter = new Router();

incidentsRouter.get("/", (req, res) => {
  res.json(getIncidentsFromCache());
});

module.exports = incidentsRouter;
