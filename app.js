const express = require("express");
const incidentRouter = require("./routes/incidentRouter");

const app = express();

app.use("/incidents", incidentRouter);

app.listen(9000, () => {
  console.log("Security Incident API is running on port 9000");
});
