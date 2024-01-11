import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import "../../../../../App.css";
//import uncharted from "../../../../../assets/images/fillImage/uncharted.jpg";

/**
 * TitleRenderer component renders recommended item.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.image - Background image URL for the selected item.
 * @param {string} props.title - Title for the selected item.
 * @param {string} props.description - Description for the selected item.
 * @param {number} props.rating - Rating for the selected item.
 * @param {number} props.length - Total length of recommended items list.
 * @param {number} props.currentIndex - Index of the currently displayed item.
 * @param {Function} props.prevGame - Function to navigate to the previous item sets State of currentIndex in TopTitle.
 * @param {Function} props.nextGame - Function to navigate to the next item sets State of currentIndex in TopTitle.
 * @param {Array} props.gameList - The list of recommended games.
 * @param {boolean} props.modelVisible - Indicates whether the model is visible.
 * @returns {JSX.Element} - Renders Recommended Game Title.
 *
 * @component
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
    !props.modelVisible && (
      <article className="flex flex-row w-full">
        {/* Main Image */}
        <div className="relative w-full sm:w-[100%] lg:w-[60%] mx-auto sm:h-[400px] bg-gray-700 sm:mb-8 mt-4 lg:mx-0">
          <img
            className="w-full h-full"
            src="http://via.placeholder.com/500x500"
            alt={props.title}
            width="500"
            height="500"
          />
          {/* Left and Right Carousel Navigators */}
          <nav className="absolute hidden z-10 w-full h-full top-0 md:flex justify-between place-items-center">
            <div className=" absolute hidden z-10 w-full h-full top-0 md:flex justify-between place-items-center">
              <button aria-label="Previous Game">
                <BsChevronCompactLeft
                  onClick={() => {
                    props.prevGame(props.currentIndex);
                  }}
                  className={css_BsChevronCompact}
                  aria-label="Previous Game"
                />
              </button>
              <button aria-label="Next Game">
                <BsChevronCompactRight
                  onClick={() => {
                    props.nextGame(props.currentIndex);
                  }}
                  className={css_BsChevronCompact}
                  aria-label="Next Game"
                />
              </button>
            </div>
          </nav>
          {/* Carousel dots to locate between gameList Items */}
          <nav className="flex justify-evenly text-custom absolute bottom-3 w-[20%] left-[41%] z-20">
            {props.gameList.map((item, index) => (
              <button
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
                aria-label={`Go to Game ${index + 1}`}
              >
                <span
                  className={`w-2 h-2 rounded-full my-auto bg-custom_dot border-[.2px] border-[rgba(0,0,0,.6)] ${
                    hoveredIndex === index
                      ? "bg-[rgba(255,0,0,.9)] sm:bg-red-700 border-[rgba(0,0,0,0.4)] p-[.26rem] sm:p-[.3rem] lg:p-[.32rem]"
                      : ""
                  } ${
                    props.currentIndex === index
                      ? "bg-[rgba(255,0,0,.9)] sm:bg-red-700 border-[rgba(0,0,0,0.4)] p-[.26rem] sm:p-[.24rem]"
                      : ""
                  }`}
                ></span>
              </button>
            ))}
          </nav>
        </div>
        {/* Item Details */}
        <section className="hidden lg:flex flex-col mb-8 mt-4 lg:w-[40%] sm:h-[400px]">
          {/* Item Title */}
          <h2 className="h-[10%] text-white mx-[10%] ml-[5%] text-center text-2xl">
            {"Uncharted 4"}
          </h2>
          {/* Item Description */}
          <p
            className={` customScrollbar text-white overflow-auto mx-[10%] mt-8 h-[70%] `}
          >
            <b>This Must Be Implemented</b>
            <br />
            <br />
            Uncharted 4: A Thief's End is an action-adventure game played from a
            third-person perspective, with platforming elements. Players
            traverse several environments, moving through locations including
            towns, buildings, and wilderness to advance through the game's
            story.
            <span className="block p-1" />
            Players use firearms, melee combat, and stealth to combat hostile
            enemies. For most of the game, players control Nathan Drake—a
            treasure hunter who is physically adept and can jump, sprint, climb,
            swim, scale narrow ledges and walls, swing with a rope, use a
            grappling hook and perform other acrobatic actions. Players also
            drive vehicles during some gameplay segments.
          </p>
          {/* Item Actions */}
          <aside className="flex flex-row justify-evenly text-white mx-[10%] mt-6 h-[25%]">
            {/* Action Button */}
            <button
              className={`bg-gray-200 text-black font-bold text-[1.02rem] rounded-sm h-[40px] w-[160px] cursor-not-allowed`}
            >
              More Details
            </button>
            {/* Item Rating */}
            <button className="bg-gray-200 text-black h-[40px] rounded-sm font-bold text-[1.02rem] w-[160px] flex justify-center py-2 cursor-not-allowed">
              {props.rating}
            </button>
          </aside>
        </section>
      </article>
    )
  );
};

export default TitleRenderer;
