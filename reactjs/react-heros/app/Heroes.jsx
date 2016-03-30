import React from 'react';
import Hero from './Hero.jsx';
import uuid from 'node-uuid';
import _ from 'lodash';
import '../css/style.css';

class Heroes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heroes: [
        {
          id: uuid.v4(),
          name: 'Shadow Fiend',
          level: 1
        },
        {
          id: uuid.v4(),
          name: 'Juggenaut',
          level: 2
        },
        {
          id: uuid.v4(),
          name: 'Storm Spirit',
          level: 3
        }
      ]
    };

    //bind function
    this.addHero = this.addHero.bind(this);
    this.addHeroPress = this.addHeroPress.bind(this);
    this.removeHero = this.removeHero.bind(this);
    this.editHero = this.editHero.bind(this);
  }

  render() {
    let heroes = this.state.heroes;
    return (
      <div className='heroes'>
        <p>Type to add new hero</p>
        <p>Name: <input className='add-hero' type='text' ref='heroName' onKeyPress={this.addHeroPress}/></p>
        <p>Level: <input className='add-hero' type='text' ref='heroLevel' onKeyPress={this.addHeroPress}/></p>
        <div className='heroes-list'>
          <p>Heroes:</p>
            {
              heroes.map(hero =>
                <Hero
                  key={hero.id}
                  id={hero.id}
                  level={hero.level}
                  name={hero.name}
                  onRemove={this.removeHero}
                  onEdit={this.editHero}
                >
                </Hero>
              )
            }
        </div>
    </div>
    );
  }

  addHeroPress(event) {
    if (event.key == 'Enter') {
      this.addHero();
    }
  }

  addHero() {
    let heroes = this.state.heroes.slice();
    heroes.push({
      id: uuid.v4(),
      name: this.refs.heroName.value,
      level: this.refs.heroLevel.value
    });
    this.setState({heroes: heroes});
    //or using concat
    this.refs.heroName.value = '';
    this.refs.heroLevel.value = '';
  }

  editHero(id, newHero) {
    let index = _.findIndex(this.state.heroes, {id: id});
    if(index !==-1) {
      this.state.heroes[index].name = newHero.name;
      this.state.heroes[index].level = newHero.level;
    }
    this.setState({heroes: this.state.heroes});
  }

  removeHero(id) {
    _.remove(this.state.heroes, {id: id});
    this.setState({heroes: this.state.heroes});
  }
}

export default Heroes;