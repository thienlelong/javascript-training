import React from 'react';
import Hero from './Hero.jsx';
import uuid from 'node-uuid';
import _ from 'underscore';
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
  }
  render() {
    let heroes = this.state.heroes;
    return (
      <div className='heroes'>
        <p>Type to add new hero</p>
        <input className='add-hero' type='text' ref='heroName'/>
        <div className='heroes-list'>
          <p>Heroes:</p>
            {
              heroes.map(hero =>
                <Hero
                  key={hero.id}
                  id={hero.id}
                  level={hero.level}
                  name={hero.name}
                >
                </Hero>
              )
            }
        </div>
    </div>
    );
  }
}

export default Heroes;