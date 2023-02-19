import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/home/Home";
import Course from "./views/data/Course";
import DataFiltred from "./views/data/DataFiltred";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />{" "}
        <Route path="/search" element={<DataFiltred />} />
        <Route path="/course/:id" element={<Course />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
