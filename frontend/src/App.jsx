import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AfterLogin from "./components/Afterlogin";
import ProtectedRoute from "./components/ProtctedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/after-login" element={
          <ProtectedRoute><AfterLogin /></ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
