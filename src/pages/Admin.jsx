import "../css/admin.css";
import { useCourses } from "../components/CourseProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { asyncApiRequest } from "../tools/requests";
import { useState } from "react";

/**
 * Admin page where administrators can manage courses.
 * The admin can hide or show courses.
 * The page displays a list of courses with their details and a button to toggle visibility of the course.
 * @returns {JSX.Element} The rendered component.
 * @constructor
 */
export function Admin() {
  const { allCourses, isLoading, refreshCourses } = useCourses();
  const [updatingCourses, setUpdatingCourses] = useState({});
  const [error, setError] = useState(null);

  /**
   * Function to toggle the visibility of a course.
   */
  async function toggleVisibility(courseId) {
    // Find the course to get its current visibility status
    const course = allCourses.find((course) => course.id === courseId);
    if (!course) return;

    // Set the updating state for the course
    setUpdatingCourses((prev) => ({ ...prev, [courseId]: true }));
    setError(null);

    try {
      // Send request to toggle visibility
      await asyncApiRequest(
        `/courses/toggle_visibility/${courseId}`,
        "PATCH",
        null
      );
      // Refresh the courses after updating
      await refreshCourses();
    } catch (error) {
      console.error("Error toggling visibility:", error);
      setError(
        `Failed to update visibility for ${course.title}: ${error.message}`
      );
    } finally {
      // Remove the updating state for the course
      setUpdatingCourses((prev) => {
        const updated = { ...prev };
        delete updated[courseId];
        return updated;
      });
    }
  }

  return (
    <main id="admin-page">
      <h1>Admin Page</h1>
      <p>Manage courses and their visibility.</p>

      {error && <div id="error-message">{error}</div>}

      {isLoading && <p>Loading courses...</p>}
      {!isLoading && allCourses.length === 0 && <p>No courses available.</p>}
      {!isLoading && allCourses.length > 0 && (
        <ul id="course-list">
          {allCourses.map((course) => (
            <li key={course.id} id="course-item">
              <div id="course-icon">
                <FontAwesomeIcon icon={course.isVisible ? faEye : faEyeSlash} />
              </div>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <span id="visibility-text">
                {course.isVisible
                  ? "Course is currently visible"
                  : "Course is currently hidden"}
              </span>
              <button
                id="visibility-button"
                onClick={() => toggleVisibility(course.id)}
                disabled={updatingCourses[course.id]}
                aria-label={`Toggle visibility for ${course.title}`}
              >
                {updatingCourses[course.id]
                  ? "Updating..."
                  : course.isVisible
                  ? "Hide"
                  : "Show"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
