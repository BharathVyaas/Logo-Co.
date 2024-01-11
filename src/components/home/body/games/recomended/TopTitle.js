import React, { useCallback, useEffect, useState } from "react";
import TitleRenderer from "./TitleRenderer";

/**
 * TopTitle component displays a rotating list of game titles.
 * @param {Object} props - Component props.
 * @param {Boolean} props.modelVisible - Remove Component on True.
 * @return {JSX.Element} - Renders Recomended Game Title.
 *
 *
 * @component
 */
const TopTitle = (props) => {
  /**
   * Dummy data representing a list of game objects.
   *
   * @type {Array}
   */
  const DUMMY_DATA = [
    {
      title: "Uncharted 4",
      rating: 5,
      description: "This is the description",
      image: "http://via.placeholder.com/640x360",
    },
    {
      title: "Game Title 2",
      rating: 4.56,
      description: "This is the description",
      image: "http://via.placeholder.com/640x360",
    },
    {
      title: "Game Title 3",
      rating: 4.2,
      description: "This is the description",
      image: "http://via.placeholder.com/640x360",
    },
    {
      title: "Game Title 4",
      rating: 4.68,
      description: "This is the description",
      image: "http://via.placeholder.com/640x360",
    },
    {
      title: "Game Title 5",
      rating: 4.5,
      description: "This is the description",
      image: "http://via.placeholder.com/640x360",
    },
  ];

  /**
   * Current index of the displayed game.
   *
   * @type {number}
   */
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * Total number of games in the list.
   *
   * @type {number}
   */
  const totalGames = DUMMY_DATA.length;

  /**
   * Function to navigate to the next game in the list.
   */
  const nextGame = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex < totalGames - 1) {
        return prevIndex + 1;
      } else {
        return 0;
      }
    });
  }, [totalGames]);

  /**
   * Function to naviagate to the previous game in the list.
   */
  function prevGame() {
    setCurrentIndex((currentIndex) => {
      if (currentIndex > 0) {
        return currentIndex - 1;
      } else {
        return totalGames - 1;
      }
    });
  }

  useEffect(() => {
    /**
     * Interval ID for rotating through games.
     *
     * @type {number}
     */
    const intervalId = setInterval(() => {
      nextGame();
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, [nextGame]);

  /**
   * The currently displayed game.
   *
   * @type {Object}
   */
  const currentGame = DUMMY_DATA[currentIndex];

  return (
    <TitleRenderer
      image={currentGame.image}
      title={currentGame.title}
      description={currentGame.description}
      rating={currentGame.rating}
      modelVisible={props.modelVisible}
      totalGames={totalGames}
      currentIndex={currentIndex}
      gameList={DUMMY_DATA}
      nextGame={nextGame}
      prevGame={prevGame}
      setCurrentIndex={setCurrentIndex}
    />
  );
};

export default TopTitle;
