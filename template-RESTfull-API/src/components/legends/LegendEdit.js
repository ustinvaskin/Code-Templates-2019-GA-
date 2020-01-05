import React from 'react'
import axios from 'axios'

import AuthToken from '../../lib/AuthToken'
import LegendAddForm from './LegendAddForm'

class LegendEdit extends React.Component {
  constructor() {
    super()

    this.state = { 
      data: {
        fullName: '',
        gender: '',
        yearBorn: '',
        yearofDeath: '',
        image: '', 
        famousProject: '',
        whyALegend: ''
      },
      errors: {

      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    console.log(this.props.match.params.id)
    const id = this.props.match.params.id
    axios.get(`/api/legends/${id}`)
      .then(res => this.setState( { data: res.data }))
      .catch(err => console.log(err))
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  // handleSubmit(e) {
  //   e.preventDefault()
  //   //console.log(this.state.data)
  //   const id = this.props.match.params.id
  //   axios.put(`/api/legends/${id}`, this.state.data, {
  //     headers: { Authorization: `Bearer ${AuthToken.getToken()}` }
  //   })
  //     .then(res => {
  //       this.props.history.push(`/legends/${res.data._id}`)
  //     })
  //     .catch(err => this.setState({ errors: err.response.data.errors }))
  //   console.log('submitted')
  // }

  handleSubmit(e) {
    e.preventDefault()
    const id = this.props.match.params.id
    console.log(id)
    axios.put(`/api/legends/${id}`, this.state.data, {
      headers: { Authorization: `Bearer ${AuthToken.getToken()}` }
    })
      .then(res => {
        this.props.history.push(`/legends/${res.data._id}`)
      })
      .catch(err => console.log(err))
    console.log('submitted')
  }
  // handleSubmit(e) {
  //   e.preventDefault()
  //   axios.post('/api/legends', this.state.data, {
  //     headers: { Authorization: `Bearer ${AuthToken.getToken()}` }
  //   })
  //     .then(res => {
  //       this.props.history.push(`/legends/${res.data._id}`)
  //     })
  //     .catch(err => console.log(err))
  //   console.log('submitted')
  // }

  render() {
    console.log(this.state.data)
    return (
      <section className="section">
        <div className="container">
          <LegendAddForm
            data={this.state.data}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            errors={this.state.errors}
          />
        </div>
      </section>
    )
  }
} 

export default LegendEdit