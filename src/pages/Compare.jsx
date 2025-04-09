import React from "react";
import "../css/global-styles.css";
import "../css/compare.css";
import "../css/courseinformation.css";

function ComparePage() {
  // Sample course data - this would typically come from your state or API
  const courses = [
    {
      id: 1,
      title: "Course X",
      price: "29 999 - 32 000 NOK",
      date: "June 3rd - June 28th",
      hours: "40 hours per week",
      provider: "Available courses from NTNU and Oracle",
      description:
        "Embark on a transformative learning experience with our expert-level online course...",
      similarCourses: [
        { title: "Programming in Java", price: "25 000 NOK", provider: "NTNU" },
        { title: "Programming in Java", price: "25 000 NOK", provider: "NTNU" },
        { title: "Programming in Java", price: "25 000 NOK", provider: "NTNU" },
      ],
    },
    {
      id: 2,
      title: "Course Y",
      price: "29 999 - 32 000 NOK",
      date: "June 3rd - June 28th",
      hours: "40 hours per week",
      provider: "Available courses from NTNU and Oracle",
      description:
        "Embark on a transformative learning experience with our expert-level online course...",
      similarCourses: [
        { title: "Programming in Java", price: "25 000 NOK", provider: "NTNU" },
        { title: "Programming in Java", price: "25 000 NOK", provider: "NTNU" },
        { title: "Programming in Java", price: "25 000 NOK", provider: "NTNU" },
      ],
    },
  ];

  const handleRemove = (courseId) => {
    // Implement remove functionality
    console.log(`Remove course ${courseId}`);
  };

  const handleAddToCart = (courseId) => {
    // Implement add to cart functionality
    console.log(`Add course ${courseId} to cart`);
  };

  return (
    <>
      {/* Main content */}
      <main>
        {/* Compare courses section */}
        <section>
          <h1>Compare courses</h1>
        </section>

        <div className="comparisons">
          {/* Map through courses to render them */}
          {courses.map((course) => (
            <section
              key={course.id}
              className={`course ${course.id === 1 ? "x" : "y"}`}
            >
              <h2>{course.title}</h2>

              <div className="top">
                <div className="imageWrapper">
                  <img
                    src="rescources/Image-not-found.png"
                    className="imgNotFound"
                    alt={course.title}
                  />
                </div>
                <div className="textAndButtons">
                  <div className="textContainer">
                    <p className="boldText">{course.price}</p>
                    <p className="boldText">{course.date}</p>
                    <p className="boldText">{course.hours}</p>
                    <p className="smallInfoText">{course.provider}</p>
                  </div>
                  {/* Button container */}
                  <div className="buttonContainer">
                    <button id="Remove" onClick={() => handleRemove(course.id)}>
                      Remove
                    </button>
                    <button id="Add" onClick={() => handleAddToCart(course.id)}>
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>

              <p>{course.description}</p>

              <div className="similarCourses">
                <h2>Similar courses</h2>
                <div className="carouselHolder">
                  {course.similarCourses.map((similar, index) => (
                    <section key={index} className="carouselCard">
                      <a href="/">
                        <img
                          src="rescources/Image-not-found.png"
                          alt={similar.title}
                        />
                        <p className="courseText">{similar.title}</p>
                        <p className="priceText">{similar.price}</p>
                        <p className="providerText">{similar.provider}</p>
                      </a>
                    </section>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}

export default ComparePage;
