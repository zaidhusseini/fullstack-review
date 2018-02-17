const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repo_id: Number,
  user_id: Number,
  repo_name: String,
  user_name: String,
  stargazer_count: Number,
  watcher_count: Number,
  size: Number,
  created_at: Date,
  updated_at: Date


});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  var repoToAdd = new Repo({
    repo_id: repo.id,
    user_id: repo.owner.id,
    repo_name: repo.name,
    user_name: repo.owner.login,
    stargazer_count: repo.stargazers_count,
    watcher_count: repo.watchers_count,
    size: repo.size,
    created_at: repo.created_at,
    updated_at: repo.updated_at
  });

  repoToAdd.save(function(err, data){
    if (err){
      return console.error(err);
    }
    console.log(data);
  });


}

module.exports.save = save;