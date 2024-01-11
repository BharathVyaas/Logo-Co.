import React from "react";

import ListRenderer from "../../../ui/ListRenderer";
import ReviewItem from "./ReviewItem";

/**
 * Responsible for reviews.
 *
 * @prop {Object} props
 * @returns {JSX.Element} - Renders reviews section for ReviewsPage.
 */
function ReviewSection(props) {
  return (
    <section className="w-[74%]">
      <ol
        id="reviewList"
        className="mx-auto w-[80%] text-white flex flex-col gap-y-4"
      >
        {/* Review Items */}
        {props.reviewData.map((review, index) => {
          return (
            <ListRenderer key={index} from="Reviews">
              <li
                id={"review" + String(index)}
                onClick={(e) => {
                  // STOPPING main TAG FROM SETTING props.toggleReviewText(-1).
                  e.stopPropagation();
                  props.toggleReviewText(index);
                }}
                className="w-[96%] h-[300px] px-4 grid grid-cols-12 grid-rows-12"
              >
                <ReviewItem
                  review={review}
                  toggleReviewText={props.toggleReviewText}
                  index={index}
                  selectedItem={props.selectedItem}
                />
              </li>
            </ListRenderer>
          );
        })}
      </ol>
    </section>
  );
}

export default ReviewSection;
