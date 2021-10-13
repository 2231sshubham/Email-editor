import React, {useRef} from 'react';
import EmailEditor from 'react-email-editor';
import styled from "styled-components"
import sample from "./sample_json/sample";
import 'bootstrap/dist/css/bootstrap.min.css';
const url = require('./config')
const axios = require('axios')


const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`;


const Create = (props) => {
  const emailEditorRef = useRef(null);

//// SAVE MY DESIGN

  const saveDesign = () => {
      emailEditorRef.current.editor.exportHtml((data) => {
        const { design, html } = data;
        var counters= design.counters;
        var body= design.body;
        var x = JSON.stringify(html)
        var obj = {
        counters : counters,
        body : body,
        html : x
      }
      axios.post(url.api_url,obj).then(res => (alert(res.data)));
      // axios.post(url.test_url,JSON.stringify(html)).then(res => console.log(res));
      console.log("Design",design);
      console.log('exportHtml', html);
      alert('Design JSON & Output HTML has been logged in your developer console.');
    })
  }


//// EDIT MY DESIGN

function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}

async function editDesign(){
    const obj = await axios.get(url.api_url)
    let counters = JSON.parse(obj.data.counters);
    let body = JSON.parse(obj.data.body);
    let design = {
      counters : counters,
      body : body
    }
    emailEditorRef.current.editor.loadDesign(design);
};




  //// FIRST LOAD

  const onLoad = async () => {
    console.log('onLoad');
    await timeout(1000);
    emailEditorRef.current.editor.loadDesign(sample)
  }


//// YOU READY?


  const onReady = () => {
    console.log('onReady');
  };


//// RETURN


  return (
      <Container>
      <div className="text-right">
      <button onClick={saveDesign} className="btn btn-outline-dark" type="button">Save</button><br></br>
      <button onClick={editDesign} className="btn btn-outline-dark" type="button">Edit</button>
      </div>
       <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
      </Container>
    )
}

export default Create;
