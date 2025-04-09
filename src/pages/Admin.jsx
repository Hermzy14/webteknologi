import "../css/admin.css";
import { useCourses } from "../components/CourseProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

/**
 * Admin page where administrators can manage courses.
 * The admin can hide or show courses.
 * The page displays a list of courses with their details and a button to toggle visibility of the course.
 * @returns {JSX.Element} The rendered component.
 * @constructor
 */
// TODO: Implement functionality to make sure only admins can access this page
export function Admin() {
  const { courses, isLoading } = useCourses();

  /**
   * Function to toggle the visibility of a course.
   */
  function toggleVisibility(courseId) {
    console.log(`Toggle visibility for course ID: ${courseId}`);
  }

  return (
    <main id="admin-page">
      <h1>Admin Page</h1>
      <p>Manage courses and their visibility.</p>
      {isLoading && <p>Loading courses...</p>}
      {!isLoading && courses.length === 0 && <p>No courses available.</p>}
      {!isLoading && courses.length > 0 && (
        <ul className="course-list">
          {courses.map((course) => (
            <li key={course.id} className="course-item">
              <div className="course-icon">
                <FontAwesomeIcon icon={course.isVisible ? faEye : faEyeSlash} />
              </div>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <span className="visibility-text">
                {course.isVisible
                  ? "Course is currently visible"
                  : "Course is currently hidden"}
              </span>
              <button
                className="visibility-button"
                onClick={() => toggleVisibility(course.id)}
                aria-label={`Toggle visibility for ${course.title}`}
              >
                {course.isVisible ? "Hide" : "Show"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
