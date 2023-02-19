// import { Container } from "@mui/system";
import { Container, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SearchInput from "../../components/inputs/searchInput/SearchInput";
import { getCourseById } from "../../redux/features/coursesSlice";
// import { ThreeCircles } from "react-loader-spinner";

function Course() {
  const courses = useSelector((state) => state.courses);
  const { selectedCourse, loading } = courses;
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCourseById(id));
  }, [id]);

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
      {/* {loading ? (
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
      ) : ( */}
      <Container>
        <Grid>
          <h1>{selectedCourse?.title}</h1>
          <h4>{selectedCourse?.description}</h4>
          <h4>Level : {selectedCourse?.level}</h4>
          <h4>Price : {selectedCourse?.price} $</h4>
        </Grid>
      </Container>
      {/* )} */}
    </main>
  );
}

export default Course;
