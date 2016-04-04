import React from 'react';
import todoActions from '../actions/todoActions.jsx';
import AddItem from './AddItem.jsx'

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      name: this.props.todo.name
    };

    this._onToggleComplete = this._onToggleComplete.bind(this);
    this._onDoubleClick = this._onDoubleClick.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onChangeName = this._onChangeName.bind(this);
  }

  render() {
    let todo = this.props.todo;
    let editing =  this.state.editing;
    if (editing) {
      return (
        <li key={todo.id} className="list-group-item list-group-item-info" >
          <input type="text"
            ref="updateItem"
            className="form-control"
            defaultValue={this.state.name}
            onKeyDown={this._onSubmit}
            onChange={this._onChangeName}
            onBlur={this._onBlurName.bind(this)}
            autoFocus={true}/>
        </li>
      )
    } else {
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
          <span onDoubleClick={this._onDoubleClick}><strong> {todo.name}</strong></span>
          <span
            className="glyphicon glyphicon-remove pull-right"
            onClick={this._onRemoveItem.bind(null, todo.id)}>
          </span>
        </li>
      )
    }
  }

  _onRemoveItem(id) {
    todoActions.removeItem(id);
  }

  _onToggleComplete(e) {
    let item = this.props.todo;
    item.completed = !item.completed;
    todoActions.updateItem(item);
  }

  _onDoubleClick() {
    this.setState({editing: true});
  }

  _onSubmit(e) {
    if(e.keyCode === 13){
      let item = this.props.todo;
      item.name = this.state.name;
      todoActions.updateItem(item)
      this.setState({editing: false});
    }
  }

  _onChangeName(e) {
    this.setState({name: this.refs.updateItem.value});
  }

  _onBlurName() {
    this.setState({editing: false, name: this.props.todo.name});
  }
}

module.exports = Item;