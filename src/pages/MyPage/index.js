import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import Container from "react-bootstrap/Container";
import Loading from "../../components/Loading";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import MyPageForm from "./MyPageForm.js";
import StoryForm from "./StoryForm";
import Homepage from "../../components/Homepage";
import Stories from "../../components/Stories";

export default function MyPage() {
  const { token, homepage, id } = useSelector(selectUser); // we use this state to retrieve the stories
  const [editMode, setEditMode] = useState(false);
  const [postStoryMode, setpostStoryMode] = useState(false);
  const history = useHistory();

  //use effect normally fires on every render/state change. in [] we give dependency whihc says run useeffect only
  //when homepage state changes.

  //editmode default state is false, so it doesn't do anythhing unless editmode is tru
  //form is open
  useEffect(() => {
    editMode && setEditMode(false);
    postStoryMode && setpostStoryMode(false);
  }, [homepage]);

  if (token === null) {
    history.push("/");
  }

  if (!homepage) {
    return <Loading />;
  }

  const displayButtons =
    id === homepage.userId && editMode === false && postStoryMode === false;

  return (
    <div>
      <Homepage
        id={homepage.id}
        title={homepage.title}
        description={homepage.description}
        backgroundColor={homepage.backgroundcolor}
        color={homepage.color}
        showLink={false}
      />
      <Container>
        {displayButtons ? (
          <Card>
            <Button onClick={() => setEditMode(true)}>Edit my page</Button>
            <Button onClick={() => setpostStoryMode(true)} className="mt-2">
              Post a cool story bro
            </Button>
          </Card>
        ) : null}

        {editMode ? (
          <Card>
            <MyPageForm />
          </Card>
        ) : null}

        {postStoryMode ? (
          <Card>
            <StoryForm />
          </Card>
        ) : null}

        <Stories homepage={homepage} />
      </Container>
    </div>
  );
}
