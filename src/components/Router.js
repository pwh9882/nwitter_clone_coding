import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import EditProfile from "../routes/EditProfile";
import Home from "../routes/Home";
import Profile from "../routes/Profile";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path={"/"} element={<Home />} />
          </>
        ) : (
          <Route exact path="/" element={<Auth />} />
        )}

        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
