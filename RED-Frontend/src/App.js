import "./App.css"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from './pages/Home';
import HomeRespo from "./responsable/HomeRespo";
import AddRespo from "./responsable/AddRespo"
import EditRespo from "./responsable/EditRespo"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddRedproduct from "./redProduct/AddRedProduct";
import EditRedProduct from "./redProduct/EditRedProduct";
import HomeRedproduct from "./redProduct/HomeRedproduct";
import HomeLc from "./LC/HomeLc";
import AddLc from "./LC/AddLc";
import EditLc from "./LC/EditLc";



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addRedProduct" element={<AddRedproduct />} />
          <Route exact path="/editredproduct/:id" element={<EditRedProduct />} />
          <Route exact path="/homeRespo" element={<HomeRespo />} />
          <Route exact path="/addRespo" element={<AddRespo />} />
          <Route exact path="/editrespo/:id" element={<EditRespo />} />
          <Route exact path={"/homeRedproduct"} element={<HomeRedproduct />} />
          <Route exact path={"/homeLc"} element={<HomeLc />} />
          <Route exact path={"/addLc"} element={<AddLc />}/>
          <Route exact path={"/editLc/:id"} element={<EditLc />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
