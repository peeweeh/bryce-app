import React from 'react'
import { Container, Col, Row, Button, Form} from 'react-bootstrap';
import axios from "axios"; 
import Navigation from './Navigation'
import 'bootstrap/dist/css/bootstrap.min.css';

function FileUpload() {
  const [files, setUploadFile] = React.useState();
  
  const submitForm = (event) => {
    event.preventDefault();
    
    const data = new FormData();
    data.append("file", files[0]);
   
    axios
      .post("http://localhost:5000/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((response) => {
        // successfully uploaded response
      })
      .catch((error) => {
        // error response
      });
  };

  return (
    <main>
        <Navigation></Navigation>
        <Container>
          <Row>
            <Col sm={12}>
                <h2>Upload File</h2>
                <Form onSubmit={submitForm}>
                    <Form.Group controlId="formFileLg" className="mb-3">
                       
                        <Form.Control type="file" size="lg" name="file" onChange={(e) => setUploadFile(e.target.files)}/>
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

export default FileUpload;
