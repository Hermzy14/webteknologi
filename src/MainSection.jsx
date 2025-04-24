import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { Explore } from "./pages/Explore";
import { About } from "./pages/About";
import ComparePage from "./pages/Compare";
import ShoppingCart from "./pages/Cart";
import { Admin } from "./pages/Admin";
import ProfilePage from "./pages/Profile";

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
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </main>
  );
}
