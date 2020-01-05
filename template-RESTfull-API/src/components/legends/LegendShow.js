import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import AuthToken from '../../lib/AuthToken'
import AddComment from './AddComment'
import LegendsIndex from './LegendsIndex'

class LegendShow extends React.Component {
  constructor() {
    super()

    this.state = {
      legend: null, 
      errors: null,
      data: ''
    }

    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.getLegend()
  }

  getLegend() {
    const id = this.props.match.params.id
    axios.get(`/api/legends/${id}`)
      .then(res => this.setState({ legend: res.data }))
      .catch(err => console.log(err))
  }

  handleDelete() {
    const id = this.props.match.params.id
    axios.delete(`/api/legends/${id}`, {
      headers: { Authorization: `Bearer ${AuthToken.getToken()}` }
    })
      .then(() => this.props.history.push('/legends'))
      .catch(err => console.log(err))
  }
  

  handleChange(event) {
    this.setState({ data: event.target.value })
    console.log(this.state.data)
  }

  handleSubmit(e) {
    e.preventDefault()
    const id = this.props.match.params.id
    axios.post(`/api/legends/${id}/comments/`, { text: this.state.data }, {
      headers: { Authorization: `Bearer ${AuthToken.getToken()}` }
    })
      .then(res => console.log(res))
      .catch(err => console.log(err))
    this.setState({ data: '' })
    this.componentDidMount()
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

  // handleSubmit(e) {
  //   e.preventDefault()
  //   const cheeseId = this.props.match.params.id
  //   axios.put(`https://cheesebored.herokuapp.com/cheeses/${cheeseId}`, this.state.data, {
  //     headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //   })
  //     .then(res => {
  //       this.props.history.push(`/cheeses/${res.data._id}`)
  //     })
  //     .catch(err => this.setState({ errors: err.response.data.errors }))
  //   console.log('submitted')
  // }


  isOwner() {
    return AuthToken.getPayload().sub === this.state.legend.user._id
  }

  isOwnerComment() {
    // return AuthToken.getPayload().sub === this.state.legend.comments.user._id
  }

  render() {
    console.log('render')
    const { legend } = this.state
    if (!legend) return null
    console.log(legend)
    console.log(legend.comments)
    return (
      <>
            <section className="section">
              <div className="container">
                <h2 className="title">{legend.fullName}</h2>
                <hr />
                <div className="columns is-multiline is-mobile">
                  <div className="column is-half">
                    <figure className="image">
                      <img src={legend.image} alt={legend.fullName} /> 
                    </figure>
                  </div>
                  <div className="column is-half">
                    <h4 className="title is-4">Famous Projects</h4>
                    <ul>
                      {legend.famousProject.map(project => (
                        <li key={project}>{project}</li>
                      ))}
                    </ul>
                    <hr />
                    <h4 className="title is-4">Year of Birth - Year of Death</h4>
                    <p>{legend.yearBorn} - {legend.yearofDeath}</p>
                    <hr/>
                    { legend.whyALegend &&
                    <>
                    <h4 className="title is-4">Additional notes</h4>
                      <p>{legend.whyALegend}</p>
                    <hr/>
                    </>
                    }
                    {this.isOwner() &&
                    <>
                      <Link to={`/legends/${legend._id}/edit`} className="button is-warning">Edit</Link>
                        <button onClick={this.handleDelete} className="button is-danger">Delete </button>
                    </>
                    }
                    <div className="column is-centered">
                      <h4 className="title is-4">COMMENTS</h4>
                      <AddComment 
                        data={this.state.data}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                      />
                      <hr/>
                      { legend.comments &&
                    <div className="container">
                      <ul>
                        {legend.comments.map(comment => (
                          <>
                          <li key={comment._id}>{comment.text} - comment by {comment.user.username}</li>
                          {this.isOwnerComment() &&
                          <button className="button is-danger">Delete </button>
                          }
                          </>
                        ))}
                      </ul>
                      <hr/>
                    </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </section>
      </>
    )
  }
}

export default LegendShow



{/* <form onSubmit={this.handleSubmit}>
<textarea 
  className="textarea"
  placeholder="Your Comments"
  name="Comments"
  onChange={this.handleChange}
  value={legend.comments.text}
/>
<button type="submit" className="button">Add a Comment </button>
</form> */}

{/* <AddComment 
data={this.state.data}
handleChange={this.handleChange}
handleSubmit={this.handleSubmit}
errors={this.state.errors} */}