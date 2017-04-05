import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

class Signin extends Component {
  constructor(props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  handleFormSubmit({ email, password }) {
    console.log(email, password) // eslint-disable-line
  }
  render() {
    const { handleSubmit, fields: { email, password } } = this.props

    return (
      <div>
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <fieldset className="form-group">
            <label htmlFor="email">Email:</label>
            <input {...email} className="form-control" />
            <label htmlFor="password">Password:</label>
            <input {...password} className="form-control" />
          </fieldset>
          <button type="submit" className="btn btn-primary">Sign in</button>
        </form>
      </div>
    )
  }
}

Signin.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
})(Signin)
