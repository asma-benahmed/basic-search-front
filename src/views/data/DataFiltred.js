import React /*, { useState }*/ from "react";
import { Grid /*Divider, Pagination*/ } from "@mui/material";
import { useEffect } from "react";
import SearchInput from "../../components/inputs/searchInput/SearchInput";
import DataItemTitle from "../../components/cards/DataItemTitle";
import NotFound from "./NotFound";
import { getFiltredCourses } from "../../redux/features/coursesSlice";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { ThreeCircles } from "react-loader-spinner";
import { useQuery } from "../../utils/functions";

const DataFiltred = () => {
  const query = useQuery();
  const { courses, loading } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const search_query = query.get("search_query");

  useEffect(() => {
    if (search_query.length > 2) {
      dispatch(getFiltredCourses({ search_query }));
    }
  }, [search_query, dispatch]);

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
          {" "}
          <SearchInput bgColor="#EBEAEB" color="black" />{" "}
        </div>
      </div>
      {!!courses.length ? (
        <div style={{ height: "100vh" }}>
          <Grid style={{ padding: "1% 4% 1% 4%" }}>
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
          ></Grid>
        </div>
      ) : (
        <NotFound search_query={search_query} fromList />
      )}
    </main>
  );
};

export default DataFiltred;
