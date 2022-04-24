import React, { Component } from 'react';
import NotFound from './NotFound';

class PhotoContainer extends Component {

  componentDidUpdate(prevState) {
    let { query, querySearch } = this.props;
    if (querySearch) {
      if (query !== prevState.query)
        querySearch(query);
    }
  }

  render() {

    const { photos, loading, query } = this.props;

    // photoDisplay to contain photo elements after mapping over photos.

    let photoDisplay;

    if (photos.length > 0) {
      photoDisplay = photos.map(photo => (
        <li key={photo.id} >
          <img src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} alt={photo.title} />
        </li>
      ))
    } else {
      photoDisplay = <NotFound />
    }

    return (
      <div className="photo-container" >
        <h2>{query}</h2>
        <ul>
          {/* Displays "loading message" until photoDisplay loaded. */}
          {(loading) ? <p>Loading...</p> : photoDisplay}
        </ul>
      </div>
    );
  }
}

export default PhotoContainer;