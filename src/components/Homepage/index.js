import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectMyHomepage } from "../../store/user/selectors";
import { selectToken } from "../../store/user/selectors";

export default function Homepage(props) {
  const homepage = useSelector(selectMyHomepage);
  // first I tried to get homepage.id with slecetHomepage selector, but it returned undefined since page was rendering independet from logged in user
  //and homepage.id in this selector depends on a logged in user. Thus I added selectoken selector to be able to check if user have the token so I can get homepage.id
  const token = useSelector(selectToken);
  console.log(token);

  console.log("PROPS", props, homepage);

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
        <Link
          to={token && homepage.id == props.id ? "/mypage" : `/${props.id}`}
        >
          <Button>Visit page</Button>
        </Link>
      ) : null}
    </Jumbotron>
  );
}
