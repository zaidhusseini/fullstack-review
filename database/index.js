const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  github_repo_id: Number,
  github_userid: Number,
  repo_name: String,
  user_name: String,
  stargazer_count: Number,
  watcher_count: Number,
  size: Number,
  created_at: Date,
  updated_at: Date


});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;