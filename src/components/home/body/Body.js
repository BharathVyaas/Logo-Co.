import React, { useCallback, useEffect, useState } from "react";

import { RawgApi } from "../../../api/RawgApi";
import GamesList from "./games/GamesList";
import TopTitle from "./games/recommended/TopTitle";

// Initialize the API (RawgApi Class)
const rawgApi = new RawgApi();

/**
 * Body component representing the main content of the webpage.
 * @param {Object} props - Component props.
 * @returns {JSX.Element} The rendered Body component.
 */
const Body = (props) => {
  /* || GAME DATA HANDLER */
  /**
   * @type {Array} - Stores GameDetails Array After fetching data from rawg api.
   */
  // INETIAL VALUE IS STRING BECAUS OF CONDITION I'M USING TO CHECK IF gameData IS EMPTY.
  const [gameData, setGameData] = useState("");

  // Function to fetch data from the API
  const fetchDataFromApi = useCallback(async () => {
    rawgApi.fetchData();
  }, []);

  useEffect(() => {
    fetchDataFromApi();
  }, [fetchDataFromApi]);

  rawgApi.on("dataFetched", (fetchedData) => {
    setGameData(fetchedData);
  });

  /* || END GAME DATA HANDLER */

  return (
    !props.isMenuOpen && (
      <main>
        {/* Display the most Recomended games (Carousel and more)*/}
        <TopTitle modelVisible={props.modelVisible} />
        {/* Render the list of games */}
        <GamesList
          modelVisible={props.modelVisible}
          setModelVisible={props.setModelVisible}
          gameData={gameData}
        />
      </main>
    )
  );
};

export default React.memo(Body);
