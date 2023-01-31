import Navs from "./components/Nav/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Articles from "./pages/Articles";
import { ProtectedRoute } from "./routes/ProtectedRoutes";
import ArticlePlans from "./pages/ArticlePlans";

function App() {
  return (
    <BrowserRouter>
      <Navs />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/articles" element={<ProtectedRoute />}>
          <Route path="/articles" element={<Articles />} />
        </Route>
        <Route path="/article-plans" element={<ProtectedRoute />}>
          <Route path="/article-plans" element={<ArticlePlans />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
