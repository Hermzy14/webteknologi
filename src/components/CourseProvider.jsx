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
  const [allCourses, setAllCourses] = useState([]); // For admin use
  const [courses, setCourses] = useState([]); // For regular user pages
  const [discountedCourses, setDiscountedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Load all courses from the API.
   */
  async function loadCourses() {
    setIsLoading(true);
    try {
      const fetchedCourses = await asyncApiRequest("/courses", "GET", null);

      // Store all courses for admin access
      setAllCourses(fetchedCourses);

      // Filter visible courses for regular users
      const visibleCourses = fetchedCourses.filter(
        (course) => course.isVisible !== false
      );
      setCourses(visibleCourses);

      const discounted = processDiscountedCourses(visibleCourses);
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
            id: course.id,
            courseId: course.id,
            title: course.title,
            originalPrice: originalPrice,
            discountedPrice: discountedPrice,
            provider: provider.name,
            currency: provider.currency,
            category: course.category.name,
            discount: provider.discount,
            imagePath: course.imagePath,
            description: course.description,
            startDate: course.startDate,
            hoursPerWeek: course.hoursPerWeek,
            endDate: course.endDate,
          });
        }
      });
    });
    // Return the list of discounted courses
    return discounted;
  }

  // Initialize courses on mount
  useEffect(() => {
    loadCourses();
  }, []);

  const value = {
    courses,
    allCourses, // For admin use
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
