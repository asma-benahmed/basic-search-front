import oops from "../../assets/oops.png";

function NotFound(props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "10% 0%",
      }}
    >
      <div style={{ marginBottom: "15px" }}>
        <img src={oops} alt="oops" />
      </div>
      <div>
        Sorry! We couldn’t find any data{" "}
        {props.fromList ? "matching" : "with ID"} "{" "}
        <span style={{ color: "#0F4798", fontWeight: "bold" }}>
          {props.search_query}
        </span>{" "}
        "
      </div>{" "}
    </div>
  );
}

export default NotFound;
