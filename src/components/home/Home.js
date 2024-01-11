import React, { useState } from "react";

import Body from "./body/Body";
import NavbarHandler from "../../helper/NavbarHandler";

import "../../App.css";

/**
 * Home component representing the main page of the application.
 * @returns {JSX.Element} The rendered Home component.
 */
const Home = () => {
  // State to track whether the mobile menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State to control the visibility of the ModelHandler component
  const [isModelVisible, setIsModelVisible] = useState(false);

  return (
    <div className="customScrollbar bg-[#180606] min-w-full min-h-screen">
      {/* Header */}
      <NavbarHandler
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isModelVisible={isModelVisible}
      />
      {/* Main Content */}
      <main className="mx-auto relative">
        <Body
          modelVisible={isModelVisible}
          setModelVisible={setIsModelVisible}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      </main>
    </div>
  );
};

export default React.memo(Home);
