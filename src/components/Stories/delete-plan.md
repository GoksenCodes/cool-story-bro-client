## Deleting a story from my page

// To delete on DB

- a button on the story to delete
  <!-- <Button variant="warning" onClick={() => deleteStory()}>
                      Delete story
                    </Button> -->

* simple action to fire a request to delete
  const deleteStory = () => console.log("delete story");

- an endpoint that takes that request
  router.delete("/:id/stories/:storyId", async (req, res, next) => {
  // get the storyId from params
  const { storyId } = req.params;
  try {
  // find the story
  const story = await Story.findByPk(storyId);
  //check if the story exists
  if (!story) {
  res.status(404).send("story not found");
  } else {
  const deletedStory = await story.destroy();
  res.json({ storyId });
  }
  } catch (e) {
  next(e);
  }
  });

// to update our frontend store

- got back the deleted id
  const onDelete = id => {
  console.log("delete story", id);
  dispatch(deleteStory(id));
- created simple action to delete from store
  dispatch(deleteStory(id));
- made a case in the reducer for STORY_DELETE_SUCCESS
  case STORY_DELETE_SUCCESS:
  const storyId = action.payload;
  const newStories = state.homepage.stories.filter(
  story => story.id !== storyId
  );
  return {
  ...state,
  homepage: {
  ...state.homepage,
  stories: newStories
  }
  };
- and filter out the story
  const newStories = state.homepage.stories.filter(
  story => story.id !== storyId
