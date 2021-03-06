import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  search(callback) {
    this.props.onSearch(this.state.term, callback);
  }

  render() {
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: <input value={this.state.term} onChange={this.onChange.bind(this)}/>       
      <button 
      onClick={()=>{this.search(()=>this.props.fetch(this.props.displayRepos));}}> Add Repos </button>
    </div>) 
  }
}

export default Search;