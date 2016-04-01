import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import appConstants from '../constants/appConstants.jsx';
import objectAssign from 'react/lib/Object.assign';
import { EventEmitter } from 'events';
import uuid from 'node-uuid';

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

AppDispatcher.register(function(payload){
  const action = payload.action;
  switch(action.actionType){
    case appConstants.ADD_ITEM:
      addItem(action.data);
      todoStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

const todoStore = objectAssign({}, EventEmitter.prototype, {

  addChangeListener(cb){
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },

  getList(){
    return _store.list;
  }
});

export default todoStore;