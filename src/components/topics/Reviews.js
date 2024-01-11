import React, { useState, useEffect, useCallback } from "react";

import lamaIcon from "../../assets/images/fillImage/lama.jpg";
import likeIcon from "../../assets/images/icons/like.png";
import ChatManager from "./ChatManager";
import NavbarHandler from "../../helper/NavbarHandler";
import { RawgApi } from "../../api/RawgApi";
import ListRenderer from "../../ui/ListRenderer";
import { ReviewCommentsHelper } from "../../services/ReviewCommentsHelper";

const DummyReactions = [
  "sitback",
  "sitforward",
  "yeah neard",
  "this is it",
  "sunflower",
  "joke",
  "mymy this is",
  "obserd",
  "not yet im still",
  "typing",
];

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
function Reviews() {
  /* || FETCH DATA HANDLER */
  /**
   * @type {Array} Stores data fetched from rawg api initial data is string.
   */
  const [reviewData, setReviewData] = useState("");

  // Fetched the data using RawgApi Object.
  async function fetchReveiewData() {
    const response = await rawgApi.fetchReviews(GAMEID);
    //console.log(response);
  }

  useEffect(() => {
    //fetchReveiewData(GAMEID);
    ReviewCommentsHelper(DummyData[DummyData.length - 1].comments);
  }, [fetchReveiewData]);

  /* || END FETCH DATA HANDLER */

  // State to track whether the mobile menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State to control the visibility of the ModelHandler component
  const [isModelVisible, setIsModelVisible] = useState(false);

  function getAuther(game) {
    const CSSCLASSES = "flex my-auto";
    return game.user.username ? (
      <p className={CSSCLASSES}>{game.user.username}</p>
    ) : game.external_author ? (
      <p className={CSSCLASSES} src={game.external_author}></p>
    ) : (
      <p className={CSSCLASSES}>Unknown Publisher</p>
    );
  }
  function getAvatar(game) {
    return game.user.avatar ? (
      <img
        src={game.user.avatar}
        alt="E"
        className="my-auto userAvatar"
        width="40"
      />
    ) : game.external_avatar ? (
      <img
        src={game.external_avatar}
        alt="E"
        className="my-auto userAvatar"
        width="40"
      />
    ) : (
      <img src={lamaIcon} className="my-auto userAvatar" width="40" />
    );
  }

  const [selectedItem, setSelectedItem] = useState(0);
  const [prevSelectedItem, setPrevSelectedItem] = useState(-1);

  const callback = useCallback(() => {
    if (prevSelectedItem !== -1) {
      const prevListItems = document.getElementById(
        "review" + String(prevSelectedItem)
      );
      prevListItems.classList.remove("selectedReviewItem");
    }
    const listItems = document.getElementById("review" + String(selectedItem));
    listItems.classList.add("selectedReviewItem");
  }, [selectedItem]);

  useEffect(() => {
    callback();
  }, [selectedItem]);

  function toggleReviewText(index) {
    setPrevSelectedItem(selectedItem);
    setSelectedItem(index);
  }

  return (
    <div className="customScrollbar bg-[#0e0808fd] min-w-full min-h-screen">
      {/* Header */}
      <NavbarHandler
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isModelVisible={isModelVisible}
      />

      {/* Main Content */}
      <main className="flex gap-auto justify-between">
        <aside className="w-[23%] h-[90vh] my-[8rem]">
          <ol className="text-white text-2xl whitespace-nowrap">
            <li className="truncate mb-4">Game 1 And some additional text.</li>
            <li className="truncate mb-4">Game 2 And some additional</li>
            <li className="truncate mb-4">Game 3 And some additional</li>
            <li className="truncate mb-4">Game 4 And some additional</li>
            <li className="truncate mb-4">Game 5 And some additional</li>
            <li className="truncate mb-4">Game 6 And some additional</li>
          </ol>
        </aside>
        <section className="w-[74%]">
          <ol
            id="reviewList"
            className="mx-auto w-[80%] text-white flex flex-col gap-y-4"
          >
            {DummyData.map((game, index) => {
              return (
                <ListRenderer key={index} from="Reviews">
                  <li
                    id={"review" + String(index)}
                    onClick={() => {
                      toggleReviewText(index);
                    }}
                    className="w-[96%] h-[300px] px-4 grid grid-cols-12 grid-rows-12"
                  >
                    <h2 className="reviewTitle order-0 col-span-6 my-auto text-2xl underline row-span-4">
                      GameName{index}
                    </h2>
                    <div className="reviewDate order-1 col-span-6 pe-2 text-end my-auto row-span-4">
                      <span className="pe-3">
                        {game.edited ? "edited: " : "created: "}
                      </span>
                      <span>{game.edited ? game.edited : game.created}</span>
                    </div>
                    <p
                      className={`reviewText order-2 col-span-12 line-clamp-4 overflow-hidden`}
                    >
                      {game.text}
                    </p>
                    {game.reactions && (
                      <ul className="reviewReaction order-3 w-full col-span-6 flex">
                        {game.reactions.map((reaction, index) => {
                          if (index < 5) {
                            return (
                              <li
                                key={index}
                                className="mx-[2px] truncate my-auto px-[10px] py-[1.4px] rounded-lg border-l-[.1px] border-r-[.1px] border-t-[.1px] border-slate-500"
                              >
                                {DummyReactions[reaction]}
                              </li>
                            );
                          }
                        })}
                      </ul>
                    )}
                    <div className="reviewLike order-4 col-span-6 row-span-2 my-auto flex justify-center gap-4">
                      {index !== selectedItem && (
                        <p className="text-slate-400 text-[.8rem] my-auto whitespace-nowrap">
                          {game.likes_positive
                            ? game.likes_positive + " users found this helpful"
                            : "did you find this helpful"}
                        </p>
                      )}
                      <figure>
                        <img
                          src={likeIcon}
                          width="26"
                          alt="E"
                          className=" mx-auto"
                        />
                        <figcaption>Like</figcaption>
                      </figure>
                      <figure className="">
                        <img
                          src={likeIcon}
                          width="26"
                          alt="E"
                          className="rotate-180 mx-auto"
                        />
                        <figcaption>Dislike</figcaption>
                      </figure>
                    </div>
                    <section className="reviewReviewer order-5 col-span-6 flex">
                      <div className="flex">
                        {getAvatar(game)}
                        {getAuther(game)}
                      </div>
                    </section>
                    {index === selectedItem ? (
                      <section className="reviewChat">
                        <fieldset className="border-[1px] p-4 pe-6 pb-6 border-white">
                          <legend>&nbsp;Chat-Box&nbsp;</legend>
                          <div className="flex gap-2 border-b-[2px] pb-2 border-white">
                            <img
                              src={lamaIcon}
                              className="userAvatarChat"
                              width="25"
                              height="25"
                            />
                            <input
                              type="text"
                              className="grow rounded ps-3 text-black font-semibold"
                              placeholder="Enter your comments..."
                            />
                          </div>
                          {!game.comments_count ? (
                            <p className="text-center mt-4">
                              Be the first person to comment.
                            </p>
                          ) : (
                            <ChatManager game={game} />
                          )}
                        </fieldset>
                      </section>
                    ) : (
                      ""
                    )}
                  </li>
                </ListRenderer>
              );
            })}
          </ol>
        </section>
      </main>
    </div>
  );
}

export default Reviews;
