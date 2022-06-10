/**
 * name: Type name of incident
 * mappings: the mapping of the fields from the incident to the API response
 */

const incidentTypes = [
  {
    name: "denial",
    mappings: [
      { from: "priority", to: "priority" },
      { from: "timestamp", to: "timestamp" },
      { from: "source_ip", to: "machine_ip" },
    ],
  },
  {
    name: "intrusion",
    mappings: [
      { from: "priority", to: "priority" },
      { from: "timestamp", to: "timestamp" },
      { from: "source_ip", to: "machine_ip" },
    ],
  },
  {
    name: "executable",
    mappings: [
      { from: "priority", to: "priority" },
      { from: "timestamp", to: "timestamp" },
      { from: "machine_ip", to: "machine_ip" },
    ],
  },
  {
    name: "misuse",
    mappings: [
      { from: "priority", to: "priority" },
      { from: "timestamp", to: "timestamp" },
      { from: "employee_id", to: "employee_id" },
    ],
  },
  {
    name: "unauthorized",
    mappings: [
      { from: "priority", to: "priority" },
      { from: "timestamp", to: "timestamp" },
      { from: "employee_id", to: "employee_id" },
    ],
  },
  {
    name: "probing",
    mappings: [
      { from: "priority", to: "priority" },
      { from: "timestamp", to: "timestamp" },
      { from: "ip", to: "machine_ip" },
    ],
  },
  {
    name: "other",
    mappings: [
      { from: "priority", to: "priority" },
      { from: "timestamp", to: "timestamp" },
      { from: "identifier", to: "machine_ip" },
    ],
  },
];

module.exports = incidentTypes;
