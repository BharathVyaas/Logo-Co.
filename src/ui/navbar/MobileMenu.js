import { NavLink } from "react-router-dom";
import styles from "./Menu.module.css";
import ConditionalNav from "../ConditionalNav";

/**
 * MobileMenu component represents the mobile navigation menu.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.from - Indicates the source of the menu, either "Nav" or "Model".
 * @param {boolean} props.isClicked - Indicates whether the menu is clicked or not.
 * @param {Function} props.setIsClicked - Function to toggle the menu's open/closed state.
 * @returns {JSX.Element} The rendered MobileMenu component.
 */
const MobileMenu = (props) => {
  // Apply classes based on the 'from' prop
  const ulClass =
    props.from === "Nav"
      ? "contents"
      : `w-[90%] mx-auto h-screen mt-[58%] sm:mt-[40%] relative`;
  const liClass =
    props.from === "Nav"
      ? "w-[110px] xl:w-[130px] hover:bg-[rgba(255,0,0,0.2)] ms-1 my-auto h-full text-center"
      : `mb-[.8rem] underline ${styles.anime}`;
  const li2Class =
    props.from === "Nav"
      ? "w-[110px] xl:w-[130px] ms-1 my-auto h-full text-center"
      : `underline ${styles.arrow} ${styles.anime}`;
  const aClass =
    props.from === "Nav"
      ? `grid justify-center hover:text-red-500 content-center h-full ${styles.colorNav}`
      : `hover:text-red-500 text-white text-xl sm:text-2xl ${styles.colorModel}`;

  function activeHandler({ isActive }) {
    return isActive
      ? {
          color: "rgba(255, 0, 0, 0.9)",
          fontSize: "1.3rem",
          fontWeight: "600",
        }
      : {};
  }

  return (
    <>
      {props.from === "Model" && (
        // Navigation bar for the "Model" view
        <header className="w-screen">
          <ConditionalNav
            isClicked={props.isClicked}
            setIsClicked={props.setIsClicked}
            from={props.from}
          />
        </header>
      )}
      <ul className={ulClass}>
        {/* Navigation links */}
        <li className={liClass} style={{ "--i": "8ch" }}>
          <NavLink
            className={aClass}
            style={activeHandler}
            to="/home"
            aria-label="Home"
          >
            Home
          </NavLink>
        </li>
        <li className={liClass} style={{ "--i": "15.6ch" }}>
          <NavLink className={aClass} to="/auth/login" aria-label="My Account">
            My Account
          </NavLink>
        </li>
        <li className={liClass} style={{ "--i": "14.2ch" }}>
          <NavLink className={aClass} to="/reviews" aria-label="reviews">
            Reviews
          </NavLink>
        </li>
        <li className={li2Class} style={{ "--i": "14.2ch" }}>
          <NavLink className={aClass} to="/contact" aria-label="Contact Us">
            Contact Us
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default MobileMenu;
