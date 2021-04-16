import React from 'react';
import { Button, Card as CardContainer} from 'react-bootstrap';
import {  ArrowRight } from 'react-feather';

export default function Card(props) {
    let {title, desc, url} = props;
    return (
        <CardContainer>
            <CardContainer.Header>Corresponds to queries: {url}</CardContainer.Header>
            <CardContainer.Body>
                <CardContainer.Title>{title}</CardContainer.Title>
                <CardContainer.Text>
                    {desc}
                </CardContainer.Text>
                <Button  onClick={()=>window.location.href=url} variant="primary"> Go <ArrowRight/></Button>
            </CardContainer.Body>
        </CardContainer>
    );
  }


