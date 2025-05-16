import "../css/profile.css";
import { useAuth } from "../components/AuthContext";
import { useCart } from "../components/CartContext";
import { useFavorites } from "../components/FavoritesProvider";
import { useCourses } from "../components/CourseProvider";
import { NavLink } from "react-router-dom";

function ProfilePage() {
  const { currentUser } = useAuth();
  const { boughtCourses } = useCart();
  const { favorites, removeFromFavorites } = useFavorites();
  const { courses, isLoading } = useCourses();

  // Function to handle removing a course from favorites
  const handleRemoveFromFavorites = (courseId) => {
    if (!currentUser) {
      alert("Please log in to remove from favorites.");
      return;
    }

    removeFromFavorites(courseId);
  };

  return (
    <main id="Profile">
      <h1>
        {currentUser?.username
          ? `${currentUser.username}'s Profile`
          : "Profile"}
      </h1>

      <section id="bought-courses">
        <h2>Bought Courses</h2>
        {boughtCourses.length === 0 ? (
          <p>No courses bought yet.</p>
        ) : (
          <div className="courses-list">
            {boughtCourses.map((course) => (
              <NavLink
                to={`/courseinformation/${course.courseId}`}
                key={course.id}
                className="course-item"
              >
                <img
                  src={`/course-images/${course.imagePath}`}
                  alt={course.title}
                  className="course-image-cart"
                />
                <div className="item-details">
                  <h3>{course.title}</h3>
                  <p>{course.providerName}</p>
                  <p>
                    {course.price} {course.currency}
                  </p>
                </div>
              </NavLink>
            ))}
          </div>
        )}
      </section>

      <section id="favorite-courses">
        <h2>Favorite courses</h2>
        {favorites.length === 0 ? (
          <p>No favorite courses yet.</p>
        ) : (
          <div className="courses-list">
            {favorites.map((course) => {
              const courseDetails = courses.find(
                (c) => c.id === course.courseId
              );

              // Skip rendering this favorite if courseDetails is undefined
              if (isLoading) {
                return <p>Loading course...</p>;
              }

              return (
                <div className="course-item">
                  
                  <NavLink
                    to={`/courseinformation/${courseDetails.id}`}
                    key={courseDetails.id}
                  >
                    <img
                      src={`/course-images/${courseDetails.imagePath}`}
                      alt={courseDetails.title}
                      className="course-image-cart"
                    />
                    <div className="item-details">
                      <h3>{courseDetails.title}</h3>
                      <p>{courseDetails.providerName}</p>
                      <p>
                        {courseDetails.price} {courseDetails.currency}
                      </p>
                    </div>
                  </NavLink>

                  <button className="remove-favorite-btn"
                    onClick={() => handleRemoveFromFavorites(courseDetails.id)}
                  >
                    Remove from favorites
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default ProfilePage;
