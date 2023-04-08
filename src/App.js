import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignUp from "./pages/SignUp";
import MainScreen from "./pages/MainScreen";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={"/"} element={<SignUp/>}/>
          <Route path={"/MainScreen"} element={<MainScreen/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
