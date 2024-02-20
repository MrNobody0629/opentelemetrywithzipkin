'use strict';
require('dotenv').config();
const PORT = process.env.PORT || "8080";
const METRICSERVICENAME = process.env.METRICSERVICENAME;
const METRICSERVICEURL = process.env.METRICSERVICEURL;
require('./tracing')(METRICSERVICENAME, METRICSERVICEURL);
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json("Hello World");
});

app.get("/date", (req, res) => {
  res.json({ today: new Date() });
});

app.listen(parseInt(PORT, 10), () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});
