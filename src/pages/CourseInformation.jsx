import "../css/courseinformation.css";
import "../css/global-styles.css";
import { NavLink, useParams } from "react-router-dom";
import { useCourses } from "../components/CourseProvider";
import { useEffect, useState } from "react";

/**
 * This is the course information page.
 * It displays detailed information about a specific course.
 * @return {JSX.Element} The rendered component.
 * @constructor
 */
export function CourseInformation() {
  const { id } = useParams();
  const { courses, isLoading } = useCourses();
  const [course, setCourse] = useState(null);
  const [similarCourses, setSimilarCourses] = useState([]);

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
        setSimilarCourses(similar);
      }
    }
  }, [id, courses]);

  const formatPrice = (price, currency = "NOK") => {
    if (currency === "NOK") {
      return `${Math.round(price).toLocaleString()} NOK`;
    }
    return `${price} ${currency}`;
  };

  const formatDate = (DateString) => {
    return new Date(DateString).toLocaleDateString();
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
                src={course.imagePath ? `/course-images/${course.imagePath}` : "/assets/Image-not-found.png"}

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

            <NavLink to="/compare">
              <button type="button" className="compareButton">
                Compare to other courses
              </button>
            </NavLink>

            <NavLink to="">
              <button type="button" className="addToCartButton">
                Add to cart
              </button>
            </NavLink>
          </section>
        </section>

        {similarCourses.length > 0 && (
          <section className="courseCarouselParent">
            <h2> Similar courses </h2>
            <section className="courseCarousel">
              <NavLink to="" className="leftArrow" title="left">
                <img
                  src="/src/assets/leftArrow.PNG"
                  className="leftArrow"
                  alt="leftArrow"
                />
              </NavLink>

              {similarCourses.map((similarCourse) => {
                const similarPrices = similarCourse.providers.map(
                  (p) => p.price
                );
                const similarMinPrice = Math.min(...similarPrices);
                const currency = similarCourse.providers[0]?.currency || "NOK";

                return (
                  <section className="carouselCard" key={similarCourse.id}>
                    <NavLink to={`/courseinformation/${similarCourse.id}`}>
                      <img
                        src={similarCourse.imagePath ? `/course-images/${similarCourse.imagePath}` : "/assets/Image-not-found.png"}
                        alt={similarCourse.title}
                      />
                      <p className="priceText">
                        {formatPrice(similarMinPrice, currency)}
                      </p>
                      <p className="providerText">
                        {similarCourse.providers[0]?.name}
                        {similarCourse.providers.length > 1 ? " + more " : ""}
                      </p>
                    </NavLink>
                  </section>
                );
              })}

              <NavLink to="" className="rightArrow" title="right">
                <img
                  src="/src/assets/rightArrow.PNG"
                  className="rightArrow"
                  alt="rightArrow"
                />
              </NavLink>
            </section>

            {/* TODO: Add functionallity for the buttons, to browse between displayed courses */}
          </section>
        )}
      </main>
    </div>
  );
}
