import React from 'react';
import List from './List.jsx';
import AddItem from './AddItem.jsx';
import todoStore from '../stores/todoStore.jsx';
import todoActions from '../actions/todoActions.jsx';

class ListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {list: todoStore.getList()};
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    todoStore.removeChangeListener(this._onChange);
  }

  componentDidMount() {
    todoStore.addChangeListener(this._onChange);
    console.log("this.state sdf", this.state.list);
  }

  _onChange() {
    this.setState({list: todoStore.getList()});
    console.log("this.state", this.state.list);
  }

  handleAddItem(newItem) {
    todoActions.addItem(newItem);
  }

  handleRemoveItem(id) {
    todoActions.removeItem(id);
  }

  handleToggleCheckAll(completed) {
    todoActions.toggleCheckAll(completed);
  }

  handleUpdateItem(updateItem) {
    todoActions.updateItem(updateItem);
  }

  render(){
    return (
      <div className="col-sm-6 col-md-offset-3">
        <div className="col-sm-12">
          <h3 className="text-center"> Todo List </h3>
          <AddItem addItem={this.handleAddItem} toggleCheckAll={this.handleToggleCheckAll}/>
          <List items={this.state.list}
            removeItem={this.handleRemoveItem}
            checkCompleted={this.handleUpdateItem}/>
        </div>
      </div>
    )
  }
}

export default ListContainer;