import React from 'react';
import todoActions from '../actions/todoActions.jsx';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this._onToggleComplete = this._onToggleComplete.bind(this);
  }

  render() {
    var todo = this.props.todo;
    return (
      <li key={todo.id} className="list-group-item list-group-item-info" >
        <label>
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={this._onToggleComplete}
          />
        </label>
        <span><strong> {todo.name}</strong></span>
        <span
          className="glyphicon glyphicon-remove pull-right"
          onClick={this._onRemoveItem.bind(null, todo.id)}>
        </span>
      </li>
    )
  }

  _onRemoveItem(id) {
    todoActions.removeItem(id);
  }

  _onToggleComplete(event) {
    let item = this.props.todo;
    item.completed = !item.completed;
    todoActions.updateItem(item);
  }
}

module.exports = Item;