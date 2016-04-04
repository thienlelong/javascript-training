import React from 'react';
import List from './List.jsx';
import AddItem from './AddItem.jsx';
import todoStore from '../stores/todoStore.jsx';
import todoActions from '../actions/todoActions.jsx';

class ListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: todoStore.getList(),
      areAllComplete: todoStore.areAllComplete()
    };
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    todoStore.removeChangeListener(this._onChange);
  }

  componentDidMount() {
    todoStore.addChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({list: todoStore.getList(), areAllComplete: todoStore.areAllComplete()});
  }

  _onAddItem(newItem) {
    todoActions.addItem(newItem);
  }

  _onToggleCheckAll(completed) {
    todoActions.toggleCheckAll(completed);
  }

  _onUpdateItem(updateItem) {
    todoActions.updateItem(updateItem);
  }

  render(){
    return (
      <div className="col-sm-6 col-md-offset-3">
        <div className="col-sm-12">
          <h3 className="text-center"> Todo List </h3>
          <AddItem addItem={this._onAddItem}
            toggleCheckAll={this._onToggleCheckAll}
            areAllComplete={this.state.areAllComplete}/>
          <List items={this.state.list}/>
        </div>
      </div>
    )
  }
}

export default ListContainer;