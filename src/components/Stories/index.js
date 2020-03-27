import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { deleteStory, likeStory } from "../../store/user/actions";

export default function Stories(props) {
  console.log(props);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const onDelete = id => {
    console.log("delete story", id);
    dispatch(deleteStory(id));
  };

  const onLike = id => {
    dispatch(likeStory(id));
  };

  return (
    //since stories under homepage we need to get it via props the map it as story. ..
    // if there was only one we wouldn;t need component and map it as homepage.stories in homepagedetails page
    <div>
      <Carousel className="mt-5">
        {console.log("=======", props.homepage.stories)}
        {props.homepage.stories.map(story => {
          const numberoflikes = story.users.length; //number pf users on likes equals to number ot likes
          // since we pass it it map, we write the const in map
          console.log("LIKE STORY", story);
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
                <div>
                  <Button variant="danger" onClick={() => onLike(story.id)}>
                    {/*it is story.id becasue it comes form mapping the story properties*/}
                    Like
                  </Button>
                  <p>{numberoflikes} Likes</p>
                </div>
                <div>
                  <Button variant="warning" onClick={() => onDelete(story.id)}>
                    {" "}
                    {/*it is story.id becasue it comes form mapping the story properties*/}
                    Delete story
                  </Button>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}
