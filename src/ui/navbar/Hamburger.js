import React, { useEffect, useState } from "react";
import styles from "./Hamburger.module.css";

/**
 * Hamburger Component
 *
 * @param {Object} props - Component props
 * @param {string} props.from - The source of the component (e.g., "Model" or "Nav")
 * @returns {JSX.Element} - Rendered Hamburger component
 */
const Hamburger = (props) => {
  // Define the initial CSS class based on the "from" prop
  const [CSSCLASS, setCSSCLASS] = useState(styles.hamburger);

  useEffect(() => {
    // Update the CSS class when the "from" prop changes
    // For Model
    if (props.from === "Model") {
      setCSSCLASS(styles.hamburgerX);
    }
    // For Home.js
    else if (props.from === "Home") {
      setCSSCLASS(styles.hamburgerH);
    }
  }, [props.from]);

  return (
    <span
      className={` ${CSSCLASS}`}
      role="button"
      aria-label="Menu Toggle Button"
    ></span>
  );
};

export default Hamburger;
