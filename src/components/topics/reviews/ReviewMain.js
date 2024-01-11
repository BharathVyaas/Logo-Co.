import { useState, useEffect, useCallback } from "react";

import ReviewTitle from "./ReviewTitles";
import ReviewSection from "./ReviewSection";

/**
 *
 * @param {Object} props
 * @returns {JSX.Element} - Responsible fro rendering body of ReviewPage.
 */
const ReviewMain = (props) => {
  // stores Integer value -1 to indicate selected review -1 for not selected
  const [selectedItem, setSelectedItem] = useState(-1);
  // stores the previous selectedItem value stays one step behing, Used to remove styles set by selectedItem.
  const [prevSelectedItem, setPrevSelectedItem] = useState(-1);

  /**
   * Used in onClick for main and each review Item.
   * sets selected Item styles and remove them onClick.
   * @param {Number} index - Index of Selected Item
   */
  const toggleReviewText = (index) => {
    setPrevSelectedItem(selectedItem);
    setSelectedItem(index);
  };

  // Adds Styles to Selected Items and Remove Styles of Previous selected Item.
  const callback = useCallback(() => {
    // -1 is default value of prevSelectedItem
    if (prevSelectedItem !== -1) {
      // Removing styles applied to previously selected Review
      const prevListItems = document.getElementById(
        "review" + String(prevSelectedItem)
      );
      prevListItems?.classList.remove("selectedReviewItem");
    }
    // Adding styles for User selected Review
    const listItems = document.getElementById("review" + String(selectedItem));
    listItems?.classList.add("selectedReviewItem");
  }, [selectedItem, prevSelectedItem]);

  // Responsible for changing styles for reviews when user selected one.
  useEffect(() => {
    callback();
  }, [selectedItem, callback]);

  /**
   * @returns Title Section Left side of the screen (23%), Review Section Right side of the screen (74%)
   */
  return (
    <main
      className="flex gap-auto justify-between"
      onClick={() => toggleReviewText(-1)}
    >
      {/* Title Section */}
      <ReviewTitle />
      {/* Reviews Section*/}
      <ReviewSection
        selectedItem={selectedItem}
        reviewData={props.reviewData}
        toggleReviewText={toggleReviewText}
      />
    </main>
  );
};

export default ReviewMain;
