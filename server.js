const express = require('express');
// const http = require('http');
const path = require('path');
const fs = require('fs');
filepath = "assets/json/settings.json";

const app = express();
app.use(express.static(path.join(__dirname, '/')));
app.use(express.json({limit:'1mb'}));
app.listen(3000,() => console.log('Listening on 3000'));
// app.use((req, res /* , next */) => {
//   res.redirect('/');
// });

// const server = http.createServer(app);

// server.listen('3000', () => {
//   console.log('Listening on %d.', server.address().port);
// });

app.post('/api', (request,response) => {
  // console.log('I got a request');
  // console.log(request.body);
  fs.writeFile (filepath, JSON.stringify(request.body), function(err) {
    if (err) throw err;
    console.log('Completed writing into json file');
    }
);
});
