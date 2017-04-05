import React, { PropTypes } from 'react'
import Header from './header'

const App = ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
)

App.propTypes = {
  children: PropTypes.object.isRequired
}

export default App
