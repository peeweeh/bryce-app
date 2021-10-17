import React from 'react';
import { ListGroup} from 'react-bootstrap';
const List = ({data}) => {
  // console.log(data)
    return (
        <section>
 
            
        <ListGroup>
        {data.map((data) => {
          return <ListGroup.Item>{data.name} </ListGroup.Item>;
        })}
         </ListGroup>
        </section>
    );
};
export default List;
