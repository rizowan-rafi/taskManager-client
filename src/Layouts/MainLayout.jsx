import React from 'react'
import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'

const MainLayout = props => {
  return (
      <div className="">
          <nav></nav>
          <main className="flex justify-center items-center">
              <Outlet></Outlet>
          </main>
          <footer></footer>
      </div>
  );
}

MainLayout.propTypes = {}

export default MainLayout