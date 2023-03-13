import CookiesProvider from "react-cookie/cjs/CookiesProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";

import { AuthContextProvider } from "./context/auth_context";
import { LookupContextProvider } from "./context/lookup_context";
import { MenuContextProvider } from "./context/menu_context";

import AuthPage from "./pages/authPage";
import MainPage from "./pages/mainPage";
import Mypage from "./pages/mypage";
import RegisterPage from "./pages/registerPage";
import Reservation from "./pages/reservation";

function App() {



  return (

    <CookiesProvider>
      <MenuContextProvider>
        <AuthContextProvider>
          <LookupContextProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route path="/searching" element={<MainPage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/mypage" element={<Mypage />} />
                  <Route path="/reservation/:flightId" element={<Reservation />} />
                </Route>
              </Routes>
            </Router>
          </LookupContextProvider>
        </AuthContextProvider>
      </MenuContextProvider>
    </CookiesProvider>
  );
}

export default App;
