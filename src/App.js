import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import { AuthContextProvider } from "./context/auth_context";
import { LookupContextProvider } from "./context/lookup_context";
import AuthPage from "./pages/authPage";
import MainPage from "./pages/mainPage";

function App() {




  return (
    <AuthContextProvider>
      <LookupContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route path="/searching" element={<MainPage />} />
              <Route path="/auth" element={<AuthPage />} />
            </Route>
          </Routes>
        </Router>
      </LookupContextProvider>
    </AuthContextProvider>
  );
}





export default App;
