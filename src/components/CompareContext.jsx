import React, { createContext, useContext, useEffect, useState } from "react";

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState(() => {
    // Load from localStorage on first render
    const stored = localStorage.getItem("compareCourses");
    return stored ? JSON.parse(stored) : [];
  });

  // Update localStorage when compareItems change
  useEffect(() => {
    localStorage.setItem("compareCourses", JSON.stringify(compareItems));
  }, [compareItems]);

  const addToCompare = (course) => {
    setCompareItems((prev) => {
      // Prevent adding if already 2 items or course already exists
      if (prev.length >= 2 || prev.find((item) => item.id === course.id)) {
        return prev;
      }
      return [...prev, course];
    });
  };

  const removeFromCompare = (courseId) => {
    setCompareItems((prev) => prev.filter((c) => c.id !== courseId));
  };

  const clearCompare = () => {
    setCompareItems([]);
  };

  return (
    <CompareContext.Provider
      value={{ compareItems, addToCompare, removeFromCompare, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
