import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
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

  fetchTopRepos(){
    $.ajax({
      url:'http://127.0.0.1:1128/repos',
      contentType: 'application/json',
      method: 'GET',
      success: function(data){
        console.log('Repos Received Successfully', data);
      },
      error: function(error){
        console.log('Could not retrieve Repos', error);
      }
    });

  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)} fetch={this.fetchTopRepos.bind(this)} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));