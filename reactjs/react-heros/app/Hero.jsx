import React from 'react';
import _ from 'underscore';

class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      level: this.props.level,
      id: this.props.id
    };
  }
  render() {
    return (
      <div className='hero'>
          Name: {this.state.name}, Level: {this.state.level}
      </div>
    );
  }
}

export default Hero;