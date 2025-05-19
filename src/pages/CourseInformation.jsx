import "../css/courseinformation.css";
import "../css/global-styles.css";
import { NavLink, useParams } from "react-router-dom";
import { useCourses } from "../components/CourseProvider";
import { useEffect, useState } from "react";
import { CourseCard } from "../components/CourseCard";
import { useCart } from "../components/CartContext";
import { useCompare } from "../components/CompareContext";

/**
 * This is the course information page.
 * It displays detailed information about a specific course.
 * @return {JSX.Element} The rendered component.
 * @constructor
 */
export function CourseInformation() {
  const { id } = useParams();
  const { courses, isLoading } = useCourses();
  const { addToCart } = useCart();
  const { addToCompare } = useCompare();
  const [course, setCourse] = useState(null);
  const [similarCourses, setSimilarCourses] = useState([]);
  const [addedCourseId, setAddedCourseId] = useState(null);
  const [addedCourseAction, setAddedCourseAction] = useState(null);
  const [selectedProviders, setSelectedProviders] = useState({});

  useEffect(() => {
    if (courses && courses.length > 0 && id) {
      const foundCourse = courses.find(
        (c) => c.id.toString() === id.toString()
      );
      setCourse(foundCourse);

      if (foundCourse) {
        const similar = courses
          .filter(
            (c) =>
              c.category.id === foundCourse.category.id &&
              c.id !== foundCourse.id
          )
          .slice(0, 4);

        // Initialize selected providers for similar courses
        const initialProviders = {};
        similar.forEach((c) => {
          initialProviders[c.id] = 0; // Default to first provider (index 0)
        });

        setSelectedProviders(initialProviders);
        setSimilarCourses(similar);
      }
    }
  }, [id, courses]);

  const formatPrice = (price, currency = "USD") => {
    if (currency === "USD") {
      return `${Math.round(price).toLocaleString()} USD`;
    }
    return `${price} ${currency}`;
  };

  const formatDate = (DateString) => {
    return new Date(DateString).toLocaleDateString();
  };

  // Handle provider change for similar courses
  const handleProviderChange = (courseId, providerIndex) => {
    setSelectedProviders((prev) => ({
      ...prev,
      [courseId]: providerIndex,
    }));
  };

  // Handle add to cart
  const handleAddToCart = (course, provider) => {
    try {
      addToCart(course, provider);
      setAddedCourseId(course.id);
      setAddedCourseAction("cart");

      // Clear the state after 3 seconds
      setTimeout(() => {
        setAddedCourseId(null);
        setAddedCourseAction(null);
      }, 3000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Handle adding course to compare
  const handleAddToCompare = (course, provider) => {
    try {
      addToCompare(course, provider);
      setAddedCourseId(course.id);
      setAddedCourseAction("compare");

      // Clear the state after 3 seconds
      setTimeout(() => {
        setAddedCourseId(null);
        setAddedCourseAction(null);
      }, 3000);
    } catch (error) {
      console.error("Error adding to compare:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-container">
        <div className="loading">Loading course information... </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex-container">
        <div className="no-results">course not found</div>
      </div>
    );
  }

  const prices = course.providers.map((provider) => provider.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange =
    minPrice === maxPrice
      ? formatPrice(minPrice)
      : `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;

  return (
    <div className="flex-container">
      <main id="courseInformationMain">
        <section className="informationPanel">
          <section className="informationPanel3">
            <h2>{course.title}</h2>

            <div className="imageWrapper">
              <img
                src={
                  course.imagePath
                    ? `/course-images/${course.imagePath}`
                    : "/assets/Image-not-found.png"
                }
                className="imgNotFound2"
                alt={course.title}
              />
            </div>

            <p className="boldText">{priceRange}</p>
            <p className="boldText">
              {formatDate(course.startDate)} - {formatDate(course.endDate)}
            </p>
            <p className="boldText">{course.hoursPerWeek} hours per week</p>
            <p className="smallInfoText">
              Available courses from{" "}
              {course.providers.map((p) => p.name).join(", ")}
            </p>
          </section>

          <section className="informationPanel2">
            <h2>Course information</h2>

            <p>{course.description}</p>

            <button
              type="button"
              className="compareButton"
              onClick={() => handleAddToCompare(course, course.providers[0])}
            >
              Compare to other courses
            </button>

            <button
              type="button"
              className="addToCartButton"
              onClick={() => handleAddToCart(course, course.providers[0])}
            >
              Add to cart
            </button>
          </section>
        </section>

        {similarCourses.length > 0 && (
          <section id="discounted" className="courseCarouselParent">
            <div className="navigation-title-wrapper">
              <h2 id="discounted-title">Similar courses</h2>
            </div>
            <div className="card-wrapper">
              {similarCourses.map((similarCourse) => (
                <CourseCard
                  key={similarCourse.id || similarCourse.courseId}
                  course={similarCourse}
                  formatPrice={formatPrice}
                  onAddToCart={handleAddToCart}
                  onAddToCompare={handleAddToCompare}
                  onProviderChange={handleProviderChange}
                  selectedProviderIndex={
                    selectedProviders[similarCourse.id] || 0
                  }
                  addedItemId={addedCourseId}
                  addedItemAction={addedCourseAction}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
