import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
export default function App() {
  const routes = (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
  return <div>{routes}</div>;
}
