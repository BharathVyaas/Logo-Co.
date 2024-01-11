import { createPortal } from "react-dom";

import ConditionalNav from "../../../../ui/ConditionalNav";
import ModelOverlay from "../../../../ui/Model";
import ImageSlideshow from "./ImageSlideshow";
import ListRenderer from "../../../../ui/ListRenderer";

/**
 * @type {Image} - Svg Icons of platforms
 */
import playstation from "../../../../assets/images/platforms/playstation.svg";
import xbox from "../../../../assets/images/platforms/xbox.svg";
import windows from "../../../../assets/images/platforms/windows.svg";
import nintendo from "../../../../assets/images/platforms/nintendo.svg";

import "../../../../App.css";

/**
 * ModelHandler component for rendering a modal overlay.
 *
 * @param {Object} props - Component properties.
 * @param {boolean} props.modelVisible - Indicates whether the modal is visible or not.
 * @param {Function} props.setModelVisible - Function to toggle the modal's visibility.
 * @param {Object} props.selectedGame - Contents for game to be shown.
 * @returns {JSX.Element} - The rendered ModelHandler component.
 */
const ModelHandler = (props) => {
  /**
   *
   * @type {Array} - Used to applay contetional styles to elements.
   */
  const colors = [
    {
      border: "borderRed",
      bg: "bgRed",
      customScrollbar: "customScrollbarRed",
      text: "textRed",
      imgBg: "imgBgRed",
      back: "backRed",
    },
    {
      border: "borderAmber",
      bg: "bgAmber",
      customScrollbar: "customScrollbarAmber",
      text: "textAmber",
      imgBg: "imgBgAmber",
      back: "backAmber",
    },
    {
      border: "borderLime",
      bg: "bgLime",
      customScrollbar: "customScrollbarLime",
      text: "textLime",
      imgBg: "imgBgLime",
      back: "backLime",
    },
    {
      border: "borderSky",
      bg: "bgSky",
      customScrollbar: "customScrollbarSky",
      text: "textSky",
      imgBg: "imgBgSky",
      back: "backSky",
    },
    {
      border: "borderFuchsia",
      bg: "bgFuchsia",
      customScrollbar: "customScrollbarFuchsia",
      text: "textFuchsia",
      imgBg: "imgBgFuchsia",
      back: "backFuchsia",
    },
    {
      border: "borderPink",
      bg: "bgPink",
      customScrollbar: "customScrollbarPink",
      text: "textPink",
      imgBg: "imgBgPink",
      back: "backPink",
    },
  ];

  /**
   *
   * @type {Array} - Holds an item from variable Colors
   */
  const color = colors[Math.floor(Math.random() * colors.length)];

  /**
   * The content to be rendered inside the modal overlay.
   */
  const content = (
    <>
      <div
        className={`w-screen h-screen fixed z-20`}
        onClick={() => props.setModelVisible(false)}
        aria-label="close"
        role="button"
      ></div>
      <ModelOverlay>
        <div
          className={`${color.customScrollbar} border-[rgba(255,255,255,.5)] border-[2px] border-r-0 border-l-0 border-b-0 z-30 fixed h-screen lg:h-[600px] xl:h-[500px] overflow-y-scroll overflow-x-hidden esm:w-screen lg:w-[70%] lg:ml-[15%] xl:w-[45%] xl:ml-[30%] esm:ml-0 esm:mt-0 sm:mt-0 md:mt-0 lg:mt-[12%] xl:mt-[8%] 2xl:mt-[5%] `}
        >
          {/* Navbar */}
          <header className={``}>
            <ConditionalNav
              isClicked={props.modelVisible}
              setIsClicked={props.setModelVisible}
              from="Model"
            />
          </header>
          {/* Main content */}
          {/* || Image Section */}
          <article
            className={`grid grid-cols-4 select text-[rgba(255,255,255,.7)] h-full p-4 ${color["bg"]}`}
          >
            <img
              className={`w-full border-2 col-span-4 order-0 h-auto ${color["border"]} mb-4`}
              src={props.selectedGame.image}
              alt={props.selectedGame.title}
              width="650"
            />
            {/* || Title, details Section */}
            <h2
              className={`col-span-4 text-[2rem] select mb-4 pb-1 text-center border-b-[.2rem] border-[rgba(255,255,255,.8)] order-1`}
            >
              Title: {props.selectedGame.title}
            </h2>
            {/* || \ Platform Images */}
            <div className={` col-span-3 order-2 inline-flex gap-3`}>
              <img
                className={`select image`}
                src={playstation}
                alt="error loading"
                width="22"
                height="22"
              />
              <img
                className={`select image`}
                src={xbox}
                alt="error loading"
                width="22"
                height="22"
              />
              <img
                className={`select image`}
                src={nintendo}
                alt="error loading"
                width="22"
                height="22"
              />
              <img
                className={`select image`}
                src={windows}
                alt="error loading"
                width="22"
                height="22"
              />
            </div>
            {/* || \ Rating */}
            <span
              className={`col-span-1 order-3 select ${color["text"]} flex justify-end border-white`}
            >
              <p
                className={`mr-[20%] select border-[2px] px-[4px] font-bold bg-[rgba(255,255,255,0.14)] border-[rgba(255,255,255,.8)] rounded-md shadow-custom`}
              >
                {Math.round((props.selectedGame.rating / 5) * 100)}
              </p>
            </span>
            {/* || \ Release Date */}
            <p
              className={`mt-8 col-span-4 border-b-[1.6px] border-[rgba(255,255,255,.4)]  order-4 flex justify-between`}
            >
              <span className={`select ml-[2%]`}>Released:</span>
              <span className={`select mr-[3%]`}>
                {props.selectedGame.releaseDate}
              </span>
            </p>
            {/* || \ genres */}
            <p
              className={`flex justify-between mt-4 border-b-[1.6px] border-[rgba(255,255,255,0.4)] col-span-4 order-5`}
            >
              <span className={`select ml-[2%] my-auto`}>genres: </span>
              <span className={`select inline-flex justify-end min-w-[20rem]`}>
                {props.selectedGame?.genres?.map((genre, index) => (
                  <ListRenderer key={index}>
                    <li className="list-none px-[1.4px] mb-[4px]">
                      <button
                        className={`select border-[2px] rounded-lg px-3 border-[rgba(255,255,255,0.5)] `}
                      >
                        {genre}
                      </button>
                    </li>
                  </ListRenderer>
                ))}
              </span>
            </p>
            {/* || \ Need New Data Here !!!!!!!!!!!!! */}
            <p
              className={`flex justify-between mt-4 border-b-[1.6px] border-[rgba(255,255,255,0.4)] col-span-4 order-6`}
            >
              <span className={`select ml-[2%] my-auto`}>Tags: </span>
              <span className={`select inline-flex justify-end min-w-[20rem]`}>
                {props.selectedGame?.tags?.map((tag, index) => {
                  if (index < 3)
                    return (
                      <ListRenderer key={index}>
                        <li className="list-none px-[1.4px] mb-[4px]">
                          <button
                            className={`select border-[2px] rounded-lg px-3 border-[rgba(255,255,255,0.5)] `}
                          >
                            {tag.name}
                          </button>
                        </li>
                      </ListRenderer>
                    );
                  else {
                    return null;
                  }
                })}
              </span>
            </p>
            {/* || Parallax Section */}
            <div
              className={`select ${color["imgBg"]} w-full min-h-[11rem] esm:min-h-[16rem] sm:min-h-[18rem] md:min-h-[22rem] xl:min-h-[19rem] flex relative col-span-4 order-7 mt-[4rem] mb-[3rem]`}
            >
              <span
                className={`${color["text"]} select text-2xl translate-y-20`}
              >
                Drag To Left:
              </span>
              <ImageSlideshow
                color={color}
                images={props.selectedGame.images}
              />
            </div>
            {/* || Description Section */}
            <p className={` col-span-4 order-8 flex flex-col`}>
              <span className={`select mb-4 text-xl `}>Description:</span>
              <span className={`select indent-[6rem]`}>
                {props.selectedGame.description}
              </span>
            </p>
            {/* || Footer Section */}
            <footer
              className={`text-[rgba(255,255,255,.88)] border-t-2 border-[rgba(255,255,255,.86)] order-9 col-span-4 text-center mt-6 py-2`}
            >
              <p>
                For more information on Games visit:{" "}
                <a
                  href="https://rawg.io/"
                  className={`select ${color["text"]}`}
                >
                  www.rawg.com
                </a>
              </p>
            </footer>
          </article>
        </div>
      </ModelOverlay>
    </>
  );
  return createPortal(content, document.getElementById("model"));
};

export default ModelHandler;
