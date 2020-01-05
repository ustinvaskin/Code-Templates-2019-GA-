import React from 'react'
import axios from 'axios'
import 'bulma' 

import LegendCard from './LegendCard'


class LegendsIndex extends React.Component {
  constructor() {
    super() 

    this.state = {
      legends: null
    }

  }

  componentDidMount() {
    axios.get('/api/legends')
      .then(res => this.setState({ legends: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    const { legends } = this.state
    if (!legends) return null
    console.log('render')
    console.log(legends)
    return (
      <div className="main-page">
        <h1 className="title is-1 has-text-centered">Tech Legends</h1>
        <section className="section">
          <div className="container">
            <div className="columns is-mobile is-multiline">
              {legends.map(legend => (
                <LegendCard key={legend._id} {...legend} />
              ))
              }   
            </div>
          </div> 
        </section>
      </div>
    )
  }
}

export default LegendsIndex