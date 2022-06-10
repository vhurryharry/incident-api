const express = require("express");
const incidentsRouter = require("./routes/incidentsRouter");
const { cronJob, refreshData } = require("./utils/cron");

const app = express();

app.use("/incidents", incidentsRouter);

refreshData();
cronJob.start();

app.listen(9000, () => {
  console.log("Security Incident API is running on port 9000");
});
