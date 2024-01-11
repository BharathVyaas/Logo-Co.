import { createPortal } from "react-dom";

import MobileMenu from "./MobileMenu";
import ModelOverlay from "../Model";
import Hamburger from "./Hamburger";
import { NavLink } from "react-router-dom";

/**
 * Navbar component representing the website's navigation bar.
 *
 * @param {boolean} props.isMenuOpen - Indicates wheather the dropdown menu is visible or not.
 * @param {boolean} props.modelVisible - Indicates whether the modal is visible or not.
 * @param {Function} props.setModelVisible - Function to toggle the modal's visibility.
 * @returns {JSX.Element} The rendered Navbar component.
 */
const Navbar = (props) => {
  /**
   * Function to toggle the mobile menu open or closed.
   */
  const toggleMenu = () => {
    props.setIsMenuOpen(!props.isMenuOpen);
  };

  /**
   * Setting styles to the active class marked by the NavLink
   */
  const aTags = document.getElementsByTagName("a");

  for (const aTag of aTags) {
    if (aTag.classList.contains("active")) {
      aTag.style.backgroundColor = "";
      aTag.style.cursor = "default";
      aTag.style.color = "#ef4444";
      aTag.style.fontSize = "1.2rem";
    }
  }

  // Render the ModelOverlay (menu) when props.isMenuOpen is true
  if (props.isMenuOpen) {
    return createPortal(
      <ModelOverlay>
        <aside className="bg-black z-10 md:hidden fixed">
          {/* Render the MobileMenu component for the ModelOverlay */}
          <MobileMenu
            from={"Model"}
            isClicked={props.isMenuOpen}
            setIsClicked={toggleMenu}
          />
        </aside>
      </ModelOverlay>,
      document.getElementById("model")
    );
  }

  // Render the main navigation bar
  return (
    !props.modelVisible && (
      <nav className="flex flex-row justify-between text-white h-16">
        <aside className="my-auto">
          {/* Company Logo */}
          <NavLink to="/company" className="ms-8 text-2xl cursor-pointer">
            Logo Co.
          </NavLink>
        </aside>
        {/* Render the Hamburger component to show menu toggle */}
        <section
          className="cursor-pointer flex flex-row md:hidden my-auto me-10 relative h-[40px] w-10"
          onClick={toggleMenu}
        >
          <Hamburger isClicked={props.isMenuOpen} />
        </section>
        <ul className="hidden md:flex flex-row">
          {/* Render the MobileMenu component for the main navigation */}
          <MobileMenu from="Nav" />
        </ul>
      </nav>
    )
  );
};

export default Navbar;
