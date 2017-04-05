import React, { Proptypes } from 'react'
import Header from './header'

const App = ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
)

App.propTypes = { children: Proptypes.object.isRequired }

export default App
