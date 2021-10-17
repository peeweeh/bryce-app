import React from 'react';
import { ListGroup, Button, Table} from 'react-bootstrap';
const List = ({data}) => {
  // console.log(data)
    return (
        <section>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => {
              return <tr>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.description} </td>
                <td>{data.price}</td>
                <td>{data.qty}</td>
                <td><Button variant="primary">Edit</Button> <Button variant="danger">Delete</Button></td>
              
              </tr>;
            })}
          </tbody>
        </Table>
            
        </section>
    );
};
export default List;
