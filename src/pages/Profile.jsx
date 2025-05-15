import React from "react";
import "../css/global-styles.css";
import "../css/profile.css";
import { useAuth } from "../components/AuthContext"; // adjust path if needed
import { useCart } from "../components/CartContext";

function ProfilePage() {
  const { currentUser } = useAuth();
  const { boughtCourses } = useCart();

  return (
    <main id="Profile">
      <h1>{currentUser?.username ? `${currentUser.username}'s Profile` : "Profile"}</h1>

      <section id="bought-courses">
        <h2>Bought Courses</h2>
        {boughtCourses.length === 0 ? (
          <p>No courses bought yet.</p>
        ) : (
          <div className="courses-list">
            {boughtCourses.map((course) => (
              <div key={course.id} className="course-item">
                <img
                  src={`/course-images/${course.imagePath}`}
                  alt={course.title}
                  className="course-image-cart"
                />
                <div className="item-details">
                <h3>{course.title}</h3>
                <p>{course.providerName}</p>
                <p>{course.price} {course.currency}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default ProfilePage;
