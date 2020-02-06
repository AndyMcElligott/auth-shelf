import React, { Component } from 'react';
import { connect } from 'react-redux'

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_BOOKS' })
  }

  render() {
    let booksForDom = [];
    let gifsData = this.props.reduxStore.infoReducer
    console.log(gifsData)
    gifsForDom = gifsData.map((gif) => {
      console.log(gif.images.original.url)
      return (
        // <GiftListItem gif={gif} />
        <li>
          <img src={gif.images.original.url} />
          <button onClick={(event) => this.favorite(event, gif.images.original.url)}>Favorite!</button>
        </li>
      )
    })

    return (
      <ul>
        {gifsForDom}
      </ul>
    )





    return (
      <div>
        <p>
          Shelf Page
      </p>
      </div>
    )
  }
};

export default connect()(InfoPage);
