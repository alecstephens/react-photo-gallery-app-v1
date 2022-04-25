import React, { Component } from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import axios from 'axios';
import apiKey from '../config';

// Components
import Nav from './Nav';
import PhotoContainer from './PhotoContainer';
import SearchForm from './SearchForm';

//Flickr Api
const photoKey = apiKey;

class App extends Component {
  constructor () {
    super();
    this.state = {
      loading: true,
      photos: [],
      sun: [],
      moon: [],
      clouds: [],
      query: ''
    };
  }

  componentDidMount() {
    this.performSearch();
    this.performSearch('sun');
    this.performSearch('moon');
    this.performSearch('clouds');
  }

  performSearch = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${photoKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        if(query === 'sun') {
          this.setState({
            sun: response.data.photos.photo,
            loading: false,
          });
        } if(query === 'moon'){
          this.setState({
            moon: response.data.photos.photo,
            loading: false,
          });
        } if(query === 'clouds') {
          this.setState({
            clouds: response.data.photos.photo,
            loading: false,
          });
        } else {
          this.setState({
            photos: response.data.photos.photo,
            loading: false,
            query: query
          });
        }
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error)
      });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <h1>Photo Gallery that uses Flickr and React.js</h1>
          <SearchForm onSearch={this.performSearch} />
          <Nav />
          <Switch>
            <Route path='/search/:query' render={({ match }) => <PhotoContainer performSearch={this.performSearch} query={match.params.query} loading={this.state.loading} photos={this.state.photos} />} />
            <Route path="/sun" render={() => <PhotoContainer loading={this.state.loading}  photos={this.state.sun} />} />
            <Route path="/moon" render={() => <PhotoContainer loading={this.state.loading} photos={this.state.moon} />} />
            <Route path="/clouds" render={() => <PhotoContainer loading={this.state.loading} photos={this.state.clouds} />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
