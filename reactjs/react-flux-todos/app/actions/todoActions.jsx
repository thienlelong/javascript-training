import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import appConstants from '../constants/appConstants.jsx';

const todoActions = {
  addItem(item){
    AppDispatcher.handleAction({
      actionType: appConstants.ADD_ITEM,
      data: item
    });
  },

  removeItem(id){
    AppDispatcher.handleAction({
      actionType: appConstants.REMOVE_ITEM,
      data: id
    });
  },

  toggleCheckAll(completed) {
    AppDispatcher.handleAction({
      actionType: appConstants.CHECK_ALL,
      data: completed
    });
  },

  updateItem(updateItem) {
    AppDispatcher.handleAction({
      actionType: appConstants.UPDATE_ITEM,
      data: updateItem
    });
  },

  removeCompleted() {
    AppDispatcher.handleAction({
      actionType: appConstants.REMOVE_COMPLETED
    });
  }
};

export default todoActions;