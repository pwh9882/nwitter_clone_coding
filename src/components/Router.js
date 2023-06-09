import React, { useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ isLoggedIn, userObj, refreashUser }) => {
  return (
    <Router>
      <header></header>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path={"/"} element={<Home userObj={userObj} />} />
          </>
        ) : (
          <Route exact path="/" element={<Auth />} />
        )}

        <Route
          path="/profile"
          element={<Profile userObj={userObj} refreashUser={refreashUser} />}
        />
        <Route path="*" element={<Navigate to={"/"} replace={true} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
