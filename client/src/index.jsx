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
      <div className={this.state.show ? "repos": "hide"}>
        <div className= "header cell">Repo ID</div>  
        <div className= "header cell">Repo Name</div>
        <div className= "header cell">Username</div>
        <div className= "header cell">Star Gazers</div>
        <div className= "header cell">Watchers</div>  
        <div className= "header cell">Size</div>
        {this.state.repos.map((repo)=><Repo repoId={repo.repo_id} repoName={repo.repo_name} username={repo.user_name} stargazers={repo.stargazer_count} watchers={repo.watcher_count} size={repo.size}/>   )}
      </div>
    </div>)
  }
}

var Repo = (props)=> (<div>
                        <div className= "cell">{props.repoId}</div>
                        <div className= "cell">{props.repoName}</div>
                        <div className= "cell">{props.username}</div>
                        <div className= "cell">{props.stargazers}</div>
                        <div className= "cell">{props.watchers}</div>
                        <div className= "cell">{props.size}</div>
                      </div>)


ReactDOM.render(<App />, document.getElementById('app'));