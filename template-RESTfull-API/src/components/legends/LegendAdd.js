import React from 'react'
import axios from 'axios'
import Select from 'react-select'
import Creatable from 'react-select/creatable'
import CreatableSelect from 'react-select/creatable'

import AuthToken from '../../lib/AuthToken'
import LegendAddForm from './LegendAddForm'

const components = {
  DropdownIndicator: null
}

class LegendAdd extends React.Component {
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

    this.options = [
      { value: 'ENIAC', label: 'ENIAC' },
      { value: 'UNIVAC', label: 'UNIVAC' },
      { value: 'BINAC', label: 'BINAC' }
    ]

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleMultiSelect = this.handleMultiSelect.bind(this)
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/legends', this.state.data, {
      headers: { Authorization: `Bearer ${AuthToken.getToken()}` }
    })
      .then(res => {
        this.props.history.push(`/legends/${res.data._id}`)
      })
      .catch(err => console.log(err))
    console.log('submitted')
  }

  handleMultiSelect(selected) {
    console.log(selected)
    const famousProject = selected ? selected.map( item => item.value) : []
    const data = { ...this.state.data, famousProject }
    this.setState({ data })
    console.log(data)
  }

  render() {
    console.log('re render', this.state.data)
    return (
      <section className="section">
        <div className="container">
          <LegendAddForm 
            data={this.state.data}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            errors={this.state.errors}
            handleMultiSelect={this.handleMultiSelect}
            components={components}
            options={this.options}
          />
        </div>
      </section>
    )
  }
}

export default LegendAdd

//handleChangeCreatable={this.handleChangeCreatable}

// {
//   fullName: 'Adele Goldstine née Katz', 
//   gender: 'female',
//   yearBorn: 1920, 
//   yearofDeath: 1964, 
//   image: 'https://pbs.twimg.com/media/DDJu2YWXUAA1o8P.jpg',
//   famousProject: ['ENIAC'],
//   whyALegend:  'The seventh member of the ENIAC 6. she was also an instrumental player in converting the ENIAC from a computer that needed to be reprogrammed each time it was used to one that was able to perform a set of fifty stored instructions.'
// }

// .then(res => {
//   this.props.history.push(`/legends/${res.data._id}`)
// })
