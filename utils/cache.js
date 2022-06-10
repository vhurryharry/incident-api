const NodeCache = require("node-cache");

// Set the default TTL to 1 hour
const cache = new NodeCache({ stdTTL: 60 * 60 });

module.exports = cache;
