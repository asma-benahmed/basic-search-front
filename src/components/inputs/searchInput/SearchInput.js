import { Autocomplete, Box, InputBase } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useEffect, useState } from "react";
import { styled /*, alpha*/ } from "@mui/material/styles";
import "./styles.css";
import { getFiltredCourses } from "../../../redux/features/coursesSlice";
import { useDispatch, useSelector } from "react-redux";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  // borderRadius: "20px",
  backgroundColor: "white",
  //   "&:hover": {
  //     backgroundColor: alpha(theme.palette.common.white, 0.25),
  //   },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("a")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SearchInput = (props) => {
  const query = useQuery();
  const navigate = useNavigate();
  const search_query = query.get("search_query");
  const [search, setSearch] = useState(search_query || "");
  const courses = useSelector((state) => state.courses.courses);
  const test = useSelector((state) => state.courses.test);
  const dispatch = useDispatch();

  useEffect(() => {
    if (search_query?.length) setSearch(search_query);
  }, [search_query]);

  useEffect(() => {
    if (search.length > 2) {
      dispatch(getFiltredCourses(search));
    }
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.length) navigate(`/search?search_query=${search || "none"}`);
  };

  return (
    <Autocomplete
      id="search"
      sx={{ width: "50%" }}
      forcePopupIcon={false}
      disableClearable
      options={search.length > 2 ? courses : []}
      //   options={props.offers
      //     ?.map((offer) => ({
      //       _id: offer?._id,
      //       name: offer?.name,
      //       type: "offer",
      //     }))
      //     .concat(
      //       props.companies?.map((company) => ({
      //         _id: company?._id,
      //         name: company?.name,
      //         type: "company",
      //       }))
      //     )}
      //   groupBy={(option) => option.type}
      //   loading={props.loading}
      inputValue={search}
      getOptionLabel={(option) => option.title || ""}
      renderOption={(props, option) => (
        <Link
          to={`/search?search_query=${option.title}`}
          key={option.id}
          style={{
            color: "inherit",
            textDecoration: "inherit",
          }}
        >
          <Box
            component="li"
            sx={{
              //   ":hover": { color: "#e8effe", borderRadius: "5px" },
              p: 0,
              m: 0,
              height: "30px",
            }}
            // {...props}
          >
            <Box
              sx={{
                ":hover": { backgroundColor: "#F0F0F0" },
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
                height: "100%",
                justifyContent: "space-between",
              }}
            >
              <p>
                <span>
                  <SearchIcon sx={{ width: "25px", height: "15px" }} />{" "}
                </span>
                {option.title}
              </p>
            </Box>
          </Box>
        </Link>
      )}
      renderInput={(params) => {
        const { InputLabelProps, InputProps, ...rest } = params;
        return (
          <Search className="search_input">
            <SearchIconWrapper
              type="submit"
              aria-label="search"
              onClick={handleSearch}
              style={{
                backgroundColor: "#0F4798",
                color: "white",
                border: "1px solid #0F4798",
                marginTop: "-1px",
              }}
            >
              <SearchIcon onClick={handleSearch} />
            </SearchIconWrapper>
            <StyledInputBase
              {...params.InputProps}
              {...rest}
              sx={{ flex: 1 }}
              onChange={(e) => {
                setSearch(e.target.value.trimStart());
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) handleSearch(e);
              }}
              placeholder={"Search"}
              inputProps={{
                ...params.inputProps,
              }}
            />
          </Search>
        );
      }}
    />
  );
};

export default SearchInput;
