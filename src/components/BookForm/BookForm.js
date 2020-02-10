import React, { Component } from 'react';
import { connect } from 'react-redux'

class BookForm extends Component {

    state = {
        newBook: {
            description: '',
            image_url: '',
            user_id: this.props.reduxStore.user.id
        }
    }

    handleChangeFor = (propertyName, event) => {
        console.log(event.target.value, this.props.reduxStore.user.id)
        this.setState({
          newBook: {
              ...this.state.newBook,
              [propertyName]: event.target.value
          }  
        })
    }

    handleClick = (event) => {
        event.preventDefault()
        this.props.dispatch({
            type: 'POST_BOOKS',
            payload: this.state.newBook
        })
    }

    render() {
        return (
            <form onSubmit= {this.handleClick}>
                <label> Add Book </label>
                <input value ={this.state.newBook.description} onChange = {(event) => this.handleChangeFor('description', event)}/>
                <br />
                <label> img url </label>
                <input value ={this.state.newBook.image_url} onChange = {(event) => this.handleChangeFor('image_url', event)} />
                <input type= "submit" onClick = {this.handleClick}/>
            </form>
        )
    }
}

const mapReduxStateToProps = (reduxStore) => ({
    reduxStore
  })
  

export default connect(mapReduxStateToProps)(BookForm)