import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LookupContextProvider } from "./context/lookup_context";
import MainPage from "./pages/mainPage";


function App() {





  return (
    <LookupContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
    </LookupContextProvider>
  );
}





export default App;
