import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function Homepage(props) {
  return (
    <Jumbotron
      style={{
        backgroundColor: props.backgroundColor,
        color: props.color
      }}
    >
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      {props.showLink ? (
        <Link to={`/homepages/${props.id}`}>
          <Button>Visit page</Button>
        </Link>
      ) : null}
    </Jumbotron>
  );
}
