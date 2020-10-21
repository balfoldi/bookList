import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Book = (props) => {
  const [favorite, setFavorite] = useState(false);
  const [toRead, setToRead] = useState(false);

//  props.displayFavorite(favorite, setToDisplay)

  const {thumbnailUrl, title, shortDescription} = props

  const checkDisplay = () => {
    if(props.displayToRead && props.displayFavorite){
      return (favorite || toRead)
    }else if(props.displayToRead){
      return toRead
    }else if(props.displayFavorite){
      return favorite
    }else{
      return true
    }
  }

  return(
    <>
      {checkDisplay() &&
      <Card className="mb-5" style={{ width: '25rem' }} >
      <Card.Img variant="top" src={thumbnailUrl} alt="" />
      <Card.Body>
      <Card.Title>{title}</Card.Title>
        <Card.Text>
          <p>{shortDescription}</p>
        </Card.Text>
        <div className="d-flex justify-content-around">
          <p>{favorite ? "is favorite" : "_"}</p>
          {toRead && <p>is to read</p>}
        </div>
        <Button onClick={() => {setFavorite(!favorite); console.log(favorite)}} variant="primary">Add favorite</Button>{' '}
        <Button onClick={() => {setToRead(!toRead)}} variant="warning">Add to read </Button>
      </Card.Body>
      </Card>}
    </>
  )
}
export default Book
    