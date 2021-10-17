import React, { useState, useEffect } from 'react'
import { Container, Col, Row } from 'react-bootstrap';

import './App.css';
//import Loading from './Loading'
import List from './List'
import Navigation from './Navigation'
import 'bootstrap/dist/css/bootstrap.min.css';
const url = 'https://course-api.com/react-tours-project'




function App() {

  const [list_data, setList] = useState([])

  const fetchTours = async () => {
    try {
      const response = await fetch(url)
      const list_data = await response.json()
      //console.log('ok')
      //console.log(list_data)
      setList(list_data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTours()
  }, [])

  return (

    
    <main>
      <Navigation></Navigation>
      <Container>
        <Row>
          <Col sm={8}>
            <List data={list_data}></List>
          </Col>
          <Col sm={4}>Next</Col>
        </Row>

      </Container>
   


    </main>



  );
}




export default App;
