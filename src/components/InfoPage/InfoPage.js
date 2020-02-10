import React, { Component } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  ListItemSecondaryAction
} from "@material-ui/core"
import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from 'react-redux'
import BookForm from '../BookForm/BookForm'
import Avatar from '@material-ui/core/Avatar';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

const getItemStyle = (isDragging, draggableStyle) => ({

  ...draggableStyle,
  ...(isDragging && {
    background: "rgb(235,235,235)"
  })
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
});

class InfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.reduxStore.infoReducer
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }


  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    
    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }

  render() {
    return (
      <div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <RootRef rootRef={provided.innerRef}>
                <List style={getListStyle(snapshot.isDraggingOver)}>
                  {this.state.items.map((book, index) => (
                    <Draggable key={book.id} draggableId={book.id} index={index}>
                      {(provided, snapshot) => (
                        <ListItem
                          ContainerComponent="li"
                          ContainerProps={{ ref: provided.innerRef }}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <ListItemAvatar>
                            <Avatar
                              alt='{book.id}'
                              src={book.image_url}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={book.description}
                          />
                          <ListItemSecondaryAction>
                            {this.props.reduxStore.user.id === book.user_id ?
                              <IconButton onClick={() => this.props.dispatch(
                                {
                                  type: 'DELETE_BOOK',
                                  payload: book
                                })}>DELETE BOOK</IconButton> :
                              <p></p>
                            }
                          </ListItemSecondaryAction>
                        </ListItem>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </List>
              </RootRef>
            )}
          </Droppable>
        </DragDropContext>
        <BookForm />
        {/* <ul>
          {this.props.reduxStore.infoReducer.map(book =>
            <li key={book.id}>
              <div>
                <p>{book.description}</p>
                <img src={book.image_url} />
                {this.props.reduxStore.user.id === book.user_id ?
                  <button onClick={() => this.props.dispatch(
                    {
                      type: 'DELETE_BOOK',
                      payload: book
                    })}>DELETE BOOK</button> :
                  <p></p>
                }
              </div>
            </li>
          )}
              </ul> */}
      </div>
    )
  }
};

const mapReduxStateToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapReduxStateToProps)(InfoPage);
