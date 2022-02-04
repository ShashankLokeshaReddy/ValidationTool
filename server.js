const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
filepath = "assets/json/settings.json";

const app = express();
app.use(express.static(path.join(__dirname, '/')));
app.use((req, res /* , next */) => {
  res.redirect('/');
});

const server = http.createServer(app);

server.listen('3000', () => {
  console.log('Listening on %d.', server.address().port);
});

