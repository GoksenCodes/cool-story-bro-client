import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

export default function Stories(props) {
  console.log(props);
  const [count, setCount] = useState(0);
  return (
    //since stories under homepage we need to get it via props the map it as story. ..
    // if there was only one we wouldn;t need component and map it as homepage.stories in homepagedetails page
    <div>
      <Carousel className="mt-5">
        {console.log("=======", props.homepage.stories)}
        {props.homepage.stories.map(story => {
          console.log("?????", story);
          return (
            <Carousel.Item key={story.id}>
              {story.imageurl ? (
                <img
                  className="d-block w-100"
                  src={story.imageurl}
                  alt={story.name}
                />
              ) : null}
              <Carousel.Caption
                style={{
                  backgroundColor: "transparent",
                  color: props.homepage.color
                }}
                className="p-5"
              >
                <h4>{story.name}</h4>
                <p>{story.content}</p>
                <p>This story is liked {count} times</p>
                <button onClick={() => setCount(count + 1)}>Like</button>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}
