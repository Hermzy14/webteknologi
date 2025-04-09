import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { Explore } from "./pages/Explore";
import { About } from "./pages/About";
import { Admin } from "./pages/Admin";

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
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </main>
  );
}
