import { BrowserRouter } from "react-router-dom";
import { MainSection } from "./MainSection.jsx";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import "./css/global-styles.css";
import { CourseProvider } from "./components/CourseProvider.jsx";
import { CartProvider } from "./components/CartContext.jsx";
import { CompareProvider } from "./components/CompareContext";
import { AuthProvider } from "./components/AuthContext.jsx";

/**
 * Component representing the whole application.
 * @return {JSX.Element} The rendered component.
 * @constructor
 */
export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <CourseProvider>
          <CompareProvider>
            <CartProvider>
              <div className="app-container">
                <Header />
                <MainSection />
                <Footer />
              </div>
            </CartProvider>
          </CompareProvider>
        </CourseProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}
