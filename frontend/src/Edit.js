import React, { useState, useEffect, Component } from 'react';
import { Container, Col, Row,Button,Form } from 'react-bootstrap';
import {  useParams } from 'react-router-dom';

import axios from "axios"; 
import Navigation from './Navigation'
import 'bootstrap/dist/css/bootstrap.min.css';

const baseUrl="http://127.0.0.1:5000/product/";


class Edit extends Component {

    constructor(props) {
        super(props);
        //this.onChangePersonName = this.onChangePersonName.bind(this);
        //this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
        //this.onChangeGstNumber = this.onChangeGstNumber.bind(this);
        //this.onSubmit = this.onSubmit.bind(this);
        //this.token = useParams();
        this.state = {
            name: "",
            description: "",
            qty:"1",
            price:"1.0",
            photo: ""
          };
      }
     
      componentDidMount() {
        
        axios.get(baseUrl+this.props.id)
            .then(response => {
                console.log(response.data.description);
                console.log(this.state);
                this.setState({ 
                    name: response.data.name, 
                    description: response.data.description,
                    price: response.data.price,
                    qty: response.data.qty ,
                    photo: response.data.photo 
                });
            })
            .catch(function (error) {
                console.log(error);
            })
      }
  

    handleSubmit = e => {
      e.preventDefault();
      const data = {
        name: this.state.name,
        description: this.state.description,
        price: this.state.price,
        qty: this.state.qty,
        photo: this.state.photo

      };
      console.log(data);
      const json = JSON.stringify(data);
      console.log(json);
      axios
        .post(baseUrl+this.props.id, json, {
            method: 'POST',
            headers: {
              // Overwrite Axios's automatically set Content-Type
              'Content-Type': 'application/json'
            }
          })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    };
  
    render() {
      return (
        <main>
        <Navigation></Navigation>
        <Container>
          <Row>
            <Col sm={12}>
             
            <Form onSubmit = { this.handleSubmit }>
             
  
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control type="text" name="name"  value={this.state.name} onChange={e => this.setState({ name: e.target.value })}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" name="description"  value={this.state.description} onChange={e => this.setState({ description: e.target.value })}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="text" name="price"  value={this.state.price} onChange={e => this.setState({ price: e.target.value })}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type="text" name="qty"  value={this.state.qty} onChange={e => this.setState({ qty: e.target.value })}/>
              </Form.Group>    
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Photo</Form.Label>
                  <Form.Control type="text" name="photo"  value={this.state.photo} onChange={e => this.setState({ qty: e.target.value })}/>
              </Form.Group>    
              <Button variant="primary" type="submit">
                  Submit
              </Button>
              </Form>
  
  
  
  
            </Col>
          
          </Row>
      
        </Container>
     
  
  
      </main>
      );
    }
  }


export default Edit;
