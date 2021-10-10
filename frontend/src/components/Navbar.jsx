import React from 'react';
import {Link} from 'react-router-dom';

function Navbar(){

  return (

      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Email-Editor</span>
          <div className="text-right">
          <Link to='/create'><button className="btn btn-outline-dark" type="button">Create</button></Link>
          </div>
          <div>
          <Link to='/form'><button className="btn btn-outline-dark" type="button">Send</button></Link>
          </div>
        </div>
      </nav>
    )
  }

export default Navbar
