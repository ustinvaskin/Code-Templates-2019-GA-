import React from 'react'
import axios from 'axios'

class Register extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/register', this.state.data)
      .then(() => this.props.history.push('/login'))
      .catch(err => console.log(err))
  }

  render() {    
    return (
      <section className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <h2 className="title">Register</h2>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input 
                  className="input"
                  name="username"
                  placeholder="Username"
                  onChange = {this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input 
                  className="input"
                  name="email"
                  placeholder="Email"
                  onChange = {this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input 
                  className="input"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange = {this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password Confirmation</label>
              <div className="control">
                <input 
                  className="input"
                  name="passwordConfirmation"
                  type="password"
                  placeholder="Password Confirmation"
                  onChange = {this.handleChange}
                />
              </div>
            </div>
            <button type="submit" className="button is-warning is-fullwidth">Register</button>
          </form>
        </div>
      </section>
    )
  }
}

export default Register