import React,{useState} from "react"
import axios from "axios"
const url = require('./config')


function Form(){
  const[input,setInput] = useState({
    to: '',
    subject: '',
    body: ''
  })


  function handleChange(event) {
    const{name,value} = event.target;

    setInput(prevInput => {
      return {
        ...prevInput,
        [name] : value
      }});
    }

  function handleClick(event){

    const formData = {
      to : input.to,
      subject : input.subject,
      body : input.body,
    }
    axios.post(url.form_url,formData);
  }
  return (
  <div className='container'>
      <form>

        <label>To: </label>
        <div className = 'form-group'>
          <input type="email" name='to' onChange={handleChange} value={input.to} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
        </div>

        <div className="form-group">
        <label>Subject: </label>
        <input type="text" name='subject' onChange={handleChange} value={input.subject} className="form-control" id="formGroupExampleInput"></input>
        </div>

        <div className="form-group">
          <label>Body: </label>
          <textarea name='body' onChange={handleChange} value={input.body} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
         <br></br>
        <button  onClick={handleClick} className="btn btn-info">Submit</button>
      </form>
    </div>
  )
}

export default Form;
