// import firebaseApp from "FirebaseInstance";
import { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "FirebaseApp";

function App() {
  // console.log(process.env.REACT_APP_API_KEY);
  console.log(authService.currentUser);

  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <div className="App">
      <AppRouter isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default App;
