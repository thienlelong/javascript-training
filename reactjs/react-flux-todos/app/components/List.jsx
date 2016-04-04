import React from 'react';
import Item from './Item.jsx';

class List extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    let handlelistItems = this.props.items.map((item) => {
      return (
        <Item key={item.id} todo={item}/>
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