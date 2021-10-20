import React, { useState, useEffect } from 'react'
import { Container, Col, Row,Button } from 'react-bootstrap';

import './App.css';
//import Loading from './Loading'
import List from './List'
import Navigation from './Navigation'
import 'bootstrap/dist/css/bootstrap.min.css';
const url = 'http://localhost:5000/product'




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
          <Col sm={12}>
            <List data={list_data}></List>
          </Col>
        
        </Row>

      </Container>
   


    </main>



  );
}




export default App;
