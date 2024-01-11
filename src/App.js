import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/home/Home";
import Authentication from "./components/auth/Authentication";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Featured from "./components/home/body/games/Featured";
import NewReleases from "./components/home/body/games/NewReleases";
import NotFound from "./components/notfound/NotFound";
import ReviewsPage from "./components/topics/ReviewsPage";

/**
 * Main application component.
 * @returns {JSX.Element} The application's root.
 */
function App() {
  return (
    <Routes>
      {/* Default route that redirects to "/home" */}
      <Route index element={<Navigate to="/home" replace />} />

      {/* Authentication routes */}
      <Route path="/auth" element={<Authentication />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Route>

      {/* Home routes */}
      <Route path="/home" element={<Home />}>
        {/* Default route for the Home component */}
        <Route index element={<Featured />} />

        {/* Additional routes for Home */}
        <Route path="featured" element={<Featured />} />
        <Route path="newreleases" element={<NewReleases />} />
      </Route>

      {/* Reviews routes */}
      <Route path="reviews" element={<ReviewsPage />} />

      {/* Catch-all route for 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
