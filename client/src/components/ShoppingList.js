import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
//import uuid from 'uuid';
import { connect } from 'react-redux';
import { getItems, deleteItem, editItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {

  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => this.props.deleteItem(id)

  onEditClick = id => this.props.editItem(id)

  render() {
    const { items } = this.props.item;
    return (
      <Container>
        {/*<Button
        color="dark"
        style={{marginBottom: '2rem'}}
        onClick={() => {
          const name = prompt('Enter Item');
          if(name) {
            this.setState(state => ({
              //items: [...state.items, { id: uuid(), name}]
            }))
          }
        }}
        >Add Item
        </Button>*/}
        <ListGroup>
          <TransitionGroup className="shopping-list">
          {items.map(({_id, name}) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={this.onDeleteClick.bind(this, _id)}
                >Remove
                </Button>
                <Button
                className="update-btn"
                  color="info"
                  size="sm"
                  onClick={this.onEditClick.bind(this, _id)}
                >Update
                </Button>
                {' '}
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  item: state.item
})

export default connect(mapStateToProps,
  { getItems, deleteItem, editItem }
)(ShoppingList);
