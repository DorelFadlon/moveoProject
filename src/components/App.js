import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "./UpdateProfile";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHight: "100vh" }}
    >
      <div className="w-100 mt-4" style={{ maxWidth: "400px" }}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              >
                <Route exact path="/" element={<Dashboard />} />
              </Route>
              <Route path="/update-profile" element={<UpdateProfile />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </Router>
        </AuthProvider>
      </div>
    </Container>
  );
}

export default App;
