import { BrowserRouter } from "react-router";
import { MainSection } from "./MainSection.jsx";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import "./css/global-styles.css";
import { CourseProvider } from "./components/CourseProvider.jsx";

/**
 * Component representing the whole application.
 * @return {JSX.Element} The rendered component.
 * @constructor
 */
export function App() {
  return (
    <BrowserRouter>
      <CourseProvider>
        <div className="app-container">
          <Header />
          <MainSection />
          <Footer />
        </div>
      </CourseProvider>
    </BrowserRouter>
  );
}
