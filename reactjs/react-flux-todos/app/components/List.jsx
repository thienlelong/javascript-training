import React from 'react';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.handleCheckCompleted = this.handleCheckCompleted.bind(this);
  }
  render(){
    let handlelistItems = this.props.items.map((item) => {
      return (
        <li key={item.id} className="list-group-item list-group-item-info" >
          <label>
            <input type="checkbox"
              ref="checkCompleted"
              defaultChecked={item.completed}
              checked={item.completed}
              onClick={this.handleCheckCompleted(item)}/>
          </label>
          <span><strong> {item.name}</strong></span>
          <span
            className="glyphicon glyphicon-remove pull-right"
            onClick={this.props.removeItem.bind(null, item.id)}>
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

  handleCheckCompleted(item) {
    console.log(item);
    /*let completed = this.refs.checkCompleted.checked;*/
    console.log('completed')
    this.props.checkCompleted(item);
  }
}


module.exports = List;