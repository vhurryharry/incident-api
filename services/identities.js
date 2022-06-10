const axios = require("axios");
const config = require("../utils/config");
const cache = require("../utils/cache");

/**
 * Get identities data from API
 *
 * @returns {Promise<object>} array of identities - [ip]: [employeeId]
 */
const getIdentitiesFromAPI = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${config.api.baseUrl}/identities`, {
        auth: {
          username: config.api.username,
          password: config.api.password,
        },
      })
      .then((response) => {
        resolve(response.data || {});
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Get identities data from cache if it's there, otherwise get it from the API
 * Once the data is retrieved, store it to the cache for the next usage
 *
 * @returns {Promise<object>} array of identities - [ip]: [employeeId]
 */
const getIdentities = () => {
  return new Promise((resolve, reject) => {
    const value = cache.get("identities");
    if (value) {
      resolve(value);
    } else {
      getIdentitiesFromAPI()
        .then((identities) => {
          cache.set("identities", identities);
          resolve(identities);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    }
  });
};

/**
 * Fill the IP address or Employee ID from the given incident
 *
 * @param {object} incident - incident object with `machine_ip` or `employee_id`
 * @returns Incident object with both the IP address and Employee ID filled
 */
exports.getIdentity = (incident) => {
  return new Promise((resolve, reject) => {
    getIdentities()
      .then((identities) => {
        if (incident.machine_ip) {
          incident.employee_id = identities[incident.machine_ip] || 0;
        } else {
          incident.machine_ip =
            Object.keys(identities).find(
              (ip) => identities[ip] === incident.employee_id
            ) || "0.0.0.0";
        }

        resolve(incident);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
