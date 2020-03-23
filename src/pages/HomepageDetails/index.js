import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Homepage from "../../components/Homepage";
import Stories from "../../components/Stories";
import { getHomepageById } from "../../store/homepageDetails/actions";
import { selectHomepageDetails } from "../../store/homepageDetails/selectors";

export default function HomepageDetails() {
  const { id } = useParams();
  console.log("HOMEPAGE ID", id);

  const homepage = useSelector(selectHomepageDetails);
  console.log(homepage);
  console.log(homepage.stories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomepageById(id));
  }, [dispatch, id]);

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
      <Stories homepage={homepage} />
    </div>
  );
}
