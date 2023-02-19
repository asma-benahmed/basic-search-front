import React, { useState } from "react";
import { Container, Grid, /*Divider,*/ Pagination } from "@mui/material";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchInput from "../../components/inputs/searchInput/SearchInput";
import DataItemTitle from "../../components/cards/DataItemTitle";
import NotFound from "./NotFound";
import { getFiltredCourses } from "../../redux/features/coursesSlice";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const DataFiltred = (props) => {
  const query = useQuery();
  const courses = useSelector((state) => state.courses.courses);
  const dispatch = useDispatch();
  const search_query = query.get("search_query");

  useEffect(() => {
    if (search_query.length > 2) {
      dispatch(getFiltredCourses(search_query));
    }
  }, [search_query]);

  return (
    <main>
      <div
        id="header"
        style={{ position: "sticky", width: "100%", top: "0px" }}
      >
        <div style={{ padding: "0px 4vw" }}>
          {" "}
          <SearchInput bgColor="#EBEAEB" color="black" />{" "}
        </div>
      </div>

      {courses.length ? (
        <div style={{ height: "100vh" }}>
          <Container>
            <Grid
              sx={{
                pt: 3,
              }}
            >
              {courses.map((course) => (
                <Grid
                  sx={{
                    mb: 3,
                  }}
                >
                  <DataItemTitle
                    title={course.title}
                    discription={course.discription}
                    search_query={search_query}
                    courseId={course._id}
                  />
                  <p style={{ color: "grey", marginTop: "-10px" }}>
                    {course?.description?.slice(0, 100)}{" "}
                    {course?.description?.length > 100 && "..."}
                  </p>
                </Grid>
              ))}
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <Pagination
                count={5}
                page={+page}
                onChange={(e, v) => setPage(v)}
                color="primary"
                style={{ margin: "15px 0px" }}
              /> */}
            </Grid>
          </Container>
        </div>
      ) : (
        <NotFound search_query={search_query} />
      )}
    </main>
  );
};

export default DataFiltred;
