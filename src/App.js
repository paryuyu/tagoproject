import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LookupClassContextProvider } from "./context/lookup_class_context";
import { LookupContextProvider } from "./context/lookup_context";
import MainPage from "./pages/mainPage";

function App() {




  return (
    <LookupContextProvider>
      <LookupClassContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </Router>
      </LookupClassContextProvider>
    </LookupContextProvider>
  );
}





export default App;
