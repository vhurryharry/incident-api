const { Router } = require("express");
const { getIncidents } = require("../services/incident");

const incidentRouter = new Router();

incidentRouter.get("/", (req, res) => {
  getIncidents().then((incidents) => {
    res.json(incidents);
  });
});

module.exports = incidentRouter;
