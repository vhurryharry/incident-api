const { CronJob } = require("cron");
const cache = require("./cache");
const { getIdentities } = require("../services/identities");
const { getIncidents } = require("../services/incidents");

const refreshData = async () => {
  cache.flushAll();

  await getIdentities();
  await getIncidents();
};

// Run the cron job every 30 mins
const cronJob = new CronJob("0 * * * *", async () => {
  await refreshData();
});

module.exports = {
  cronJob,
  refreshData,
};
