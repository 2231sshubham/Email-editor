import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Form from "./components/Form"
import Create from "./components/Create"

function App (){
  return (
    <Router>
      <Navbar/>
        <Route path='/create' exact>
          <Create/>
        </Route>

        <Route path='/form' exact>
          <Form/>
        </Route>
  </Router>

  )
}

export default App
