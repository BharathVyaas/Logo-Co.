import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";
import likeIcon from "../../../assets/images/icons/like.png";
import UserAccountDetailsContext from "../../../context/UserAccountDetailsContext";
import axios from "../../../api/axios";

/**
 * @param {Object} props - Component props.
 * @param {Number} props.index - Index of the review Item that is being rendered
 * @param {Number} props.selectedItem - Index of the selected Review.
 * @param {Object} props.review - Review Item that is being rendered
 * @returns {JSX.Element} - Renders Like and Dislike Buttons and Survey Message.
 */
function LikeDislike(props) {
  const navigate = useNavigate();

  /**
   * stores info about users email, username, password
   */
  const { userAccountDetails } = useContext(UserAccountDetailsContext);

  // on Click on like button checking if user exists in userCtx
  async function likeHandler() {
    // I'f user dosen't exist redirect to login page
    if (!userAccountDetails.user) {
      navigate("/auth/login");
    } else {
      // on Like sending details id of review and username to backend
      try {
        await axios
          .post("/like", {
            reviewId: props.review.id,
            user: userAccountDetails.user,
          })
          .then((response) => {
            console.log(response.data);
          });
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className="reviewLike order-4 col-span-6 row-span-2 my-auto flex justify-center gap-4">
      {/* Survey Text */}
      {props.index !== props.selectedItem && (
        <p className="text-slate-400 text-[.8rem] my-auto whitespace-nowrap">
          {props.review.likes_positive
            ? props.review.likes_positive + " users found this helpful"
            : "did you find this helpful"}
        </p>
      )}

      {/* Like */}
      <figure onClick={likeHandler}>
        <img src={likeIcon} width="26" alt="E" className=" mx-auto" />
        <figcaption>Like</figcaption>
      </figure>

      {/* DisLike */}
      <figure className="">
        <img src={likeIcon} width="26" alt="E" className="rotate-180 mx-auto" />
        <figcaption>Dislike</figcaption>
      </figure>
    </div>
  );
}

export default LikeDislike;
