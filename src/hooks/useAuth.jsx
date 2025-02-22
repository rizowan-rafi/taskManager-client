import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { authContext } from '../Provider/authProvider'

const useAuth = props => {
    
    const auth = useContext(authContext);
    return auth;
}

useAuth.propTypes = {}

export default useAuth