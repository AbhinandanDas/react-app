import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div>
        <h1>404 :/ Page Not Found</h1>
        <h3> 
            Go to the <Link to='/'>home page </Link> 
        </h3>
    </div>
  )
}

export default PageNotFound