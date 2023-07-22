import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FirstPage from "./pages/firstpage";
import SecondPage from "./pages/secondpage";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<FirstPage />}>
            
          </Route>
          <Route path="/second" element={<SecondPage />}>
            
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
