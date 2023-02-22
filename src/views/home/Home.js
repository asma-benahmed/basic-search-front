import SearchInput from "../../components/inputs/searchInput/SearchInput";
import "./styles.css";

function Home() {
  return (
    <div id="box" style={{ flexDirection: "column" }}>
      <SearchInput bgColor="#EBEAEB" color="black" fromHome />
    </div>
  );
}

export default Home;
