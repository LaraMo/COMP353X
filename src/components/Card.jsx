import React from 'react';
import { Button, Card as CardContainer} from 'react-bootstrap';

export default function Card(props) {
    let {title, desc, queries, url} = props;
    return (
        <CardContainer>
            <CardContainer.Header>Corresponds to queries: {queries}</CardContainer.Header>
            <CardContainer.Body>
                <CardContainer.Title>{title}</CardContainer.Title>
                <CardContainer.Text>
                    {desc}
                </CardContainer.Text>
                <Button  onClick={()=>window.location.href=url} variant="primary">Go</Button>
            </CardContainer.Body>
        </CardContainer>
    );
  }


