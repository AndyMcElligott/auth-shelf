import React, { Component } from 'react';
import { connect } from 'react-redux'

class BookForm extends Component {

    state = {
        newBook: {
            description: '',
            image_url: '',
        }
    }

    handleChangeFor = (propertyName, event) => {
        console.log(event.target.value)
        this.setState({
          newBook: {
              [propertyName]: event.target.value
          }  
        })
    }

    handleClick = (event) => {
        event.preventDefault()
        this.props.dispatch({
            type: 'POST_BOOK',
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

export default connect()(BookForm)