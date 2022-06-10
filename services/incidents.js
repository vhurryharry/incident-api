const axios = require("axios");
const cache = require("../utils/cache");
const config = require("../utils/config");
const incidentTypes = require("../utils/incidentTypes");
const { getIdentity } = require("./identities");

/**
 * Get incidents per type
 *
 * @param {string} type the type of incident
 * @returns {Promise<object>} the incidents of the type
 */
const getIncidentsPerType = (type) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${config.api.baseUrl}/incidents/${type.name}`, {
        auth: {
          username: config.api.username,
          password: config.api.password,
        },
      })
      .then((response) => {
        return response.data.results || [];
      })
      .then((incidents) => {
        return Promise.all(
          incidents.map((incident) => mapIncident(incident, type))
        );
      })
      .then((incidents) => {
        resolve(incidents);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Map incident from the API for output
 *
 * @param {object} incident
 * @param {Type} type
 * @returns
 */
const mapIncident = (incident, type) => {
  return new Promise((resolve, reject) => {
    let mappedIncident = {
      type: type.name,
    };

    for (let mapping of type.mappings) {
      mappedIncident[mapping.to] = incident[mapping.from];
    }

    getIdentity(incident)
      .then((incident) => {
        resolve(incident);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * Merge incidents per types into one array
 *
 * @param {Array<Array<object>>} incidentsPerTypes
 * @returns Merged incients per employee_id
 */
const mergeIncidents = (incidentsPerTypes) => {
  let mergedIncidents = {};

  for (let incidents of incidentsPerTypes) {
    for (let incident of incidents) {
      if (!mergedIncidents[incident.employee_id]) {
        mergedIncidents[incident.employee_id] = {
          low: {
            count: 0,
            incidents: [],
          },
          medium: {
            count: 0,
            incidents: [],
          },
          high: {
            count: 0,
            incidents: [],
          },
          critical: {
            count: 0,
            incidents: [],
          },
        };
      }

      mergedIncidents[incident.employee_id][incident.priority][
        "incidents"
      ].push(incident);
      mergedIncidents[incident.employee_id][incident.priority]["count"]++;
    }
  }
  return mergedIncidents;
};

/**
 * Get incidents from the cache
 *
 * @returns {Array<object>} array of incidents
 */
exports.getIncidentsFromCache = () => {
  const value = cache.get("incidents");
  return value || [];
};

/**
 * Get incidents for all types
 *
 * @returns {Promise<Array<object>>} array of incidents
 */
exports.getIncidents = () => {
  return new Promise((resolve, reject) => {
    Promise.all(incidentTypes.map((type) => getIncidentsPerType(type)))
      .then((incidentsPerTypes) => {
        return mergeIncidents(incidentsPerTypes);
      })
      .then((incidents) => {
        cache.set("incidents", incidents);
        resolve(incidents);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
