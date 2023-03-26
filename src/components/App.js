import firebase from "../Firebase";
import AppRouter from "./Router";

function App() {
  console.log(firebase);
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
