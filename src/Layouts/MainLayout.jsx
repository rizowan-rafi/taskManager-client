import React from 'react'
import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'

const MainLayout = props => {
  return (
      <div>
          <nav></nav>
          <main>
              <Outlet></Outlet>
          </main>
          <footer></footer>
    </div>
  )
}

MainLayout.propTypes = {}

export default MainLayout