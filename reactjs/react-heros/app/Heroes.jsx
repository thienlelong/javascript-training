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
  }

  render() {
    let heroes = this.state.heroes;
    return (
      <div className='heroes'>
        <p>Type to add new hero</p>
        <input className='add-hero' type='text' ref='heroName' onKeyPress={this.addHeroPress}/>
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
      level: 1
    });
    this.setState({heroes: heroes});
    //or using concat
    this.refs.heroName.value = '';
  }

  removeHero(id) {
    _.remove(this.state.heroes, {id: id});
    this.setState({heroes: this.state.heroes});
  }
}

export default Heroes;