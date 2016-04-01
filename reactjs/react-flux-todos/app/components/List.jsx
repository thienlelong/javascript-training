import React from 'react';

class List extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    let handlelistItems = this.props.items.map((item) => {
      return (
        <li key={item.id} className="list-group-item list-group-item-info" >
          <label>
            <input type="checkbox" defaultChecked={item.completed} />
          </label>
          <span><strong> {item.name}</strong></span>
          <span
            className="glyphicon glyphicon-remove pull-right">
          </span>
        </li>
      )
    });
    return (
      <ul className="list-group">
        {handlelistItems}
      </ul>
    )
  }
}


module.exports = List;