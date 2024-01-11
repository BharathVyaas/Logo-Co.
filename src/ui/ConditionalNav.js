import { NavLink } from "react-router-dom";
import Hamburger from "./navbar/Hamburger";

/**
 * ConditionalNav component represents the conditional navigation menu.
 *
 * @param {Object} props - Component properties.
 * @param {Boolean} props.isClicked - Indicates whether the menu is clicked or not.
 * @param {Function} props.setIsClicked - Function to manage the state of isClicked.
 * @param {String} props.from - The source of the component (e.g., "Model" or "Nav").
 * @returns {JSX.Element} The rendered ConditionalNav component.
 */
const ConditionalNav = (props) => {
  return (
    <nav className="flex flex-row bg-black justify-between text-white h-16 w-[100%]">
      <div className="my-auto">
        <h1 className="ms-8 text-[2xl]">
          {/* Logo */}
          <NavLink to="/company" className="text-2xl" aria-label="Logo Co.">
            Logo Co.
          </NavLink>
        </h1>
      </div>
      {/* Hamburger button */}
      <button
        className="cursor-pointer flex flex-row my-auto me-10 relative h-[45px] w-10"
        aria-label={props.isClicked ? "Close menu" : "Open menu"}
        onClick={() => {
          props.setIsClicked(!props.isClicked);
        }}
      >
        <Hamburger from={props.from} />
      </button>
    </nav>
  );
};

export default ConditionalNav;
