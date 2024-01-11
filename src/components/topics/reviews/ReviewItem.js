import React from "react";

import lamaIcon from "../../../assets/images/fillImage/lama.jpg";
import ReviewReactions from "./ReviewReactions";
import LikeDislike from "./LikeDislike";
import ChatBox from "./ChatBox";

/**
 * @param {Object} props - Component Properties
 * @returns {JSX.Element} A Review Item
 */
function ReviewItem(props) {
  function getAuther(review) {
    const CSSCLASSES = "flex my-auto ps-2 text-lg";
    return review?.user?.username ? (
      <p className={CSSCLASSES}>{review.user.username}</p>
    ) : review?.external_author ? (
      <p className={CSSCLASSES} src={review?.external_author}></p>
    ) : (
      <p className={CSSCLASSES}>Unknown Publisher</p>
    );
  }

  function getAvatar(review) {
    return review?.user?.avatar ? (
      <img
        src={review?.user?.avatar}
        alt="E"
        className="my-auto userAvatar"
        width="40"
      />
    ) : review?.external_avatar ? (
      <img
        src={review?.external_avatar}
        alt="E"
        className="my-auto userAvatar"
        width="40"
      />
    ) : (
      <img src={lamaIcon} alt="E" className="my-auto userAvatar" width="40" />
    );
  }

  return (
    <>
      {/* Title */}
      <h2 className="reviewTitle order-0 col-span-6 my-auto text-2xl underline row-span-4">
        GTA V
      </h2>
      {/* Upload Date Section */}
      <div className="reviewDate order-1 col-span-6 pe-2 text-end my-auto row-span-4">
        {/* || Upload Date Text */}
        <span className="pe-3">
          {props.review.edited ? "edited: " : "created: "}
        </span>
        {/* || Upload Date String*/}
        <span>
          {props.review.edited ? props.review.edited : props.review.created}
        </span>
      </div>

      {/* Review Text */}
      <p
        className={`reviewText order-2 col-span-12 line-clamp-4 border-b-[1px] border-dotted border-white overflow-hidden`}
      >
        {props.review.text}
      </p>

      {/* Reactions */}
      <ReviewReactions reactions={props.review.reactions} />

      {/* Like or Dislike */}
      <LikeDislike
        index={props.index}
        selectedItem={props.selectedItem}
        review={props.review}
      />

      {/* Reviewer Details */}
      <section className="reviewReviewer order-5 col-span-6 flex">
        <div className="flex">
          {getAvatar(props.review)}
          {getAuther(props.review)}
        </div>
      </section>
      {/* Additional Details when user selects a review */}
      {props.index === props.selectedItem ? (
        <ChatBox review={props.review} />
      ) : (
        ""
      )}
    </>
  );
}

export default ReviewItem;
