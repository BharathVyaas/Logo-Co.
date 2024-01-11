import React, { useContext, useState } from "react";

import lamaIcon from "../../../assets/images/fillImage/lama.jpg";
import ChatManager from "../ChatManager";
import enterIcon from "../../../assets/images/icons/enter.png";
import UserAccountDetailsContext from "../../../context/UserAccountDetailsContext";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";

/**
 * @param {Object} props.review - Review item that is being rendered.
 * @returns {JSX.Element} - Renders Chat Box on condition (User Selected a Review).
 */
function ChatBox({ review }) {
  const navigate = useNavigate();

  // Controlled component
  const [comment, setComment] = useState("");

  // UserCtx.
  const { userAccountDetails } = useContext(UserAccountDetailsContext);

  // on Submit If user dosen't exists navigate to login else submit to backend.
  async function commentSubmitHandler() {
    if (!userAccountDetails.user) {
      navigate("/auth/login");
    } else {
      // on comment sending details id of review and username to backend
      try {
        setComment("");
        await axios
          .post("/comment", {
            reviewId: review.id,
            user: userAccountDetails.user,
            comment,
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
    <section className="reviewChat">
      {/* Chat Box */}
      <fieldset className="border-[1px] p-4 pe-6 pb-6 border-white">
        {/* Title Chat-Box */}
        <legend>&nbsp;Chat-Box&nbsp;</legend>

        {/* User Input Part */}
        <div className="flex gap-2 border-b-[2px] pb-2 border-white">
          {/* User Avatar */}
          <img
            src={lamaIcon}
            alt="E"
            className="user-avatar-chat"
            width="20"
            height="20"
          />

          {/* UserInput field */}
          <span className="h-[35px] grow flex">
            <input
              type="text"
              className="grow p-2 rounded-s-lg text-black font-semibold input-default input"
              placeholder="Enter your comments..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <img
              onClick={commentSubmitHandler}
              className="rounded-e-lg bg-white cursor-pointer grab input"
              src={enterIcon}
              alt="Enter"
              width="40"
            />
          </span>
        </div>

        {/* Conditionally rendering comments */}
        {!review.comments_count ? (
          <p className="text-center text-white mt-4">
            Be the first person to comment.
          </p>
        ) : (
          /* Comments on Reviews */
          <ChatManager review={review} />
        )}
      </fieldset>
    </section>
  );
}

export default ChatBox;
