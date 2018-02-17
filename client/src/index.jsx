import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      show: false
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO

    //make AJAX request to server
    $.ajax({
      url: 'http://127.0.0.1:1128/repos',
      contentType: 'text/plain',
      data: term,
      method: 'POST',
      success: function(data){
        console.log('Data sent successfully',data)
      },
      error: function(error){
        console.log('you got an error:', error);
      }
    });
  }

  fetchTopRepos(callback){
    $.ajax({
      url:'http://127.0.0.1:1128/repos',
      contentType: 'application/json',
      method: 'GET',
      success: function(data){
        console.log('Repos Received Successfully', data);
        callback(data);
      },
      error: function(error){
        console.log('Could not retrieve Repos', error);
      }
    });
    this.setState({show:true});
  }

  setReposToDisplay(data){
    this.setState({repos:data});
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)} fetch={this.fetchTopRepos.bind(this)} displayRepos={this.setReposToDisplay.bind(this)} />
      <h2 className={this.state.show ? "show": "hide"}>Check out the Top 25 Repos</h2>
      <div className={this.state.show ? "show": "hide"}>Repo ID  Repo Name  Star Gazers  Watchers  Size</div>
      {this.state.repos.map((repo)=><Repo repoId={repo.repo_id} repoName={repo.repo_name} stargazers={repo.stargazer_count} watchers={repo.watcher_count}/>   )}
    </div>)
  }
}

var Repo = (props)=> (<div>{props.repoId} {props.repoName} {props.stargazers} {props.watchers}</div>)


ReactDOM.render(<App />, document.getElementById('app'));