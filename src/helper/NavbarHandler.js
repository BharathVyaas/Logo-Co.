import React, { useEffect, useRef, useState } from "react";

import Navbar from "../ui/navbar/Navbar";

import arrow from "../assets/images/icons/arrow.png";

/**
 *
 * @param {Object} props - Component props.
 * @param {Boolean} props.isMenuOpen - Keeps track of weather mobile menu is open or not.
 * @param {Function} props.setIsMenuOpen - sets state of isMenuOpen(Home.js) which is responsible for keeping track of weather mobile menu is open or not.
 * @param {Function} props.setIsModelVisible - sets state of isModelVisible(Home.js) which is responsible for keeping track of weather menu of user selected game is open or not used in Navbar and Body to hide nav and main if menu is visible.
 * @returns {JSX.Element} Renders Navbar if page is at top - 0 when Navbar dissapears Renders a GO_TO_TOP Button
 */
function NavbarHandler(props) {
  /* || CODE TO HANDLER GO_TO_TOP BUTTON */
  // For Header of the page
  const navRef = useRef();
  // Is Header on viewPort Boolean true or false
  const [isVisible, setIsVisible] = useState(true);
  // To move GO_TO_TOP Button only on mouseDown
  const [isMouseDown, setIsMouseDown] = useState(false);
  // To update position of Go_TO_TOP Button
  const [mousePosition, setMousePosition] = useState({
    clientX: 0,
    clientY: 0,
  });

  /**
   * @type {Object} - first set to 0 and Updating last on Mouse Move event and checking if user trying to move mouse or click it.
   */
  const [mouseMove, setMouseMove] = useState({ first: 0, last: 0 });

  /**
   * Function to handle visibility of the GO_TO_TOP Button based on scroll position.
   */
  function handleVisibility() {
    const rect = navRef?.current?.getBoundingClientRect();
    // Returns Height of full page including content we need to scroll to see
    const docHeight = window.document.documentElement.clientHeight;
    //if screen is bellow rect.bottom(64) or screen higher(848) then rect.top(0)
    if (rect.bottom < 0 || rect.top > docHeight) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }

  /**
   * Function to handle mouse down event on GO_TO_TOP Button.
   * @param {MouseEvent} e - The mouse event.
   */
  function handleMouseDown(e) {
    // reseting first to current position of clientX
    setMouseMove({ first: e.clientX, last: e.clientX });
    setIsMouseDown(true);
    setMousePosition({ clientX: e.clientX, clientY: e.clientY });
  }

  /**
   * Function to handle mouse up event.
   */
  function handleMouseUp() {
    setIsMouseDown(false);
    // If mouse Moved
    if (mouseMove.first !== mouseMove.last) {
      setMouseMove({ first: 1, last: 2 });
    } else {
      // Scroll to top if there's no drag, i.e., a click
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  /**
   * Function Handles motion of mouse when if useClicked GO_TO_TOP Button.
   * @param {e} - event
   */
  function mouseMoveHandler(e) {
    // Changing last position to notify handleMouseUp weither mouse moved or not.
    setMouseMove((prevState) => ({
      ...prevState,
      last: e.clientX,
    }));
    setMousePosition({ clientX: e.clientX, clientY: e.clientY });
  }

  /**
   * Effect to update mouse move state based on mousemove event.
   */
  useEffect(() => {
    window.addEventListener("mousemove", mouseMoveHandler);

    return () => window.removeEventListener("mousemove", mouseMoveHandler);
  }, []);

  /**
   * Effect to update GO_TO_TOP Button position based on mouse position.
   */
  useEffect(() => {
    if (isMouseDown) {
      const element = document.getElementById("GO_TO_TOP");
      // USED CSS TO ADJUST THE DEFAULT POSITION SO ADDING ADITIONAL PX TO CORRECT POSITION.
      element.style.left = `${mousePosition.clientX - 20}px`;
      element.style.top = `${
        mousePosition.clientY - window.innerHeight + 50
      }px`;
    }
  }, [isMouseDown, mousePosition]);

  /**
   * Effect to handle visibility on scroll and add/remove event listener.
   */
  useEffect(() => {
    window.addEventListener("scroll", handleVisibility);
    handleVisibility();

    return () => {
      window.removeEventListener("scroll", handleVisibility);
    };
  }, [navRef]);

  /* || END GO_TO_TOP */

  return (
    <>
      {!isVisible && (
        <div
          id="GO_TO_TOP"
          className="hover rounded-[100%] shadow-[0_0px_20px_10px_rgba(50,0,0,1)]"
        >
          <button
            aria-label="Go To Top"
            title="Go To Top"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className="text-white cursor-pointer mx-auto relative hover:p-[1.4px]"
          >
            <img
              src={arrow}
              alt="|"
              width="30"
              height="30"
              className="grab -rotate-90"
            />
          </button>
        </div>
      )}
      <header ref={navRef} className="z-10 lg:bg-[rgba(255,46,46,0.03)]">
        <Navbar
          modelVisible={props.isModelVisible}
          isMenuOpen={props.isMenuOpen}
          setIsMenuOpen={props.setIsMenuOpen}
        />
      </header>
    </>
  );
}

export default NavbarHandler;
