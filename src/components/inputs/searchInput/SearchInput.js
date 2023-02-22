import { Autocomplete, Box, InputBase } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import "./styles.css";
import { getFiltredCourses } from "../../../redux/features/coursesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "../../../utils/functions";

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
  backgroundColor: "white",
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

const SearchInput = ({ fromHome }) => {
  const query = useQuery();
  const navigate = useNavigate();
  const search_query = query.get("search_query");
  const [search, setSearch] = useState(search_query || "");
  const [filter, setFilter] = useState(false);
  const choices = useSelector((state) => state.courses.choices);
  const dispatch = useDispatch();

  useEffect(() => {
    if (search_query?.length) setSearch(search_query);
  }, [search_query]);

  useEffect(() => {
    if (search.length > 2) {
      dispatch(getFiltredCourses({ search_query: search, display: true }));
    }
  }, [dispatch, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!fromHome || (fromHome && search.length > 2))
      navigate(`/search?search_query=${search || "none"}`);
    setFilter(false);
  };

  return (
    <Autocomplete
      id="search"
      sx={{ width: "50%" }}
      forcePopupIcon={false}
      disableClearable
      options={search.length > 2 && filter ? choices : []}
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
                setFilter(true);
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) handleSearch(e);
                setFilter(false);
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
