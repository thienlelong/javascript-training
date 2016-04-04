import React from 'react';
import List from './List.jsx';
import AddItem from './AddItem.jsx';
import FilterItem from './FilterItem.jsx';
import todoStore from '../stores/todoStore.jsx';
import todoActions from '../actions/todoActions.jsx';

class ListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: todoStore.getList(),
      areAllComplete: todoStore.areAllComplete(),
      filterItem: 'ALL'
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

  _filterItem(filter) {
    switch (filter) {
      case 'ALL':
        return this.state.list;
      case 'COMPLETED':
        return _.filter(this.state.list, {completed: true});
      case 'ACTIVED':
        return _.filter(this.state.list, {completed: false});
    }
  }

  _onFilterItem(filter) {
    this.setState({filterItem: filter});
  }

  render(){
    return (
      <div className="col-sm-6 col-md-offset-3">
        <div className="col-sm-12">
          <h3 className="text-center"> Todo List </h3>
          <AddItem addItem={this._onAddItem}
            toggleCheckAll={this._onToggleCheckAll}
            areAllComplete={this.state.areAllComplete}/>
          <List items={this._filterItem(this.state.filterItem)} filter={this.state.filterItem}/>
          <FilterItem items={this.state.list} filterItem={this._onFilterItem.bind(this)}/>
        </div>
      </div>
    )
  }
}

export default ListContainer;