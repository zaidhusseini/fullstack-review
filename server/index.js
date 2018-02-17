const express = require('express');
var github = require('../helpers/github')
let app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.text());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var username = req.body;
  github.getReposByUsername(username, res);
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  github.getTopRepos(res);
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

