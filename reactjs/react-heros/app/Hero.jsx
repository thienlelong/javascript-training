import React from 'react';
import _ from 'lodash';

class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      name: this.props.name,
      level: this.props.level,
      id: this.props.id
    };

    this.removeHero = this.removeHero.bind(this);
    this.editHero = this.editHero.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeLevel = this.changeLevel.bind(this);
    this.doneEdit = this.doneEdit.bind(this);
    this.cancelEdit =  this.cancelEdit.bind(this);
  }
  render() {
    if(this.state.editing) {
      return (
        <div className='hero'>
          <input onChange={this.changeName} type='text' defaultValue={this.state.name} />
          <input onChange={this.changeLevel} type='text' defaultValue={this.state.level} />
          <button onClick={this.doneEdit}>Done</button>
          <button onClick={this.cancelEdit}>Cancel</button>
        </div>
      );
    } else {
      return (
        <div className='hero'>
            Name: {this.state.name}, Level: {this.state.level}
            <button className='btn btn-danger' onClick={this.removeHero}>x</button>
            <button className='btn btn-info' onClick={this.editHero}>edit</button>
        </div>
      );
    }
  }

  changeName(event) {
    this.setState({name: event.target.value});
  }

  changeLevel(event) {
    this.setState({level: event.target.value});
  }

  removeHero() {
    this.props.onRemove(this.state.id);
  }

  editHero() {
    this.setState({editing: true});
  }

  doneEdit() {
    this.props.onEdit(this.state.id, {name: this.state.name, level: this.state.level});
    this.setState({editing: false});
  }

  cancelEdit() {
    this.setState({editing: false, name: this.props.name, level: this.props.level});
    this.props.onEdit(null);
  }
}

export default Hero;