import { useState } from "react";
import { createPortal } from "react-dom";

import MobileMenu from "./MobileMenu";
import ModelOverlay from "../Model";
import Hamburger from "./Hamburger";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu open/closed
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Render the ModelOverlay (menu) when isMenuOpen is true
  if (isMenuOpen) {
    return createPortal(
      <ModelOverlay>
        <aside className="bg-black z-10 md:hidden fixed">
          <MobileMenu
            from={"Model"}
            isClicked={isMenuOpen}
            setIsClicked={toggleMenu}
          />
        </aside>
      </ModelOverlay>,
      document.getElementById("model")
    );
  }

  return (
    <nav className="flex flex-row justify-between text-white h-16">
      <aside className="my-auto">
        <a href="/company" className="ms-8 text-2xl">
          Logo Co.
        </a>
      </aside>
      <section
        className="cursor-pointer flex flex-row md:hidden my-auto me-10 relative h-[40px] w-10"
        onClick={toggleMenu}
      >
        <Hamburger isClicked={isMenuOpen} />
      </section>
      <ul className="hidden md:flex flex-row">
        {/* Render the MobileMenu component with a prop indicating it's used in the Nav */}
        <MobileMenu from="Nav" />
      </ul>
    </nav>
  );
};

export default Nav;
