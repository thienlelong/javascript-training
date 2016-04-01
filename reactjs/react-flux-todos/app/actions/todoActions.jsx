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
  }
};

export default todoActions;