import { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

import styles from "../../../../App.module.css";

/**
 * TitleRenderer component renders recommended item.
 *
 * @param {Object} props - Component properties.
 * @param {String} props.image - BackgroundImage for the selected item.
 * @param {String} props.title - Title for the selected item.
 * @param {String} props.description - Description for the selected item.
 * @param {Number} prop.rating - Rating's for the selected item.
 * @param {Number} props.length - Length of total recommended items list.
 * @param {Number} props.index - Index of the item given by the setInterval updated with state.
 * @param {Function} props.prevGame - Function that sets the state of index to the previous page.
 * @param {Function} props.nextGame - Function that sets the state of index to the next page.
 * @param {Array} props.gameList - The Game List.
 */
const TitleRenderer = (props) => {
  // State to track the index of the hovered item
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Function to handle mouse hover
  function handleMouseOver(index) {
    setHoveredIndex(index);
  }

  // Function to handle mouse leave
  function handleMouseLeave() {
    setHoveredIndex(null);
  }

  /**
   * CSS styles for Carousel Left && Right Buttons.
   *
   * @type {string}
   */
  const css_BsChevronCompact =
    "bg-[rgb(0,0,0,.5)] text-white w-6 text-[3rem] cursor-pointer";

  return (
    <figure className="flex flex-row w-full">
      {/* Main Image */}
      <div className="relative w-full sm:w-[100%] lg:w-[60%] mx-auto sm:h-[400px] bg-gray-700 sm:mb-8 mt-4 lg:mx-0">
        <img
          className="w-full h-full"
          src={props.image}
          alt={props.title}
          width="500"
          height="500"
        />
        {/* Left and Right Carousel Navigators */}
        <div className=" absolute hidden z-10 w-full h-full top-0 md:flex justify-between place-items-center">
          <BsChevronCompactLeft
            onClick={() => {
              props.prevGame(props.index);
            }}
            className={css_BsChevronCompact}
            aria-label="Previous Game"
          />
          <BsChevronCompactRight
            onClick={() => {
              props.nextGame(props.index);
            }}
            className={css_BsChevronCompact}
            aria-label="Next Game"
          />
        </div>
        {/* Carousel dots to locate between gameList Items */}
        <div className="esm:hidden flex justify-evenly text-custom absolute bottom-3 w-[20%] left-[41%] z-20">
          {props.gameList.map((item, index) => (
            <div
              key={index}
              onMouseOver={() => {
                handleMouseOver(index);
              }}
              onMouseLeave={() => {
                handleMouseLeave(null);
              }}
              onClick={() => {
                props.setCurrentIndex(index);
              }}
              className={`w-6 h-6 inline-flex justify-center ${
                hoveredIndex === index ? "cursor-pointer" : ""
              } `}
            >
              <button
                className={`w-2 h-2 rounded-full my-auto bg-custom_dot border-[.2px] border-[rgba(0,0,0,.6)] ${
                  hoveredIndex === index
                    ? "bg-[rgba(255,0,0,.9)] sm:bg-red-700 border-[rgba(0,0,0,0.4)] p-[.26rem] sm:p-[.3rem] lg:p-[.32rem]"
                    : ""
                } ${
                  props.currentIndex === index
                    ? "bg-[rgba(255,0,0,.9)] sm:bg-red-700 border-[rgba(0,0,0,0.4)] p-[.26rem] sm:p-[.24rem]"
                    : ""
                }`}
                aria-label={`Go to Game ${index + 1}`}
              ></button>
            </div>
          ))}
        </div>
      </div>
      {/* Item Details */}
      <figcaption className="hidden lg:flex flex-col mb-8 mt-4 lg:w-[40%] sm:h-[400px]">
        {/* Item Title */}
        <p className="h-[10%] text-white mx-[10%] ml-[5%] text-center text-2xl">
          {props.title}
        </p>
        {/* Item Description */}
        <p
          className={` ${styles.customScrollbar} text-white overflow-auto mx-[10%] mt-8 h-[70%] `}
        >
          {props.description}
        </p>
        {/* Item Actions */}
        <aside className="flex flex-row justify-evenly text-white mx-[10%] mt-6 h-[25%]">
          {/* Action Button */}
          <button className={`bg-gray-200 text-black h-[40px] w-[160px]`}>
            Click me
          </button>
          {/* Item Rating */}
          <p className="bg-gray-200 text-black h-[40px] w-[160px] flex justify-center py-2">
            {props.rating}
          </p>
        </aside>
      </figcaption>
    </figure>
  );
};

export default TitleRenderer;
