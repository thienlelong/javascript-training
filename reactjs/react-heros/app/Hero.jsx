import React from 'react';
import _ from 'lodash';

class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      level: this.props.level,
      id: this.props.id
    };
    this.removeHero = this.removeHero.bind(this);
  }
  render() {
    return (
      <div className='hero'>
          Name: {this.state.name}, Level: {this.state.level}
          <button className='btn btn-danger' onClick={this.removeHero}>x</button>
      </div>
    );
  }

  removeHero() {
    this.props.onRemove(this.state.id);
  }
}

export default Hero;