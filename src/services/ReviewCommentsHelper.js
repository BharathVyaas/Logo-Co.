// array to be used for storing finel result
const filteredArray = [];

/**
 * Responsible for returning filtered comment array
 * @param {Array} array - Comment array
 */
function isolateData(array) {
  // base array
  const baseArray = array[0];

  filteredArray.push({
    created: baseArray.created,
    edited: baseArray.edited,
    likes_count: baseArray.likes_count,
    text: baseArray.text,
    user: {
      avatar: baseArray.user.avatar,
      full_name: baseArray.user.full_name,
      username: baseArray.user.username,
    },
  });
  //console.log("ReviewCommentsHelper isolate Base filteredArray", filteredArray);
}

/**
 *  Returns and array with [created, edited, likes_count, text, user: [avatar, full_name, username].
 *
 * @param {Array} commentArray - Receives an array that may or may not contain comments
 */
export function ReviewCommentsHelper(commentArray) {
  try {
    // Base Case
    if (
      commentArray?.results?.length === 0 ||
      commentArray?.results?.length === undefined ||
      commentArray.count === 0
    ) {
      return [];
    }

    // Using Recursive process
    ReviewCommentsHelper(commentArray.results[0].comments);

    // Data Retrieveing
    isolateData(commentArray.results);

    return filteredArray[0];
  } catch (err) {
    console.error("Services Review Helper Error: ", err);
  }
}
