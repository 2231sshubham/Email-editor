import React, {useRef} from 'react';
import EmailEditor from 'react-email-editor';
import styled from "styled-components"
import sample from "./sample_json/sample";
import {} from "react-router-dom";
const url = require('./config')
const axios = require('axios')

// const port = process.env.PORT || 3001;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`;


const App = (props) => {
  const emailEditorRef = useRef(null);

//// EXPORT MY HTML

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log('exportHtml', html);
      alert('Output HTML has been logged in your developer console.');
    });
  };




//// SAVE MY DESIGN

  const saveDesign = () => {

      emailEditorRef.current.editor.saveDesign((design) => {
      let counters= design.counters;
      let body= design.body;
      let obj = {
        counters : counters,
        body : body
      }
      axios.post(url.api_url,obj).then(res => (alert(res.data)));
      console.log("Design",design);
      alert('Design JSON has been logged in your developer console.');
      exportHtml();
    });
  };


//// EDIT MY DESIGN "http://localhost:"+port



async function editDesign(){
    const obj = await axios.get(url.api_url)
    let counters = JSON.parse(obj.data.counters);
    let body = JSON.parse(obj.data.body);
    let design = {
      counters : counters,
      body : body
    }
    if(design.isEmpty()){
      alert("Template not found, please save first!")
    }
    else{
      emailEditorRef.current.editor.loadDesign(design);
    }
};




  //// FIRST LOAD

  const onLoad = () => {
    console.log('onLoad');
    emailEditorRef.current.editor.loadDesign(sample)
  }


//// YOU READY?


  const onReady = () => {
    console.log('onReady');
  };


//// RETURN


  return  <Container>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Email-Editor</span>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">

            <button onClick={saveDesign} className="btn btn-outline-dark me-md-2" type="button">Save</button>
            <button onClick={editDesign} className="btn btn-dark btn-primary" type="button">Edit</button>

          </div>
        </div>
      </nav>
   <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
  </Container>
};

export default App;
