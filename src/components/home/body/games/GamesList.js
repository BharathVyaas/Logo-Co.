import { Outlet } from "react-router-dom";
import ListRenderer from "../../../../ui/ListRenderer";
import ModelHandler from "./ModelHandler";
import { useState } from "react";
import ratingIcon from "../../../../assets/images/icons/rating.png";

/**
 * Renders a list of games with their details.
 *
 * @param {Object} props - The component's properties.
 * @param {Array} props.gameData - An array of game data objects.
 * @param {boolean} props.modelVisible - Indicates if the model is visible.
 * @param {function} props.setModelVisible - Function to set the model visibility.
 * @returns {JSX.Element|null} The rendered component or null if gameData is unavailable.
 */
const GamesList = (props) => {
  // State to hold the selected game
  const [selectedGame, setSelectedGame] = useState(null);

  // Check if gameData is available, if not, return fallback
  if (!props.gameData) {
    return <h1 className="text-white">No Data To Show!</h1>;
  }

  /**
   * Opens the game details model.
   * @param {Object} game - The selected game.
   */
  const openModel = (game) => {
    const newQueryString = `search=${game.id}`;
    const newUrl = `${window.location.pathname}?${newQueryString}`;
    window.history.replaceState(null, "", newUrl);
    setSelectedGame(game);
    props.setModelVisible(true);
  };

  // Check if the model needs to be shown (user selected a game)
  if (props.modelVisible) {
    // Returns The Model with game details
    return (
      props.modelVisible && (
        <ModelHandler
          selectedGame={selectedGame}
          modelVisible={props.modelVisible}
          setModelVisible={props.setModelVisible}
        />
      )
    );
  }

  return (
    <>
      {/* Outlet is still under testing */}
      <Outlet />
      {/* List of games */}
      <ul className="flex flex-col sm:flex-row flex-wrap gap-y-2 sm:g-y-0 sm:gap-y-4 sm:justify-center md:grid md:grid-cols-2 lg:grid-cols-3 md:grid-span-1fr 2xl:grid-cols-4  md:gap-8 md:justify-between font-semibold text-[1.34rem]">
        {props.gameData.map((game, index) => (
          <ListRenderer key={game?.id}>
            <li
              className="hover:cursor-pointer"
              onClick={() => {
                // Game Selected!
                openModel(game, index);
              }}
              role="button"
              tabIndex={0}
            >
              {/* Game item */}
              <figure className="bg-white w-full h-[12rem] esm:h-[18rem] sm:w-[380px] sm:h-[250px] md:w-auto overflow-hidden relative">
                <img
                  className="w-full mx-auto brightness-[.7] sm:brightness-90"
                  src={game?.image}
                  alt={game?.title}
                  width="350"
                />
                {/* Game details */}
                <figcaption className="bg-custom py-[.6rem] sm:py-[.8rem] lg:py-[3rem] xl:py-[.8rem] border-custom border-[.2px] inline-flex shadow-[0_15px_60px_50px_rgba(0,0,0,1)] text-white w-full absolute bottom-0">
                  <span className="w-[65%] ps-4 truncate">{game?.title}</span>
                  <div className="w-[35%] flex justify-center">
                    <img
                      src={ratingIcon}
                      alt="Rating"
                      aria-label="rating"
                      width="10"
                      className="object-fit w-[1.1rem] h-[1.1rem] my-auto mr-1"
                    />
                    <span>{game?.rating?.toFixed(1)}</span>
                  </div>
                </figcaption>
              </figure>
            </li>
          </ListRenderer>
        ))}
      </ul>
    </>
  );
};

export default GamesList;
