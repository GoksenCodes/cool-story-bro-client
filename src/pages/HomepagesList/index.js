import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomepagesThunk } from "../../store/homepages/actions";
import { selectHomepages } from "../../store/homepages/selectors";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Homepage from "../../components/Homepage";

export default function HomepagesList() {
  const dispatch = useDispatch();
  const homepages = useSelector(selectHomepages);

  useEffect(() => {
    dispatch(getHomepagesThunk());
  }, [dispatch]);

  return (
    <div>
      <Jumbotron>
        <h1>Homepages</h1>
      </Jumbotron>
      <Container>
        {homepages.map(homepage => {
          return (
            <Homepage
              key={homepage.id}
              id={homepage.id}
              title={homepage.title}
              description={homepage.description}
              backgroundColor={homepage.backgroundcolor}
              color={homepage.color}
              showLink={true}
            />
          );
        })}
      </Container>
    </div>
  );
}
