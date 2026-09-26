const { Client } = require("@elastic/elasticsearch");
const fs = require("fs");

const conf = {
  maxPerPage: 30,
  server: process.env.ELASTIC_SERVER || "",
  port: process.env.ELASTIC_PORT || "9200",
  localhost: "127.0.0.1",
  // CA that signed the Elasticsearch HTTP certificate (config/certs/http_ca.crt)
  cert: process.env.ELASTIC_CA_CERT,
  index: process.env.ELASTIC_INDEX,
};

const server = process.env.LOCAL_RUN ? conf.localhost : conf.server;

const elasticclient = new Client({
  node: "https://".concat(server, ":", conf.port),
  auth: {
    username: process.env.ELASTIC_USER,
    password: process.env.ELASTIC_PASS,
  },
  tls: {
    ca: conf.cert ? fs.readFileSync(conf.cert) : undefined,
    // Only skip certificate verification when explicitly requested (local dev).
    rejectUnauthorized: process.env.ELASTIC_TLS_INSECURE !== "1",
  },
  maxRetries: 5,
  requestTimeout: 60000,
  sniffOnStart: true,
});


module.exports = {
  elasticclient,
  conf
}