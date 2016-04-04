import React from 'react';
import todoActions from '../actions/todoActions.jsx';

class FilterItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    let todos = this.props.items;
    let completed = 0;
    for (var i = 0; i < todos.length; i++) {
      if(todos[i].completed) {
        completed +=1;
      }
    };
    let itemsLeft = todos.length - completed;
    let itemsLeftPhrase = itemsLeft.length <=1 ? ' item' : ' items';
    let clearCompletedButton;
    if (completed) {
      clearCompletedButton =
        <button
          id="clear-completed"
          className="pull-right btn btn-danger"
          onClick={this._onClearCompletedClick}>
          Clear completed ({completed})
        </button>;
    }
    return (
      <footer id="footer">
        <span id="todo-count">
          <strong>
            {itemsLeft}
          </strong>
          {itemsLeftPhrase}
        </span>
        <button
          className="btn btn-default"
          onClick={this.props.filterItem.bind(null, 'ALL')}>
          ALL
        </button>
        <button
          className="btn btn-default"
          onClick={this.props.filterItem.bind(null, 'COMPLETED')}>
          Completed
        </button>
        <button
          className="btn btn-default"
          onClick={this.props.filterItem.bind(null, 'ACTIVED')}>
          Actived
        </button>
        {clearCompletedButton}
      </footer>
    )
  }

  _onClearCompletedClick() {
    todoActions.removeCompleted();
  }
}

module.exports = FilterItem;