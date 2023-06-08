import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Cars from "./Components/Cars/Cars";
import Login from "./Components/Login/Login";
import Admin from "./Components/admin panel/Admin";
import Car from "./Components/Car/Car";
import UserAdmin from "./Components/UserAdmin/UserAdmin";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars/:category_id" element={<Cars />} />
        <Route path="/car/:car_id" element={<Car />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/useradmin" element={<UserAdmin />} />
      </Routes>
    </div>
  );
}

export default App;
