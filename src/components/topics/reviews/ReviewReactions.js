import React from "react";

// EXAMPLE REACTIONS
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

/**
 * Using Dummy Reactions Array assigning values to Indexes sent by rawg response array.
 *
 *@param {Array} reactions - Contains Index values from 0 to unKnown
 * @returns {JSX.Element} Reactions list for ReviewItem.
 */
function ReviewReactions({ reactions }) {
  return (
    reactions && (
      <ul className="reviewReaction order-3 w-full mt-2 col-span-6 flex">
        {reactions.map((reaction, index) => {
          if (index < 5) {
            return (
              <li
                key={index}
                className="mx-[2px] truncate my-auto px-[10px] py-[1.4px] rounded-lg border-l-[.1px] border-r-[.1px] border-t-[.1px] border-slate-500"
              >
                {DummyReactions[reaction]}
              </li>
            );
          } else return null;
        })}
      </ul>
    )
  );
}

export default ReviewReactions;
