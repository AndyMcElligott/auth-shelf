import React, { Component } from 'react';
import { connect } from 'react-redux'
import BookForm from '../BookForm/BookForm'


// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_BOOKS' })
  }
  deleteBook = (book) => {
    console.log('Ready to delete this book', book)
    this.props.dispatch({ 
      type: 'DELETE_BOOK', 
      payload: book
  })
  }
  render() {
    return (
      <div>
        <p>
          Shelf Page
      </p>
      <BookForm />
        <ul>
          {this.props.reduxStore.infoReducer.map(book =>
            <li key={book.id}>
              <div>
                <p>{book.description}</p>
                <img src={book.image_url} />
                <button onClick={ () => this.deleteBook(book.id)}>DELETE BOOK</button>
              </div>
            </li>
          )}
        </ul>
      </div>
    )
  }
};

const mapReduxStateToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapReduxStateToProps)(InfoPage);
