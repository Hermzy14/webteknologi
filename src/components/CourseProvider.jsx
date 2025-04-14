import { createContext, useState, useContext, useEffect } from "react";
import { asyncApiRequest } from "../tools/requests";

const CourseContext = createContext();

/**
 * CourseProvider component to provide course data to its children.
 * It fetches course data from the API and provides it to the context.
 * It also handles loading and error states.
 * @param {object} children - The children components that will consume the context.
 * @returns {JSX.Element} The CourseProvider component.
 * @constructor
 */
export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [discountedCourses, setDiscountedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Load all courses from the API.
   */
  async function loadCourses() {
    setIsLoading(true);
    try {
      const courses = await asyncApiRequest("/courses", "GET", null);
      setCourses(courses);
      const discounted = processDiscountedCourses(courses);
      setDiscountedCourses(discounted);
      setError(null);
    } catch (error) {
      console.error("Error loading courses:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   *  Process courses to extract discounted courses
   * @param {Array} courses - The array of courses to process.
   * @returns {Array} - The array of discounted courses.
   */
  function processDiscountedCourses(courses) {
    const discounted = [];

    // Iterate through each course and its providers to find discounted prices
    courses.forEach((course) => {
      course.providers.forEach((provider) => {
        if (provider.discount > 0) {
          const originalPrice = provider.price;
          const discountedPrice = originalPrice * (1 - provider.discount / 100);
          // Add the discounted course to the list
          discounted.push({
            id: `${course.id}-${provider.id}`,
            courseId: course.id,
            title: course.title,
            originalPrice: originalPrice,
            discountedPrice: discountedPrice,
            provider: provider.name,
            currency: provider.currency,
            category: course.category.name,
            discount: provider.discount,
          });
        }
      });
    });
    // Return the list of discounted courses
    return discounted;
  }

  // Initalize courses on mount
  useEffect(() => {
    loadCourses();
  }, []);

  const value = {
    courses,
    discountedCourses,
    isLoading,
    error,
    refreshCourses: loadCourses, // Function to refresh courses
  };

  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
}

/**
 * Custom hook to use the CourseContext.
 * @returns {object} The context value.
 */
export function useCourses() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourses must be used within a CourseProvider");
  }
  return context;
}
