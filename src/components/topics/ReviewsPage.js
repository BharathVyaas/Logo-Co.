import React, { useState, useEffect, useCallback } from "react";

import NavbarHanderl from "../../helper/NavbarHandler";
import { RawgApi } from "../../api/RawgApi";
import ReviewMain from "./reviews/ReviewMain";

// RAWG ID'S OF FEW GAMES
const GAMEIDS = {
  "Grand Theft Auto V": "3498",
  "The Witcher 3: Wild Hunt": "3328",
  "Portal 2": "4200",
};
// String Id for GTA 5
const GAMEID = GAMEIDS["Grand Theft Auto V"];

// Initializing The RAWG API
const rawgApi = new RawgApi();

/**
 *
 * @returns {JSX.Element} Renders the Review Page.
 */
function ReviewsPage() {
  /* || FETCH DATA HANDLER */
  /**
   * @type {Array} Stores data fetched from rawg api initial data is string.
   */
  const [reviewData, setReviewData] = useState("");
  console.log(reviewData);

  // Fetched the data using RawgApi Object.
  const fetchReveiewData = useCallback(async () => {
    const response = await rawgApi.fetchReviews(GAMEID);

    setReviewData(response);
  }, []);

  useEffect(() => {
    fetchReveiewData(GAMEID);
    //setReviewData(DummyData);
  }, [fetchReveiewData]);

  /* || END FETCH DATA HANDLER */

  // State to track whether the mobile menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State to control the visibility of the ModelHandler component
  const [isModelVisible, setIsModelVisible] = useState(false);

  if (!reviewData) {
    return (
      <h1 className="text-2xl bg-black text-white w-screen h-screen py-[48vh] text-center">
        Loading...
      </h1>
    );
  }

  return (
    <div className="customScrollbar bg-[#0e0808fd] min-w-full min-h-screen">
      {/* Header */}
      <NavbarHanderl
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isModelVisible={isModelVisible}
        setIsModelVisible={setIsModelVisible}
      />

      {/* Main Content */}
      {reviewData ? (
        <ReviewMain reviewData={reviewData} />
      ) : (
        <h1>No Data To Show...</h1>
      )}
    </div>
  );
}

export default ReviewsPage;
