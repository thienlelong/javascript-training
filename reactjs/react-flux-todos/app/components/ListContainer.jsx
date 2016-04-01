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
  }

  _onChange() {
    this.setState({list: todoStore.getList()});
  }

  handleAddItem(newItem) {
    todoActions.addItem(newItem);
  }

  render(){
    return (
      <div className="col-sm-6 col-md-offset-3">
        <div className="col-sm-12">
          <h3 className="text-center"> Todo List </h3>
          <AddItem addItem={this.handleAddItem}/>
          <List items={this.state.list}/>
        </div>
      </div>
    )
  }
}

export default ListContainer;