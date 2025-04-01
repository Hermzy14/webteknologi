import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

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
      </Routes>
    </main>
  );
}
