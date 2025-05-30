import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { Explore } from "./pages/Explore";
import { About } from "./pages/About";
import ComparePage from "./pages/Compare";
import ShoppingCart from "./pages/Cart";
import { Admin } from "./pages/Admin";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ProfilePage from "./pages/Profile.jsx";
import { CourseInformation } from "./pages/CourseInformation.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";

/**
 * Component representing the main section of the application.
 * It contains the main content and handles the display of the current page.
 * @return {JSX.Element} The rendered component.
 * @constructor
 */
export function MainSection() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/cart" element={<ShoppingCart />} />

        {/* Protected routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin={true}>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route path="/courseinformation/:id" element={<CourseInformation />} />
      </Routes>
    </main>
  );
}
