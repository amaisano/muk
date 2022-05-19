'use strict';

const express = require("express");
const http = require("http");
const ws = require("ws");
const path = require("path");

const app = express();

// 1 request/second
const RateLimit = require('express-rate-limit');
const limiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Services like Heroku
app.set('trust proxy', 1)
app.use(limiter);

app.use(express.static(path.join(__dirname, "./public")));
app.get("/", (req, res) => { res.sendFile(path.join(__dirname, "index.html")) });

const httpServer = http.createServer(app);
const websocketServer = new ws.Server({ server: httpServer });

websocketServer.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
  websocketServer.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);

const port = process.env.PORT || 3000;
httpServer.listen(port, () => { console.log("Server started. Port: ", port); });
