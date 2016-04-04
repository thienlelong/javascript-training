import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import appConstants from '../constants/appConstants.jsx';
import objectAssign from 'react/lib/Object.assign';
import { EventEmitter } from 'events';
import uuid from 'node-uuid';
import _ from 'lodash';

const CHANGE_EVENT = 'change';

let _store = {
  list: [
    {
      id: uuid.v4(),
      name: 'Shadow Fiend',
      completed: true
    },
    {
      id: uuid.v4(),
      name: 'Juggenaut',
      completed: false
    },
    {
      id: uuid.v4(),
      name: 'Storm Spirit',
      completed: true
    }
  ]
};

const addItem = (item) => {
  let toDo = {
    id: uuid.v4(),
    name: item,
    completed: false
  };

  _store.list.push(toDo);
};

const removeItem = (id) => {
  _.remove(_store.list, {id: id});
};

const toggleCheckAll = (completed) => {
  _.forEach(_store.list, item => {
    item.completed = completed;
  });
};

const updateItem = (updateItem) => {
  _.forEach(_store.list, item => {
    if(item.id === updateItem.id) {
      item.completed = updateItem.completed;
      item.name = updateItem.name;
    }
  });
};

const removeCompleted = () => {
  _.remove(_store.list, {completed: true});
};

AppDispatcher.register(function(payload){
  const action = payload.action;
  switch(action.actionType){
    case appConstants.ADD_ITEM:
      addItem(action.data);
      todoStore.emit(CHANGE_EVENT);
      break;
    case appConstants.REMOVE_ITEM:
      removeItem(action.data);
      todoStore.emit(CHANGE_EVENT);
      break;
    case appConstants.CHECK_ALL:
      toggleCheckAll(action.data);
      todoStore.emit(CHANGE_EVENT);
      break;
    case appConstants.UPDATE_ITEM:
      updateItem(action.data);
      todoStore.emit(CHANGE_EVENT);
      break;
    case appConstants.REMOVE_COMPLETED:
      removeCompleted();
      todoStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

const todoStore = objectAssign({}, EventEmitter.prototype, {

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  getList() {
    return _store.list;
  },

  areAllComplete() {
    return !_.isEmpty(_store.list) && !_.find(_store.list, { completed: false});
  }
});

export default todoStore;