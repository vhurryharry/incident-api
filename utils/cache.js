const NodeCache = require("node-cache");

// Set the default TTL to 1 day
const cache = new NodeCache({ stdTTL: 60 * 60 * 24 });

module.exports = cache;
