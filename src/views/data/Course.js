import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SearchInput from "../../components/inputs/searchInput/SearchInput";
import { getCourseById } from "../../redux/features/coursesSlice";
import { ThreeCircles } from "react-loader-spinner";
import NotFound from "./NotFound";

function Course() {
  const courses = useSelector((state) => state.courses);
  const { selectedCourse, loading } = courses;
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCourseById(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div id="box">
        <ThreeCircles
          height="80"
          width="80"
          radius="9"
          color="blue"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      </div>
    );
  }

  return (
    <main>
      <div
        id="header"
        style={{ position: "sticky", width: "100%", top: "0px" }}
      >
        <div style={{ padding: "0px 4vw" }}>
          <SearchInput bgColor="#EBEAEB" color="black" />{" "}
        </div>
      </div>
      {selectedCourse ? (
        <Grid style={{ padding: "1% 4% 1% 4%" }}>
          <h1>Course : {selectedCourse?.title}</h1>
          <h4>description : {selectedCourse?.description}</h4>
          <h4>Level : {selectedCourse?.level}</h4>
          <h4>Price : {selectedCourse?.price}</h4>
        </Grid>
      ) : (
        <NotFound search_query={id} />
      )}
    </main>
  );
}

export default Course;
