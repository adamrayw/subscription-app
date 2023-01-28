import Hero from "./components/Hero/Hero";
import Navs from "./components/Nav/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Article from "./pages/Article";
import { ProtectedRoute } from "./routes/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Navs />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/articles" element={<ProtectedRoute />}>
          <Route path="/articles" element={<Article />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
