import React from "react";
import "../css/global-styles.css";
import "../css/compare.css";
import "../css/courseinformation.css";
import { useCompare } from "../components/CompareContext";
import { useCart } from "../components/CartContext";
import { Link } from "react-router-dom";

function ComparePage() {
  const { compareItems, removeFromCompare } = useCompare();
  const { addToCart } = useCart();

  return (
    <div className="compare-page">
      <main>
        <section>
          <h1>Compare courses</h1>
        </section>

        {compareItems.length === 0 && (
          <div className="compare-placeholder">
            <p>You have no courses to compare.</p>
            <Link to="/explore">Browse Courses</Link>
          </div>
        )}

        {compareItems.length === 1 && (
          <div className="comparisons">
            <section className="compare-course-card">
              <h2>{compareItems[0].title}</h2>
              <div className="compare-top">
                <div className="compare-image-wrapper">
                  <img
                    src={compareItems[0].imagePath || "rescources/Image-not-found.png"}
                    alt={compareItems[0].title}
                  />
                </div>
                <div className="compare-text-and-buttons">
                  <div className="compare-text-container">
                    <p className="boldText">{compareItems[0].price}</p>
                    <p className="boldText">{compareItems[0].date}</p>
                    <p className="boldText">{compareItems[0].hours}</p>
                    <p className="smallInfoText">{compareItems[0].provider}</p>
                  </div>
                  <div className="compare-button-container">
                    <button onClick={() => removeFromCompare(compareItems[0].id)}>
                      Remove
                    </button>
                    <button onClick={() => addToCart(compareItems[0])}>
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
              <p>{compareItems[0].description}</p>
            </section>
            <div className="compare-placeholder" style={{ flex: 1 }}>
              <p>Add one more course to compare.</p>
              <Link to="/explore">Browse More Courses</Link>
            </div>
          </div>
        )}

        {compareItems.length === 2 && (
          <div className="comparisons">
            {compareItems.map((course) => (
              <section key={course.id} className="compare-course-card">
                <h2>{course.title}</h2>
                <div className="compare-top">
                  <div className="compare-image-wrapper">
                    <img
                      src={course.imagePath || "rescources/Image-not-found.png"}
                      alt={course.title}
                    />
                  </div>
                  <div className="compare-text-and-buttons">
                    <div className="compare-text-container">
                      <p className="boldText">{course.price}</p>
                      <p className="boldText">{course.date}</p>
                      <p className="boldText">{course.hours}</p>
                      <p className="smallInfoText">{course.provider}</p>
                    </div>
                    <div className="compare-button-container">
                      <button onClick={() => removeFromCompare(course.id)}>
                        Remove
                      </button>
                      <button onClick={() => addToCart(course)}>
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
                <p>{course.description}</p>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default ComparePage;
