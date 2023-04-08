// import firebaseApp from "FirebaseInstance";
import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "FirebaseApp";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  // console.log(process.env.REACT_APP_API_KEY);
  // console.log(authService.currentUser);
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      // user ? setIsLoggedIn(true) : setIsLoggedIn(false);
      if (user) {
        setIsLoggedIn(true);

        setUserObj({ displayName: user.displayName, uid: user.uid });
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
      console.log();
    });
  }, []);

  const refreashUser = () => {
    const user = authService.currentUser;
    setUserObj({ displayName: user.displayName, uid: user.uid });
  };

  return (
    <div className="App">
      {init ? (
        <AppRouter
          isLoggedIn={isLoggedIn}
          userObj={userObj}
          refreashUser={refreashUser}
        />
      ) : (
        "Initializing..."
      )}
    </div>
  );
}

export default App;
